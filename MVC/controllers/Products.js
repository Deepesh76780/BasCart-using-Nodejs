const  Product=require('../model/product');


exports.getAddProduct=(req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  }
//   make a link is important part here

exports.postAddProduct=(req, res, next) => {
    // products.push({ title: req.body.title });
    const product=new Product(req.body.title);
    product.save();
    res.redirect('/');
  } 


exports.getProduct=(req, res, next) => {
    // const products = adminData.products;
    Product.fetchAll((products)=>{
      res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
      });
    });

  }