// const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("views engine", "pug");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
app.use(bodyParser.urlencoded({ extended: false }));
// it will parse
// app.use("/", (req, res, next) => {
//   // JAI SHREE RAM
//   console.log("in the  middleWere");
//   //   res.send("<h1>ello from Deepesh</h1>");
//   next();
// });
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminData.routes);
app.use(shopRoutes);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "PageNotFound.html"));
});
// not call it like a function

// Read official docs thats important that We know here
// app.use((req, res, next) => {
//   console.log("in the  middleWere");
// });
// const server = http.createServer(app);
app.listen(3000);
// Learn in the course
// ************************************************************#########*************************************************************************
// HANDLE POST REQUEST
// IMPORTANT
