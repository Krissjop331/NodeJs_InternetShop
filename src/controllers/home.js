const db = require('../models/index');
const uploadController = require('./upload.js');
const Product = db.products;
const Image = db.images;
const Role = db.roles;
const jwt = require('jsonwebtoken')
const {secret} = require('../config/key.config')

const home = async (req, res) => {
  let productCheck = false
  const products = await Product.findAll({ include: Image });


  if (products.length > 0) {
    productCheck = true;

    return res.render('../views/index.hbs', {
      products,
      productCheck: productCheck
    });
  } else {
    return res.render('../views/index.hbs')
  }
};



const create = async (req, res) => {
  const images = await Image.findAll();
  const length = await images.length;

  return res.render('../views/create.hbs', {
    imagesLength: length
  });
}

const createProduct = async (req, res) => {
  const image = await uploadController.uploadFiles(req, res, req.file);
  const Iid = Number(req.body.imageId) + 1;

  const products = await Product.create(
    {
      title: req.body.title,
      description: req.body.desc,
      imageId: Iid
    }
  );
  delete req.body.imageId;    // ! очищаем поле инпута
  delete req.body.title;
  delete req.body.desc;
  delete req.body.file;

  return res.redirect('/');
}

module.exports = {
  getHome: home,
  create,
  createProduct
};