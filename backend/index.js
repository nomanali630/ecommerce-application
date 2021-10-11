const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const userRoute = require('./routes/user.js')
const authRoute = require('./routes/auth.js')
const productRoute = require('./routes/product.js')
const cartRoute = require('./routes/cart.js')
const orderRoute = require('./routes/order.js')
const stripeRoute = require('./routes/stripe.js')
const morgan = require('morgan')
const cors = require('cors')


dotenv.config()
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
app.use('/api/carts', cartRoute )
app.use('/api/orders', orderRoute)
app.use('/api/checkout', stripeRoute)



mongoose.connect(
    process.env.MONGO_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true }
    ).then(()=>{
        console.log('Database Connected')
    }).catch((err)=>{
        console.log('error ', err);
    });


app.listen(5000,()=>{
    console.log('server is running on 5000')
})