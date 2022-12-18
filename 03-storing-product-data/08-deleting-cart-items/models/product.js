// const fs = require('fs');
// const path = require('path');

const Cart = require('./cart');
const dp=require('../util/database')
// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  // getProductsFromFile(products => {
    //   if (this.id) {
    //     const existingProductIndex = products.findIndex(
    //       prod => prod.id === this.id
    //     );
    //     const updatedProducts = [...products];
    //     updatedProducts[existingProductIndex] = this;
    //     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //       console.log(err);
    //     });
    //   } else {
    //     this.id = Math.random().toString();
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), err => {
    //       console.log(err);
    //     });
    //   }
    // });
  save() {
    return dp.execute('INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)',
    [this.title,this.price,this.description,this.imageUrl]
    )
  }

  static deleteById(id) {
    // getProductsFromFile(products => {
    //   const product = products.find(prod => prod.id === id);
    //   const updatedProducts = products.filter(prod => prod.id !== id);
    //   fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //     if (!err) {
    //       Cart.deleteProduct(id, product.price);
    //     }
    //   });
    // });
  }

  // static fetchAll(cb) {
  //   getProductsFromFile(cb);
  // }

  // static findById(id, cb) {
  //   getProductsFromFile(products => {
  //     const product = products.find(p => p.id === id);
  //     cb(product);
  //   });
  // }
  // sql CODE
  //   static deleteById(id) {
  //   getProductsFromFile(products => {
  //     const product = products.find(prod => prod.id === id);
  //     const updatedProducts = products.filter(prod => prod.id !== id);
  //     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
  //       if (!err) {
  //         Cart.deleteProduct(id, product.price);
  //       }
  //     });
  //   });
  // }

  static fetchAll() {
    return  dp.execute('SELECT * FROM products');
  }

  static findById(id) {
    // getProductsFromFile(products => {
    //   const product = products.find(p => p.id === id);
    //   cb(product);
    // });
    return dp.execute('SELECT * FROM products WHERE products.id = ?',[id])
  }
};
