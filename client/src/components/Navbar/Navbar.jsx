import React,{useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from 'react-router-dom'
import './navbar.css'
import { UserContext } from '../../App';

const Navbar=()=>{
  const {state,dispatch}=useContext(UserContext);

    return (
        <>
         <nav className="navbar navbar-expand-lg navbar-light ">
  <NavLink className="navbar-brand" to="/"><strong>FYMO</strong></NavLink>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ms-auto">
      <li class="nav-item active">
        <NavLink className="nav-link" to="/"><strong>Home</strong></NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link" to="/contact"><strong>Contact</strong></NavLink>
      </li>
     { state?<><li class="nav-item">
        <NavLink className="nav-link" to="/status"><strong>Status</strong></NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link" to="/logout"><strong>Logout</strong></NavLink>
      </li></>:<>
      <li class="nav-item">
        <NavLink className="nav-link" to="/register"><strong>Register</strong></NavLink>
      </li>
      <li class="nav-item">
        <NavLink className="nav-link" to="/login"><strong>LogIn</strong></NavLink>
      </li></>}
    </ul>
  </div>
</nav>
     </>
    )
}
export default Navbar