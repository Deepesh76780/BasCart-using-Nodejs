const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose')

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
// const User = require('./models/user');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const user = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('63a2f21d9ae18cfa111c055c')
    .then(user => {
      req.user = user;
      // console.log(req.user)
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
mongoose.connect('mongodb+srv://LightYagami:Nana1nani@cluster0.d8s5fbf.mongodb.net/shop?retryWrites=true&w=majority').then(result=>{
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
