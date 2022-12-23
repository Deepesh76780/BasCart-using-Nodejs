const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const session=require('express-session');
const mongoDBstore=require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
// const User = require('./models/user');
const User = require('./models/user');
const MongoDBUri='mongodb+srv://LightYagami:Nana1nani@cluster0.d8s5fbf.mongodb.net/shop'
const app = express();
const store= new mongoDBstore({uri:MongoDBUri,collection:'sessions'})

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({secret:'my secret',resave:false,saveUninitialized:false,store:store})
)//session initialisation


app.use((req, res, next) => {
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      // req.session.isLoggedIn=true;
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
 

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);
mongoose.connect(MongoDBUri).then(result=>{
if(User.findOne().then(user=>{
  if(!user)
  {
    const user=new User({
      name:'Deepesh',
      email:'deepesh21100@gmail.com',
      cart:{  
        items:[]
      }
    });
    user.save();
  }
  // console.log(user)
}))
app.listen(3000);
// console.log(result);
}).catch(err=>{
  
  console.log(err);
})
// mongoConnect(() => {
//   app.listen(3000);
// });
