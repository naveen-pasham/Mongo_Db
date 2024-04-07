const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const cors=require('cors');
const errorController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const mongoConnect = require('./util/database').mongoConnect;
const User=require('./models/user');

const app = express();
app.use(cors());
dotenv.config();
app.use(bodyParser.json({ extended: false }));



app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
  User.findById('66121e0302d3885f041a3657').then(user=>{
    req.user=new User(user.username,user.email,user.cart,user._id);
    next();
  }).catch(err=>{
    console.log(err)
  })
 
})


app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);
app.use(errorController.get404);

mongoConnect(()=>{
  app.listen(2000)
});


