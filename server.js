const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const exphand = require('express-handlebars')
const userController = require('./controller/user')
const productController = require('./controller/product')
require('dotenv/config')

var app=express()
app.use(bodyparser.urlencoded({
    extended:true
}))
app.use(bodyparser.json())

app.set('views',path.join(__dirname,'/views/'));    
app.engine('hbs',exphand({extname:'hbs', defaultLayout:'mainlayout', layoutsDir:__dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.use(express.static('public'))
app.use('/',express.static(__dirname+'/public'));

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true, useUnifiedTopology:true},(err)=>{
    if(!err) console.log('MongoDB connected')
    else console.log(err)
});

app.listen(process.env.PORT,()=>{
    console.log('App running at port : ',process.env.PORT)
});

app.get('/',(req,res)=>{
    res.render('home')
});

app.use('/user',userController)
app.use('/product',productController)