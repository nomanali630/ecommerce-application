const router = require("express").Router();
// const User = require("../models/User.js");
const Product = require("../models/Product.js")
const {
 varifyTokenAndAdmin,
} = require("./verifyToken.js");



router.post('/',varifyTokenAndAdmin, async (req,res)=>{
    const newProduct = new Product(req.body)

    try {
        const savedProducts = await newProduct.save()
        res.status(200).json(savedProducts)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
})


router.put("/:id",varifyTokenAndAdmin, async (req, res) => {
  try{
     const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
         $set : req.body
     },{new:true})
     res.status(200).json(updatedProduct)
  }catch(err){
    res.status(500).json(err)
  }
});

router.delete('/:id',varifyTokenAndAdmin, async (req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('Product has been deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})
// getting product
router.get('/find/:id', async (req,res)=>{
    try {
       const product =  await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})

// getting all products and we can limit the users and new products 
router.get('/', async (req,res)=>{
      const qNew = req.query.new;
      const qCategory = req.query.category;
    try {
      let products;
      if(qNew){
          products = await Product.find().sort({createdAt:-1}).limit(1);
      }else if(qCategory){
          products = await Product.find({
              categories:{
                        $in: [qCategory],
          },
        });
      }else{
          products = await Product.find()
      }
      res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error)
    }
});



module.exports = router;
