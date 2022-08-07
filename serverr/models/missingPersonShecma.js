const mongoos=require('mongoose');
const missingpersonSchema=new mongoos.Schema({
    userId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        
    },
    currentStatus:{
        type:Number,
        enum:[1,2,3]
    },
    height:{
        type:Number,
        required:true
    },
    color:{
        type:String,
        required:true
    },

    missingLocation:{
        type:String,
        required:true
    },
    moreAbout:{
        type:String,
        required:true
    }
});
module.exports=mongoos.model("MISSINGPERSON",missingpersonSchema);