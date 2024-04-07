const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
     res.json(products)
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.json(product)
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
     res.json(products)
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
        .then(products => {  
          res.json(products)
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
Product.findById(prodId).then(product=>{
  return req.user.addToCart(product)
}).then(result=>{
 // console.log(result)
  res.json(result)
}).catch(err=> console.log(err))

};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.prodId;
  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      res.json(result)
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {

  req.user
    .addOrder()
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
     res.json(orders)
    })
    .catch(err => console.log(err));
};
