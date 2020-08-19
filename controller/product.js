const express = require('express')
var router = express.Router()
const Product = require('../models/products')
const util = require('../utility/commonFunctions')

router.get('/products',(req,res)=>{
    Product.find((err,doc)=>{
        if(!err){
            if(!doc) res.render('welcome',{message:'No products found'})
            else {
                res.render('viewProducts',{product:doc})
            }
        }
        else console.log(err)
    })
});

router.get('/viewProduct/:id',(req,res)=>{
    Product.findById(req.params.id,(err,doc)=>{
        if(!err){
            if(!doc){
                res.redirect('back')
            }
            else{
                res.render('viewProduct',{product:doc})
            }
        }
    })
});

router.get('/addProduct',(req,res)=>{
    res.render('addProduct')
});

router.post('/addProduct',(req,res)=>{
    const product = new Product(req.body)
    product.save((err)=>{
        if(!err){
            Product.find((err,doc)=>{
                res.render('viewProducts',{product:doc})
            })        
        }
        else{
            if(err.name=='ValidationError'){
                util.handleValidationError(err,req.body)
                res.render('addProduct',{product: req.body})
            }
            else console.log('Product not saved : ',err)
        }
    })
});

router.get('/updateProduct/:id',(req,res)=>{
    Product.findById(req.params.id,(err,doc)=>{
        res.render('updateProduct',{product:doc})
    })
});

router.post('/updateProduct/:id',(req,res)=>{
    Product.findById(req.params.id,(err,product)=>{
        if(!err){
            if(!product) res.render('addProduct',{message:'Product not found'})
            else{
                product.name = req.body.name
                product.price = req.body.price
                product.description = req.body.description
                product.save((err)=>{
                    if(!err){
                        Product.find((err,doc)=>{
                            if(!err){
                                res.render('viewProducts',{product:doc})
                            }
                            else console.log(err)
                        })
                    }
                    else console.log(err)
                });
            }
        }
    })
});

router.get('/deleteProduct/:id',(req,res)=>{
    Product.findByIdAndDelete(req.params.id,(err)=>{
        if(!err){
            Product.find((err,doc)=>{
                res.render('viewProducts',{product:doc})
            })
        }
        else console.log(err)
    })
});

module.exports = router;