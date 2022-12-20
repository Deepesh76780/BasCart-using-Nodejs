const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
    // Product.create({
      title: title,
      price: price,
      imageUrl: imageUrl, 
      description: description,
      // userId:req.user.id,
  }
    // })
  )
  // const product = new Product(null, title, imageUrl, description, price);
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect('/');
  //   })
  //   .catch(err => console.log(err));
.then(result=>{
    // console.log(result);
    res.redirect('/');
  }).catch(err=>{
    console.log(err);
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  // Product.findById(prodId, product => {
  //   if (!product) {
  //     return res.redirect('/');
  //   }
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     editing: editMode,  
  //     product: product
  //   });
  // });
  req.user.getProducts({where:{id:prodId}})
  // Product.findByPk(prodId)
  .then(products=>{
      const product=products[0];
      if (!(product)) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
}).catch(err=>{
  console.log(err)
});
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedtitle = req.body.title;
  const updatedprice = req.body.price;
  const updatedimageUrl = req.body.imageUrl;
  const updateddescription = req.body.description;
  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDesc,
  //   updatedPrice
  // );
  Product.findByPk(prodId).then(product=>{
    // console.log(result);
    product.title=updatedtitle;
    product.price= updatedprice;
    product.imageUrl=  updatedimageUrl; 
    product.description=updateddescription;
    return product.save();
  }).then(result=>{
    console.log('UPDATED PRODUCT');
    res.redirect('/admin/products');
  }).catch(err=>{
    console.log(err);
  });
  // updatedProduct.save();
};

exports.getProducts = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // });
  // Product.findAll().
  req.user.getProducts().
  then(products=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
}).catch(err=>{
  console.log(err)
});
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId).then(product=>{ return  product.destroy()}).then(result=>{
    console.log("destroyed");
  }).catch(
    err=>{
      console.log(err);
    }
  );
  res.redirect('/admin/products');
};
