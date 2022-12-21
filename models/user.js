const { getDb } = require("../util/database");
const mongodb=require('mongodb');

// const objectId=mongodb.ObjectId;

class User {

      constructor(username,email,cart,id)
      {
        this.name=username;
        this.email=email;
        this.cart=cart; //objects with someItems
        this._id=id;
      }

      save(){
        const db=getDb();
        return db.collection('users').InsertOne(this);
      }

      addToCart(product)
      {
          const cartProduct=this.cart.items.findIndex(cp=>{
              return cp.productId.toString()===product._id.toString();
          }); 
          // product.quantity = 1;
          let newQuantity=1;
          const updatedCartItems=[...this.cart.items];
          if(cartProduct>=0)
          {
            newQuantity=this.cart.items[cartProduct].quantity+1;
            updatedCartItems[cartProduct].quantity=newQuantity;
          }
          else{
            updatedCartItems.push({productId: new mongodb.ObjectId(product._id),quantity: newQuantity})
          }
          const updatedCart={items:updatedCartItems};
          const db = getDb();
          return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)},{$set:{cart: updatedCart}});
          // const updatedcart={items:[{...product,quantity: 1}]}
          // const db=getDb();
          // return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)},{$set:{cart: updatedcart}})
      }

      deleteItemFromCart(productId)
      { 
        const updatedCartItems=this.cart.items.filter(item=>{
          return item.productId === productId.toString();
        });
        const db = getDb();
        return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)},{$set:{cart: {items: updatedCartItems}}});
        

      }

      static findBy(userId){
          const db=getDb();
          // console.log()
          return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId)}).then(result=>{console.log(result);return result;}  ).catch(err=>{console.log(err)});
      }


      getToCart()
      {
        const db=getDb();
        const productIds=this.cart.items.map(i=>{
          return i.productId;
        })
        return db.collection('product').find({_id: {$in : productIds}}).toArray().then(result=>{
          return  result. map(p=>{
            return {...p,quantity:this.cart.items.find(i=>{
              return i.productId.toString()===p._id.toString();
            }).quantity
          }
          })
        });
      }

}


// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

module.exports = User;
