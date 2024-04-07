const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const errorController = require('./controllers/error');

const cors=require('cors');
dotenv.config();
const app = express();
const mongoose=require('mongoose');
const expenseRoutes = require('./routes/expense');

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use('/expense', expenseRoutes);

app.use(errorController.get404);

mongoose.connect(process.env.DB_NAME).then((result)=>{
   app.listen(2000)
}).catch(err=>console.log(err));

