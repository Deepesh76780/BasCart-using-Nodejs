const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../helper/path");
const adminData = require("./admin");
router.get("/", (req, res, next) => {
  // JAI SHREE RAM
  // console.log("shop.js", adminData.products);
  const products = adminData.products;
  res.render("shop", { prods: products, docTitle: "Shop" });
  // res.send("<h1>hello from Deepesh</h1>");
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  // next();
});
module.exports = router;
// HTMLish Template
// EJS  Pug(JADE) HANDLEBARS
{
  /* <p><%=name %></p> */
}
// Pug p #{name}
// handle bars <p> {{name}}</p>
// Caught in a cross fire
