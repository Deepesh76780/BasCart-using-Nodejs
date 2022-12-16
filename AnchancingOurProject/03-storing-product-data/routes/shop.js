const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/product/:productid',shopController.getProduct);//order will matter
router.get('/products', shopController.getProducts);
router.post('/cart', shopController.PostCart);
// router.get('/products/delete');
router.get('/cart', shopController.getCart);

router.get('/order', shopController.getOrder);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
