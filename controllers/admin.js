const Product = require('../models/product');
// const mongodb = require('mongodb');

// const ObjectId= mongodb.ObjectId;


exports.postAddProduct = async (req, res, next) => {
 // console.log(req.body)
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
 const product=new Product({
  title:title,
  imageUrl:imageUrl,
  price:price,
  description:description,
  //null,req.user._id
});
 product
 .save()
    .then(async (result) => {
      console.log(JSON.stringify(result))
    await res.send(result)
    })
    .catch(err => {
      console.log(err);
    });
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect('/');
//   }
//   const prodId = req.params.productId;
//   req.user
//     .getProducts({ where: { id: prodId } })
//     // Product.findById(prodId)
//     .then(products => {
//       const product = products[0];
//       if (!product) {
//         return res.redirect('/');
//       }
//       res.render('admin/edit-product', {
//         pageTitle: 'Edit Product',
//         path: '/admin/edit-product',
//         editing: editMode,
//         product: product
//       });
//     })
//     .catch(err => console.log(err));
// };

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.Id;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findById(prodId).then(product=>{
  product.title=updatedTitle;
  product.imageUrl=updatedImageUrl;
  product.price=updatedPrice;
  product.description=updatedDesc;
  return product.save()
  }) 
    .then(result => {
     res.json(result)
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product
    .find()
    .then(products => {
     res.json(products)
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
 
  Product.findByIdAndDelete(prodId)
    .then(() => {
      res.json({message:'Product Deleted'})
    })
    .catch(err => console.log(err));
};
