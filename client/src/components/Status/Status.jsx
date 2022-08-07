import React, { useContext, useEffect,useRef, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import './status.css'
import Post from "../post/Post";

const Status=()=>{
 const {state,dispatch}= useContext(UserContext);
 const [data,setData]=useState([]);
  const Navigate=useNavigate();
  const callstatuspage= async()=>{
    try{
      const user= await axios.get('https://fymoo.herokuapp.com/api/auth/getdata');
      dispatch({type:"USER",payload:true})
      const list=await axios.get(`https://fymoo.herokuapp.com/api/auth/getmissingpersonlist/${user.data._id}`);
      setData(list.data);  
    }catch(err){
      console.log(err);
      Navigate('/login')
    }
  }
  useEffect(()=>{
     callstatuspage();
  },[]) 
    return (
        <>
        <div className="row row1">
        {data.map((p) => (
          <Post key={p._id} name={p.name} height={p.height} location={p.missingLocation} currentstatus={p.currentStatus} img={p.img} />     
        ))}
          </div> 
        </>
    );
}
export default Status