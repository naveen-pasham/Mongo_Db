const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();


// // /admin/products => GET
router.get('/products', adminController.getProducts);

// // /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);



router.post('/edit-product', adminController.postEditProduct);

 router.get('/delete-product/:productId', adminController.postDeleteProduct);

module.exports = router;
