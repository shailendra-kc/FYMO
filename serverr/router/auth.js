const express=require('express');
const router=express.Router();
require('../db/connection');// need for joinig the connection
const User=require('../models/userSchema');//need for making schema data
const MissingPerson=require('../models/missingPersonShecma');
const multer =require('multer');
const upload=multer();
const Admin=require('../models/Admin')
const bcrypt=require('bcrypt');
const Authenticate = require('../middleware/authentication');
router.post('/register',async(req,res)=>{
    const {name,email,phone,password,cpassword}=req.body;
    // console.log(phone);
    if(!name||!email||!phone||!password||!cpassword){
        res.status(422).json({error:"Please fill all the details"});//422 is client error
    }
    try{
    const userExist= await User.findOne({email:email});//left side database right side upper vali
    if(userExist)
    return res.status(422).json({error:"Email already exist"});
    else if(password!=cpassword)
    return res.status(422).json({error:"Confirm password is not matching with password"});
    else{
         //hashing passwaord
         const salt=await bcrypt.genSalt(10);
         const hashedPasswaord=await bcrypt.hash(req.body.password,salt);
        const user=new User({name,email,phone,password:hashedPasswaord});
        await user.save();
        return res.status(200).json({message:"cool account is created"});
    }
    }catch(err){
        res.status(500).json(err);
        console.log(err);

    };
});
var token;
// router.get('/setCookie', (req, res) => {
// 	res.status(202)
// 		.cookie('jwtusersdetails', token, {
// 			maxAge: new Date(new Date().getTime() + 100 * 1000000000),
//             httpOnly: true,
//             Secure:   true,
//             sameSite: "none",
// 		}).send("cookie being initialised")
// });
router.get('/deleteCookie', (req, res) => {
    console.log('deletecookie');
    // res.clearCookie('jwtshubh',{path:'/'})
    res.cookie('jwtusersdetails',token,{
        httpOnly:true,
        maxAge:10,
        secure:true,
        sameSite:'none'
        
     })
    res.status(200).send("userlogout");
});
router.post('/signIn',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const userLoggedIn=await User.findOne({email:email});
        if(!userLoggedIn) return res.status(422).json({error:"Email does not exist"});
        const match=await bcrypt.compare(password,userLoggedIn.password);
        if(!match)return res.status(422).json({error:"Please enter a valid password"});
        
         token= await userLoggedIn.generateAuthToken();// this will see in userSchema same function we provide in userSchema
        // return res.status(200).json(token);
        res.cookie('jwtusersdetails',token,{
            httpOnly:true,
            maxAge:3600000*5,
            secure:true,
            sameSite:'none'
            
         })
        res.json({message:'Welcome admin '})
       

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
router.post('/postmissingperson',async(req,res)=>{
    try{
        const {name,height,color,missingLocation,moreAbout,userId,currentStatus,img}=req.body;
        const missinguser=new MissingPerson({name,height,color,missingLocation,moreAbout,userId,currentStatus,img});
        await missinguser.save();
        return res.status(200).json({message:"cool information  is added"});
    //    return res.status(200);
    }catch(err){
        console.log(err);
        // res.status(500);
    }

})

router.get('/getdata',Authenticate,async(req,res)=>{
    res.send(req.rootUser);
     
})
router.get('/getmissingpersonlist/:id',async(req,res)=>{
    try{
        const list  =await MissingPerson.find({userId:req.params.id});
        // console.log(list);
        // console.log(req.params.id);
        return res.status(200).json(list);

    }catch(err){
        console.log(err);
    }
})


module.exports=router;