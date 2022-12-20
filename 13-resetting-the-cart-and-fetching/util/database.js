// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete', 'root', 'Nana1nani!@#', {
//   dialect: 'mysql',
//   host: 'localhost'
// });

// module.exports = sequelize;
const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;
let _db;

const mongoConnect=(callback)=>{
  MongoClient.connect('mongodb+srv://LightYagami:Nana1nani@cluster0.d8s5fbf.mongodb.net/?retryWrites=true&w=majority').then(result=>{
  console.log("connected");
  _db=result.db();
  callback(result);
}).catch(err=>{
  console.log(err);
  throw err;
})
}

const getDb=() => {
     if(_db)
     {
        return _db;
     }

     throw 'NO DATABASE FOUND!';
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;
