import React, { useState } from "react";
import './register.css'
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios'
const Register = () => {
  const Navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: ""
  });
  const handleInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  }
  const postData = async (e) => {
    e.preventDefault();
    // const {name,email,phone,password,cpassword}=user;
    // const data;
    
    try {
      // console.log(user);
      const data = await axios.post('https://fymoo.herokuapp.com/api/auth/register', user);
      console.log(data);
      window.alert("You are registred successfully");
      Navigate('/login');
    } catch (err) {
      // console.log(data);
      window.alert("please enter valid details");
      console.log(err);
    }
  }
  return (
    <>
      <div className="row main_div mt-5">
        <div className="col-lg-6 col-md-12">
          <h1 className="m-4">Sign up</h1>
          <form className="m-4" autoComplete="off" method="POST">
            <label> <i className="zmdi zmdi-account"></i> </label>
            <input className="input_form" type="text" name="name" value={user.name} onChange={handleInput} placeholder="Your Name" autoComplete="off" /><br />
            <label><i className="zmdi zmdi-email"></i></label>
            <input className="input_form" type="email" name="email" value={user.email} onChange={handleInput} placeholder="Your Email" /><br />
            <label><i className="zmdi zmdi-phone "></i></label>
            <input className="input_form" type="number" name="phone" value={user.phone} onChange={handleInput} placeholder="Your Number" /><br />
            <label><i className="zmdi zmdi-lock"></i></label>
            <input className="input_form" type="password" name="password" value={user.password} onChange={handleInput} placeholder="Password" /><br />
            <label><i className="zmdi zmdi-lock"></i></label>
            <input className="input_form" type="password" name="cpassword" value={user.cpassword} onChange={handleInput} placeholder=" Confirm Your password" autoComplete="new-password" />
            <button type="submit" onClick={postData} className="btn btn-primary mt-2">Register</button>
            <span ><NavLink className="form-bottom" to='/login'>I have already registered</NavLink></span>
          </form>
        </div>
      </div>
    </>

  );

}
export default Register