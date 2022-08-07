const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const app=express();
// const cors=require('cors');
// app.use(cors());
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const cors = require('cors');
const corsOptions ={
    origin:'https://findyourmissingone.netlify.app', 
    credentials:true,            //access-control-allow-credentials:true
    
}
app.use(cors(corsOptions));
const bodyParser=require('body-parser');

app.use(express.json());//post request json payloads convert into->object
app.use (bodyParser.urlencoded ({extended: true}));

const multer=require('multer')
require('./db/connection');
const authRoute=require('./router/auth')
app.use('/api/auth/',authRoute);
app.use(require('./router/missingPerson'));
app.use(express.static('public/images/'))
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
})
app.get('/*',(req,res)=>{
    res.json("server is started")
})




const upload=multer({storage:storage});
app.post('/uploadimg',upload.single('file'),(req,res)=>{
    try {
        console.log('coming');
        console.log(req.file.filename);
        return res.status(200).json(req.file.filename);  
    } catch (error) {
        res.status(500);
    }
})
const PORT=process.env.PORT||3002;
app.listen(PORT,(req,res)=>{
    console.log(`server is running at ${PORT}`);
});
