const express = require("express");
const path = require("path");
const router = express.Router();
const rootDir = require("../helper/path");

const products = [];

router.get("/add-product", (req, res, next) => {
  // JAI SHREE RAM
  console.log("in the  middleWere");
  res.sendFile(
    // "<h1><form action='/admin/add-product' method='POST'><input type='text' name='title'><button type='submit'>Add product</button></form></h1>"
    path.join(rootDir, "views", "add-product.html")
  );
  //   next();
});

router.post("/add-product", (req, res, next) => {
  // app.post will only will trigger when post is defined
  // JAI SHREE RAM
  console.log(req.body);
  products.push({ title: req.body.title });
  //   output is undefine **thats important**
  res.redirect("/");
  //   next();
});

exports.routes = router;
exports.products = products;
