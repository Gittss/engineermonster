const mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'Field required'
    },
    price:{
        type: Number,
        required: 'Field required'
    },
    description:{
        type: String,
    }
});

const Product = mongoose.model('Product',productSchema)
module.exports = Product