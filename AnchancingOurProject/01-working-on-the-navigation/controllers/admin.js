const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  };
  
  exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const image_url = req.body.image_url;
    const description = req.body.description;
    const price =req.body.price;
    const product=new Product(title,image_url,description,price);
    // console.log(product);
    // const title=req.
    product.save();
    res.redirect('/');
  };

  exports.getProducts=(req,res,next) => {
    Product.fetchAll(products => {
        res.render('admin/product', {
          prods: products,
          pageTitle: 'Admin Product',
          path: '/admin/product'
        });
      });
  }