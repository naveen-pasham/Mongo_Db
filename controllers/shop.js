const Product = require('../models/product');
const Order = require('../models/order');
const product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.find()
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
  Product.find()
    .then(products => {
     res.json(products)
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
   // .execPopulate()
        .then(user => {  
          res.json(user.cart.items)
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
  .populate('cart.items.productId')
  .then(user=>{
    const products= user.cart.items.map(i=>{
      return {quantity: i.quantity, product:i.productId}
    });
    const order= new Order({
      user:{
        username:req.user.username,
        userId:req.user
      },
      products:products
    });
    return order.save()
  })
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
