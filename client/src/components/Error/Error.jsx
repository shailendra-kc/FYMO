import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
const Error=()=>{
    const Navigate=useNavigate();
    const clicked=()=>{
        Navigate('/');
    }
    return (
        <>
            <div className="Error_main">
            <h1>WE ARE SORRY,PAGE NOT FOUND</h1>
            <p>The page you are looking for is not available</p>
            <button onClick={clicked} className="btn btn-lg btn-primary">Go Back</button>
            </div>
        </>

    );

}
export default Error