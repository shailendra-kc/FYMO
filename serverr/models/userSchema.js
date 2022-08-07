const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    date:{
        type:Date,
        default:Date.now()
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});
userSchema.methods.generateAuthToken= async function(){
    try{
    let token1=jwt.sign({_id:this._id},process.env.SECRET_KEY);
    this.tokens=this.tokens.concat({token:token1});
    await this.save();
    return token1;
    }catch(err){
        // res.status(401).send("Unathorized:No token provided")
        console.log(error)
    }
}
module.exports=mongoose.model("USER",userSchema);