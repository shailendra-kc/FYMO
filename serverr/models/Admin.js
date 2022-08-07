const mongoos=require('mongoose');
const adminSchema=new mongoos.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    lists:[
        {
        list:{
            type:String
        }
    }
    ]

    
})
module.exports=mongoos.model('ADMIN',adminSchema);