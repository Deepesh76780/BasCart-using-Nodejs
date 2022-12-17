const Product = require('../models/product');
const Cart=require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

// using query params

exports.getProduct=(req,res,next)=>{
  const prodid=req.params.productid;
  // console.log(prodid);
  Product.findById(prodid,product=>{
    // console.log(product);
    res.render('shop/product-detail',{
      product:product,
      pageTitle:'DetailsPage',
      path:'/product-detail'
    })
  })
  // res.redirect('/');
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.PostCart=(req,res,next)=>{
  const prodid=req.body.productID;
  Product.findById(prodid,(product)=>{
      Cart.addProduct(prodid,product.price);
  })
  res.redirect('/cart')
}

exports.getOrder = (req, res, next) => {
  res.render('shop/order', {
    path: '/order',
    pageTitle: 'Your Order'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
