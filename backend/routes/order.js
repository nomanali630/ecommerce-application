const router = require("express").Router();
const Order = require('../models/Order.js')
const {
    verifyToken,
    varifyTokenAndAuthorization,
    varifyTokenAndAdmin,
} = require("./verifyToken.js");


// create cart
router.post('/',verifyToken, async (req,res)=>{
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})

// upMonth
router.put("/:id",varifyTokenAndAdmin, async (req, res) => {
  try{
     const updateMonther = await Order.findByIdAndUpdate(req.params.id,{
         $set : req.body
     },{new:true})
     res.status(200).json(updatedOrder)
  }catch(err){
    res.status(500).json(err)
  }
});


//delete
router.delete('/:id',varifyTokenAndAdmin, async (req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json('Order has been deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})



// getting user order
router.get('/find/:userId',varifyTokenAndAuthorization, async (req,res)=>{
    try {
       const order =  await Order.find({userId: req.params.userId})
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
})
// getting all carts

router.get("/",varifyTokenAndAdmin, async (req,res)=>{
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get("/income", varifyTokenAndAdmin, async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() -1 ));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1 ));

    try {
        const income = await Order.aggregate([
            {
                $match:{ createdAt: {$gte: previousMonth}}
            },
            {
                $project:{
                    month:{$month:"$createdAt"},
                    sales:"$amount"
                },
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:"$sales"},
                },
            }
        ]);
        res.status(200).json(income)

    } catch (error) {
        res.status(500).json(error)
    }


})


module.exports = router;
