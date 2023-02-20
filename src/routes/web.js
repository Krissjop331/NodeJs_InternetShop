const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");

let routes = (app) => {

  router.get("/", homeController.getHome);
  router.get('/create', homeController.create);
  
  router.post('/createProduct', upload.single("file"), homeController.createProduct);
  // router.post("/upload", upload.single("file"), uploadController.uploadFiles);

  return app.use("/", router);
};

module.exports = routes;