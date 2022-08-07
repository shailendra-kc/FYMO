import React, { useContext, useEffect, useState } from "react";
import './details.css'
import axios from 'axios'
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
const Details=()=>{
    const Navigate=useNavigate();
    const [file,setFile]=useState(null);
    const {state,dispatch}=useContext(UserContext);
    const [user,setUser]=useState({
        name:"",
        height:"",
        missingLocation:"",
        moreAbout:"",
        userId:"",
        color:"",
        img:"",
        currentStatus:1
    });
    const handleInput=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setUser({...user,[name]:value});
    }
   
    const postData=async(e)=>{
        e.preventDefault();
        if(file){
            const data=new FormData();
            const fileName=Date.now()+file.name;
            data.append("file",file);
            data.append("name",fileName);
        
        try{
            const imgdata=await axios.post('https://fymoo.herokuapp.com/uploadimg',data);
            console.log(imgdata.data);
            // setUser({...user,img:imgdata.data});
            user.img= imgdata.data;
            console.log(user);
        }catch(err){
        }
    }
        try{ 
            const userdetails=await axios.get('https://fymoo.herokuapp.com/api/auth/getdata');
            user.userId=userdetails.data._id;           
             const datapost=await axios.post('https://fymoo.herokuapp.com/api/auth/postmissingperson',user);
             console.log(datapost);
             if(datapost.status===200)
             {dispatch({type:"USER",payload:true})
             window.alert("Information updated successfully");
             Navigate('/');
            }
        }catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <div className="row">
            <h1 className="text-center mt-5" >Enter Details of Missing person</h1>
            <div className="form_div">
            <form className="form_sec ms-5" autoComplete="off" method="POST" >
                <input className="input_form details_input " onChange={handleInput} name="name" value={user.name} type="text" placeholder="Enter Name of Missing Person" ></input><br/>
                <input className="input_form details_input" onChange={handleInput} name="color" value={user.color} type="text" placeholder="Enter Color of Missing Person" ></input><br/>
                <input className="input_form details_input" onChange={handleInput} name="missingLocation" value={user.missingLocation}  type="text" placeholder="Enter Location of Missing Person" ></input><br/>
                <input className="input_form details_input" onChange={handleInput} type="number" name="height" value={user.height} placeholder="Enter Height of Missing Person" ></input><br/>
                <input className="input_form details_input"  type="file"  id="file" accept=".png,.jpg,.jpeg"onChange={(e)=>setFile(e.target.files[0])}></input><br/>
                <textarea className="input_form details_input" onChange={handleInput} type="text" name="moreAbout" value={user.moreAbout} style={{resize:"none"}} type="text" placeholder="Enter Something About Missing Person"row="4" ></textarea>
                <button type="submit" onClick={postData} className="btn btn-primary mt-2">Submit</button>
            </form>
            </div>
            </div>
        </>
    );
}
export default Details