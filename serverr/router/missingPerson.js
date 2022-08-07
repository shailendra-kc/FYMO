const express=require('express');
const router=express.Router();
require('../db/connection');
const User=require('../models/userSchema');
const MissingPerson=require('../models/missingPersonShecma');
router.get('/',async(req,res)=>{

});
router.post('/postdata',async(req,res)=>{
    try{
    const {userId,name,img,height,color,missingLocation,moreAbout}=req.body;
    if(!userId|| !name|| !img|| !height|| !color|| !missingLocation|| !moreAbout){
        res.status(422).json({error:"Please enter all the details"});
    }
    const user=new MissingPerson({userId,name,img,height,color,missingLocation,moreAbout});
    await user.save();
    return res.status(200).json({message:"cool information is updated successfully"});
     }catch(err){
        return res.status(500).json(err);
     }
    
    // console.log(req.body);
    // res.json(req.body);

});
module.exports=router;