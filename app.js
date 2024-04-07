const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const cors=require('cors');
const errorController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const mongoose=require('mongoose');

const User=require('./models/user');

const app = express();
app.use(cors());
dotenv.config();
app.use(bodyParser.json({ extended: false }));



app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
  User.findById('6612d1c0360c683203ebc3a7').then(user=>{
    req.user=user;
    next();
  }).catch(err=>{
    console.log(err)
  })
 
})


app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);
app.use(errorController.get404);

mongoose.connect(process.env.DB_NAME).then((result)=>{
  User.findOne().then(user=>{
    if(!user){
      const user=new User({
        username:'naveen',
        email:'naveen@gmail.com',
        cart:{
          items:[]
        }
      });
      user.save()
    }
  });
 
  app.listen(2000)
}).catch(err=>console.log(err));


