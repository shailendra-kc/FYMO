import axios from "axios";
import React,{useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
axios.defaults.withCredentials = true
const Logout=()=>{
    const Navigate=useNavigate();
    const {state,dispatch}=useContext(UserContext);
    // const deleteCookie = () => {
    //     axios.get('https://fymoo.herokuapp.com/deleteCookie',{ withCredentials: true }).then((res) =>{
    //         dispatch({type:"USER",payload:false});
    //          Navigate('/');
    //       console.log(res.data)
    //     })
    //   }
    const calllogout=async()=>{
        try{
            // deleteCookie();
            const config = {
                headers: {
                    
                  'Content-Type': 'application/json',
                },
              };
            
            const data=await axios.get('https://fymoo.herokuapp.com/api/auth/deleteCookie',config);
            if(data.status===200){
                dispatch({type:"USER",payload:false});
                Navigate('/');
            }
            //  createCookie();
         
             

        }catch(err){
            console.log(err);
        }


    }
    useEffect(()=>{
        calllogout();

    },[]);
    return (
        <></>

    );

}
export default Logout