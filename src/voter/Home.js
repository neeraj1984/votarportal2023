import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../user/header";

function Home() {
    const navigate = useNavigate();    

    const logout = () => {
        localStorage.removeItem('user');
        navigate("/login", {replace:true});
      };

    const addNewVoter = () => {
        navigate("/addVoter", {replace:true});
      };
    const deleteVoter =() =>{
        navigate("/deleteVoter", {replace:true});
    }

    const listVoters = () => {
        navigate("/voterList", {replace:true});
    }

    const updateVoter = () => {
        navigate("/updateVoter", {replace:true});
    }

    const user = JSON.parse(localStorage.getItem("user"));
    return(
            <div className="container-fluid">
                <Header></Header>

                <div className="row mb-4"></div> {/* mb-4(1,2,3,4,5) is for creating space between rows */}
                <div className="row">
                    <div className="pt-1 col-4">
                        <a href="#!" onClick={addNewVoter} >Add Voter</a>
                    </div>
                    <div className="pt-1 col-8"></div>
                </div>
                <div className="row">
                    <div className="pt-1 col-4">
                        <a href="#!" onClick={deleteVoter} >Delete Voter</a>
                    </div>
                    <div className="pt-1 col-8"></div>
                </div>
                <div className="row">
                    <div className="pt-1 col-4">
                        <a href="#!" onClick={listVoters} >View Voters</a>
                    </div>
                    <div className="pt-1 col-8"></div>
                </div>
                <div className="row">
                    <div className="pt-1 col-4">
                        <a href="#!" onClick={updateVoter} >Update Voters</a>
                    </div>
                    <div className="pt-1 col-8"></div>
                </div>
                               
            </div>
    )    
}



export default Home;