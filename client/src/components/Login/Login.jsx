import axios from "axios";
import React,{useContext, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import Cookies from 'universal-cookie';
axios.defaults.withCredentials = true
 
const cookies = new Cookies();
 

const Login=()=>{
    const {state,dispatch}=useContext(UserContext);
    const Navigate=useNavigate();
    const [user,setUser]=useState({
        email:"",
        password:""
    });
    // const createCookie = () => {
    //     axios.get('https://fymoo.herokuapp.com/api/auth/setCookie',{ withCredentials: true }).then((res) =>{
    //       console.log(res.data)
    //     })
    //   }
    const handleInput=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setUser({...user,[name]:value});
    }
    const postData= async(e)=>{
        e.preventDefault();
        const email=user.email,password=user.password;
       
        try{
            const config = {
                headers: {
                    
                  'Content-Type': 'application/json',
                },
              };
            
            const data=await axios.post('https://fymoo.herokuapp.com/api/auth/signIn',user,config);
            //  createCookie();
         
            if(data.status===200)
            {   dispatch({type:"USER",payload:true})
                window.alert("wow you are logged in");
                Navigate('/');
            }
        }catch(err){
            window.alert("please enter a valid details");
        }
    }
    return (
        <>
             <div className="row main_div mt-5">
                <div className="col-lg-6 col-md-12">
                    <h1 className="m-4">Login</h1>
                    <form className="m-4" autoComplete="off" method="POST">
                        <label><i className="zmdi zmdi-email"></i></label>
                        <input  className="input_form" type="email" value={user.email } name="email" onChange={handleInput} placeholder="Your Email"  /><br />
                        <label><i className="zmdi zmdi-lock"></i></label>
                        <input  className="input_form" type="password" name="password" value={user.password} onChange={handleInput} placeholder="Password" /><br />
                        <button type="submit" onClick={postData}  className="btn btn-primary mt-2">Login</button>
                        <span ><NavLink className="form-bottom" to='/signup'>Create an account</NavLink></span>
                    </form>
                   
                </div>
                
            </div>
        </>

    );

}
export default Login