import React, { Component } from "react";
import '../App.css';
import lotus from "../img/lotus.jpeg";

function Logo(){

    return(  
        
    <div className="text-center">
        <img src={lotus}
          style={{width: "185px",height: "100px"}} alt="logo" />
        <h4 className="mt-1 pb-1">Voters Information System</h4>
    </div>
    )
}

export default Logo;