const router = require("express").Router();
const User = require("../models/User.js");
const {
  verifyToken,
  varifyTokenAndAuthorization,
  varifyTokenAndAdmin,
} = require("./verifyToken.js");

router.put("/:id", varifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try{
     const updatedUser = await User.findByIdAndUpdate(req.params.id,{
         $set : req.body
     },{new:true})
     res.status(200).json(updatedUser)
  }catch(err){
    res.status(500).json(err)
  }
});

router.delete('/:id',varifyTokenAndAuthorization, async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('user has been deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})
// getting user
router.get('/find/:id',varifyTokenAndAdmin, async (req,res)=>{
    try {
       const user =  await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

// getting all users and we can limit the users and new users 
router.get('/',varifyTokenAndAdmin, async (req,res)=>{
      const query = req.query.new
    try {
       const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get users stats
router.get('/stats',varifyTokenAndAdmin, async (req,res)=>{
  const date = new Date()
  const lastYear = new Date(date.setFullYear(date.getFullYear() -1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt:{ $gte:lastYear }, }, },
      {
        $project: {
          month:{ $month:"$createdAt"},
        },
      },
      {
        $group:{
          _id: "$month",
          total:{$sum: 1},
        },
      },
    ])
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
})





module.exports = router;
