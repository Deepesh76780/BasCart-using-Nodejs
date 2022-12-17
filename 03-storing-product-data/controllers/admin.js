const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing:false
  });
};

exports.postEditProduct = (req, res, next) => {
  const id=req.body.productId;
  // console.log(req.body);
  const utitle = req.body.title;
  const uimageUrl = req.body.imageUrl;
  const uprice = req.body.price;
  const udescription = req.body.description;
  const updatedProduct = new Product(id,utitle, uimageUrl, udescription, uprice);
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId=req.body.productId
  // const product = new Product(null,title, imageUrl, description, price);
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};


exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit
  // console.log(editMode);
  if(!editMode)
  {
    return res.redirect('/');  
  }
  const prodID=req.params.productid;
  Product.findById(prodID,product=>{
    if(!product)  
    {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product:product,
    });
  })
 
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
