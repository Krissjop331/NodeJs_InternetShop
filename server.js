const express = require("express");
const app = express();
const db = require("./src/models");
const initRoutes = require("./src/routes/web");

global.__basedir = __dirname;

app.set("view engine", "hbs");
app.set('views', "./src/views")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'./resources/static/assets/tmp'));

initRoutes(app);

db.sequelize.sync({alter: true});
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

let port = 5000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});