const mongoose=require('mongoose')
const DB=process.env.DATABASE;
mongoose.connect(DB).then(()=>{
    console.log("db is connected successfully");
}).catch((err)=>{
    console.log(err);
});

