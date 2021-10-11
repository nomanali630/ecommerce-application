const router = require("express").Router();
const Cart = require('../models/Cart.js')
const {
    verifyToken,
    varifyTokenAndAuthorization,
    varifyTokenAndAdmin,
} = require("./verifyToken.js");


// create cart
router.post('/',verifyToken, async (req,res)=>{
    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})

// update
router.put("/:id",varifyTokenAndAuthorization, async (req, res) => {
  try{
     const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
         $set : req.body
     },{new:true})
     res.status(200).json(updatedCart)
  }catch(err){
    res.status(500).json(err)
  }
});


//delete
router.delete('/:id',varifyTokenAndAuthorization, async (req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json('Cart has been deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})



// getting user cart 
router.get('/find/:userId', async (req,res)=>{
    try {
       const cart =  await Cart.findOne({userId: req.params.userId})
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})
// getting all carts

router.get("/",varifyTokenAndAdmin, async (req,res)=>{
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;
