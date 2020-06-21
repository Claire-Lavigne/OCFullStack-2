const Product = require('../models/products');
const fs = require('fs');

exports.createProduct = (req, res, next) => {
  req.body.product = JSON.parse(req.body.product);
  const url = req.protocol + '://' + req.get('host');
  const product = new Product({
    name: req.body.product.name,
    description: req.body.product.description,
    price: req.body.product.price,
    inStock: req.body.product.inStock
  });
  product.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.readProduct = (req, res, next) => {
  Product.findOne({
    _id: req.params.id
  }).then(
    (product) => {
      res.status(200).json(product);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.updateProduct = (req, res, next) => {
  let product = new Product({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.product = JSON.parse(req.body.product);
    product = {
      _id: req.params.id,
      name: req.body.product.name,
      description: req.body.product.description,
      price: req.body.product.price,
      inStock: req.body.product.inStock
    };
  } else {
    product = {
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    };
  }
  Product.updateOne({_id: req.params.id}, product).then(
    () => {
      res.status(201).json({
        message: 'Modified!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteProduct = (req, res, next) => {
  Product.findOne({_id: req.params.id}).then(
    (product) => {
      const filename = product.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Product.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};

exports.listAllProducts = (req, res, next) => {
  Product.find().then(
    (products) => {
      res.status(200).json(products);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
