import React, { useEffect, useState } from "react";
import './contact.css'
const Contact=()=>{
    const [data,setData]=useState({
        name:"",
        phone:"",
        email:"",
        message:""

    })
    const handelInput=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setData({...data,[name]:value});
        
    }
    return (
        <>
             <div className="row contact_upper">
                <div className="col-lg-4 col-12 card ">
                
                    <h4>Phone</h4>
                    <p>+9147382323</p>
                </div>
                <div className="col-lg-4 col-12 card ">
                    <h4>Email</h4>
                    <p>demo20@gmail.com</p>

                </div>
                <div className="col-lg-4 col-12 card">
                    <h4>Address</h4>
                    <p>Allahabad ,India</p>

                </div>

            </div>
            <div className="row lower_contact">
                <h1>Send Query</h1>
                <form method="POST">
                    <div className="d-flex justify-content-between">
                        <input className="contact_form_input" onChange={handelInput} name="name" type="text" id="contact_from_name"
                          placeholder="Enter Your Name" value={data.name} require="true" autoComplete="off"/>
                        <input className="contact_form_input" name="email"  onChange={handelInput} value={data.email} type="text" id="contact_from_email"
                          placeholder="Enter Your Email" require="true"/>
                          
                        <input className="contact_form_input" value={data.phone} onChange={handelInput}  name="phone" type="number" id="contact_from_phone"
                          placeholder="enter your phone" require="true"/>
                        
                    </div>
                    <textarea  className="text-area foo" style={{resize:"none"}} onChange={handelInput} name="message" placeholder="Message" value={data.message} rows="7" cols="60"></textarea>
                    <button  className="btn-lg btn-primary">Send Message</button>
                </form>
            </div>

        </>

    );

}
export default Contact