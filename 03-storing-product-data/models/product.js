const fs = require('fs');
const path = require('path');
const cart=require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {

  constructor(id,title, imageUrl, description, price) {
    this.title = title;
    this.id = id;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {

    getProductsFromFile(products => {
      if(this.id)
      {   
        const existingProductIndex=products.findIndex(prod=> prod.id===this.id);
        const updatedProduct=[...products];
        updatedProduct[existingProductIndex]=this;//newly created product
        // console.log(updatedProduct)
          fs.writeFile(p, JSON.stringify(updatedProduct), err => {
            console.log(err);
          });
      }
      else
      {
      this.id=Math.random().toString();
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
      }
    });
  }

  static deleteById(id)
  { 
    getProductsFromFile(
      (product)=>{
        const Product=product.find(prod => prod.id === id);
        const updatedProduct=product.filter((pr)=>{return pr.id!==id});
        fs.writeFile(p,JSON.stringify(updatedProduct),err=>{
          if(!err)
          {
              cart.deleteProduct(id,Product.price);
          }
          // cb(cart)
        })
      }
    )
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id,cb)
  {
    getProductsFromFile(
      (product)=>{
        const products=product.find((pr)=>{return pr.id===id});
        cb(products);
      }
    )
  }
};
