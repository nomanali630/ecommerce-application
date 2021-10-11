const mongoose = require('mongoose');



const CartSchema =  new mongoose.Schema({
    userID:{
        type: String,
        required: true,
    },
    products:[
        {
            productID:{
                type: String
            },
            quantity:{
                type: Number,
                default: 1  ,
            },
        }
    ]
    
    
    
},{timestamps:true}) // alternative of date.now()


module.exports = mongoose.model('Ecommerce Cart', CartSchema)