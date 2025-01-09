import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../user/header";
import '../css/home.css'

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

    const countryWebService  = () => {
        navigate("/WebService", {replace:true});
    }

    const user = JSON.parse(localStorage.getItem("user"));
    return(
            <div className="container-fluid">
                
                <Header></Header>
                {/* mb-4(1,2,3,4,5) is for creating space between rows */}

                <div className="home-item mb-4">
                        <div className="column hoverBox">
                            <a href="#" onClick={addNewVoter}> 
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Ey05z2CJNZNrpfZUEFaQLuWlPb58unqoTXvrcC4Jws9eXqy3uFr6yjak4w&s" 
                                width={250} height={200}></img>
                            </a>
                            <h3 style={{ textAlign: 'center' }}>Add Voters</h3>
                        </div>
                        <div className="column hoverBox">
                         
                            <a href="#" onClick={deleteVoter}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6C-2RlaWrsXL8Vz862pZrdq5YW_W8RXh1-g&usqp=CAU" 
                                width={250} height={200}></img>
                            </a>
                            <h3 style={{ textAlign: 'center' }}> Delete Voters</h3>
                        </div>
                        
                        <div className="column hoverBox">
                        <a href="#" onClick={listVoters}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgEWIAbBWVLiUjmfPB7XqByDNuI2FKGyP18A&usqp=CAU" 
                                width={250} height={200}></img>
                            </a>
                            <h3 style={{ textAlign: 'center' }}> View Voters</h3>
                        </div>
                        
                        <div className="column hoverBox">                        
                            <a href="#" onClick={updateVoter}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc-7WPS3E3A1p3KN8J6W2NfHYkjdVm4_vLNw&usqp=CAU" 
                                width={250} height={200}></img>
                            </a>
                            <h3 style={{ textAlign: 'center' }}> Update Voters</h3>
                        </div>

                        <div className="column hoverBox">                        
                            <a href="#" onClick={countryWebService}>
                                <img src="
https://www.shutterstock.com/shutterstock/photos/763374925/display_1500/stock-vector-modern-flat-editable-line-design-vector-illustration-concept-of-update-application-progress-icon-763374925.jpg" 
                                width={250} height={200}></img>
                            </a>
                            <h3 style={{ textAlign: 'center' }}> Web Services</h3>
                        </div>                                        

                </div>

                {/* 
                <div className="row mb-4"></div> 
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
                */ }        
            </div>
    )    
}



export default Home;