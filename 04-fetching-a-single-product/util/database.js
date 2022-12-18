// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: 'Nana1nani!@#'
// });

// module.exports = pool.promise();
const Sequelize=require('sequelize');

const sequelize=new Sequelize('node-complete','root','Nana1nani!@#',{
    dialect:'mysql',host:'localhost'
});

module.exports=sequelize;