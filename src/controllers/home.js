const db = require('../models/index');
const uploadController = require('./upload.js');
const Product = db.products;
const Image = db.images;

const home = async (req, res) => {
  let productCheck = false

  const products = await Product.findAll({ include: Image });

  if (products.length > 0) {
    productCheck = true;

    // return res.json(products)
    return res.render('../views/index.hbs', {
      products,
      productCheck: productCheck
    });
  } else {
    return res.render('../views/index.hbs')
  }

  // const images = Image.findAll({ where: {id: products.image} });

};

const create = async(req, res) => {
  const images = await Image.findAll();

  if (images.length > 0) {
    return res.render('../views/create.hbs', {
      imagesLength: images.length + 1
    });
  }
  return res.render('../views/create.hbs');
}

const createProduct = async (req, res) => {
  const image = await uploadController.uploadFiles(req, res, req.file);

  const products = await Product.create(
    {
      title: req.body.title,
      description: req.body.desc,
      imageId: req.body.imageId
    }
  ); 

  return res.redirect('/');
}

module.exports = {
  getHome: home,
  create,
  createProduct
};