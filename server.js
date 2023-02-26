const express = require("express");
const app = express();
const db = require("./src/models");
const initRoutes = require("./src/routes/web");
const Roles = db.roles;
const Users = db.users;
var publicDir = require('path').join(__dirname,'/resources');
const {secret} = require('./src/config/key.config');

const cookieParser = require('cookie-parser');  // !

global.__basedir = __dirname;

app.use(cookieParser(secret)) // !

app.set("view engine", "hbs");
app.set('views', "./src/views")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDir));

initRoutes(app);

const start = async() => {
  const startdb = await db.sequelize.sync();
  
  await Roles.findOrCreate({
    where: {name: "USER"},
  })
  await Roles.findOrCreate({
      where: {name: "ADMIN"},
  })

  let port = 5000;
  app.listen(port, () => {
    console.log(`Running at localhost:${port}`);
  });
}
start();

