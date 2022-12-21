const getDb=require('../util/database').getDb;
const mongodb=require('mongodb')

class Product
{
      constructor(title,price,description,imageUrl,_id,userId)
      {
      this.title=title;
      this.price=price;
      this.description=description;
      this.imageUrl=imageUrl;
      this._id= _id ? new mongodb.ObjectId(_id):null;
      this.userId=userId;
      }

      save()
      { 
        const db=getDb();
        let dbOp;
        if(this._id)
        {
          dbOp=db.collection('product').updateOne({_id: this._id},{
            $set:this
          });
        }
        else{ 
            dbOp=db.collection('product').insertOne(this);
        }
       return  dbOp.then(result=>{console.log(result)}).catch(err=>{console.log(err)});
      }
 

      static fetchAll(){
        const db=getDb();
        return db.collection('product').find().toArray().then(result=>{
          console.log(result);
          return result;
        }).catch(
          err=>{
            console.log(err);
           }
        );
      }


      static findBy(id){
        const db=getDb();
        return db.collection('product').find({_id:new mongodb.ObjectId(id)}).next().then(result=>{
          console.log(result);
          return result;
        }).catch(
          err=>{
            console.log(err);
           }
        );
      }

      static deleteById(prodId)
      {
        const db=getDb();
           return db.collection('product').deleteOne({_id: new mongodb.ObjectId(prodId)}).then(result=>{
          console.log(result);
        }).catch(err=>{
        });
      }
}



// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;
