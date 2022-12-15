const path = require('path');
const express = require('express');
// const rootDir = require('../util/path');
// const adminData = require('./admin');
const { getProduct } = require('../controllers/Products');
const router = express.Router();
router.get('/', getProduct);
module.exports = router;
