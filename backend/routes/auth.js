const router = require('express').Router()
const User = require('../models/User.js')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')


router.post('/register', async(req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        
    });
        try {
            const savedUser  = await newUser.save()
            res.status(200).json(savedUser)
            console.log('user saved success ');
        } catch (error) {
            res.status(500).json(error)
            console.log("error :",error)
        }


})

router.post('/login', async (req,res)=>{
    try {
        const user =  await User.findOne({username:req.body.username})
        if(!user){
            res.status(401).json('Wrong UserName')
            return
        }
        const hashPass = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
        const password = hashPass.toString(CryptoJS.enc.Utf8);
        if(password != req.body.password){
            res.status(401).json('Wrong Password')
            return
        }

        // if i dont want to send pass in the request so i can use that method and in res.send(others) it will be like this 
        // const { password, ...others} = user._doc

        // JWT
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
            process.env.JWT_SEC,
        {expiresIn:"3d"})

        res.status(200).json({user , accessToken})
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router