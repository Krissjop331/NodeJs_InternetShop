const express = require("express");
const router = express.Router();
const {check} = require('express-validator');


// ! Product
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");

// ! User
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


let routes = (app) => {

  // ! Product
  router.get("/", homeController.getHome);
  router.get('/create', homeController.create);
  router.post('/createProduct', upload.single("file"), homeController.createProduct);

  // ! User
  router.get("/users", roleMiddleware("USER"), userController.getUsers);
  // router.get("/users", userController.getUsers);

  router.get("/register", userController.register);
  router.get('/login', userController.login);
  router.post("/registerProcess",  upload.single("file"), userController.registerProcess);
  router.post('/loginProcess', userController.loginProcess);
  router.post('/logout', userController.logout);



  return app.use("/", router);
};

module.exports = routes;