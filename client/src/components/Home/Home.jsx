import React,{useContext, useEffect,useState} from "react";
import Navbar from "../Navbar/Navbar";
import './home.css'
import pic from '../../images/TC3Baner5.jpg'
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import axios from "axios";
import Details from "../Details/Details";
// import pic "../../../public/assets/TC3Baner5.jpg"
const Home=()=>{
    const {state,dispatch}=useContext(UserContext);
    const [user,setData]=useState({
        name:"",
        userId:""
    });
    const Navigate=useNavigate();
    const gologin=()=>{
        Navigate('/login');
    }
    const gosubmitDetails=()=>{
        Navigate('/details')
    }
    const callmainpage=async()=>{
        try{
        const user=await axios.get('https://fymoo.herokuapp.com/api/auth/getdata');
        setData((prev)=>{
            return {
                ...prev,
                name:user.data.name
            }
        });
        setData((prev)=>{
            return {
                ...prev,
                userId:user.data._id
            }
        });
        dispatch({type:"USER",payload:true})
        }catch(err){
            // Navigate('/login');
        }
    }
    useEffect(()=>{
    callmainpage();
},[])
    return (
       <>
       
            <div className="main">
            <div className="upper_one">
            <img className="imgg" src='/assets/TC3Baner5.jpg'></img>
            </div>
            <hr className="hrLine"></hr>
            <div className="lower_one">
            <h1 className="text-center">Missing Person HelpLine</h1>
            <p className="w-75 m-auto">Finding a missing person can be a difficult task, but if you know where to look, it is often much easier to find a missing person. Just follow some simple steps to find a missing person in our database. We regularly add data of missing children, mental person and unknown dead bodies received in India. You can search about your missing person on this website, and can get notification about found person through your email or mobile SMS.</p>
        </div>
        <hr className="hrLine"></hr>
      {state? <>
         <h1 className="text-center bg-danger w-50 m-auto signbtn" onClick={gosubmitDetails}><strong>Submit Details</strong></h1></>:
       <><h1 className="text-center bg-danger w-50 m-auto signbtn" onClick={gologin}><strong>Click Here Add People</strong></h1></>}
          <hr className="hrLine"></hr>
          <div>
            
          </div>
          

          
          
        
        </div>

 
        
       </>
    )
}
export default Home