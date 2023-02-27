import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "../user/header";


function VoterList(){
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const listVoterURL = "http://localhost:8080/voter/listAllVoters";
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true,
        Authorization: "Bearer " + user.accessToken
      }
    //this was causing issue to display the data, we have to store values as array[]
    //const [voterResponse, getVoters] = useState(""); 
    const [voterResponse, getVoters] = useState([]);

      useEffect(() => {
            getAllVoters();
        }, []);

    const  getAllVoters = () =>{
        axios.get(listVoterURL,{headers:headers})
            .then((response) => {
                //alert("success:"+response.data[0].voterId); //correct way to debug response
                const retval = response.data;
                getVoters(retval);
            })
            .catch(error => (console.log("error")) )
    }

    return(
        <div className="container">
        <Header></Header>
        <div className ="row mb-4"></div>
        <h2>Voter List</h2>

        <div className="align-items-center justify-content-center pb-4">
        {
            <div className="row">
                    <div className="pt-1 col-3">Voter ID </div>                   
                    <div className="pt-1 col-3">Epic Number </div>
                    <div className="pt-1 col-3">First Name </div>
                    <div className="pt-1 col-3">Last Name</div>   
            </div>
        }
        {
            
            voterResponse.map((item, i) => (
                <div key={i} className="row">
                    <div className="pt-1 col-3">{item.voterId} </div>                   
                    <div className="pt-1 col-3">{item.epicNumber} </div>
                    <div className="pt-1 col-3">{item.firstName} </div>
                    <div className="pt-1 col-3">{item.lastName} </div>        
                </div>
            ))
          }
          
         </div>
        
        </div>
    );
}
export default VoterList;