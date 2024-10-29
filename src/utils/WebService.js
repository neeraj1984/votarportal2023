import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "../user/header";
import apiResponseInterceptor from "./ApiResponseInterceptor";

function WebService() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [country, setCountry] = useState("");
    const [capital, setCapital] = useState("");
    const [currency, setCurrency] = useState("");
    const [countryInfo, setCountryInfo] = useState({ capitalName: '', currencyName: '' });
    
    const [error, setError] = useState('');
    const countryWebServiceURL = "http://localhost:8080/countryWebService";
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true,
        Authorization: "Bearer " + user.accessToken
    }

    const handleInputChange = (e) => {
        setCountry(e.target.value); // Ensure this captures the string correctly
    };

    const handleButtonClick = () => {
        fetchCapital();
    };

    const clearFields = () => {
        setCountry("");
        setCountryInfo({ capitalName: '', currencyName: '' });
    }

    function fetchCapital() {
        //alert('Country being sent:' +country);
        apiResponseInterceptor.get(countryWebServiceURL, { headers: headers , params: { countryCode: country } })
            .then(response => {
                if(response.data != ''){
                    //setCapital(response.data);
                    setCountryInfo(response.data);
                    setError('');
                }else{
                    setError('Provided country might be wrong, please check it again.');
                }
               
            })
            .catch(error => {
                console.error('Error in accessing Country Web Service:', error);
                //alert('Error fetching capital');
                setError('Error in accessing Country Web Service. Please try again.');
            });
    }


    return (
        <div className="container">
            <Header></Header>
            <h2>Web Service Test </h2>

            <div className="row">

                <div className="pt-1 col-3">Country:<span style={{ color: "red" }}>*</span>
                </div>
                <div className="pt-1 col-3">
                    <input type="text" id="country" value={country} className="form-control" autoComplete="off"
                        onChange={handleInputChange} />
                </div>

            </div>

            <div className="row">

                <div className="pt-1 col-3">Capital:</div>
                <div className="pt-1 col-3">
                    <input type="text" id="capital" className="form-control" autoComplete="off" value={countryInfo.capitalName} readOnly/>
                </div>

            </div>

            <div className="row">

                <div className="pt-1 col-3">Currency:</div>
                <div className="pt-1 col-3">
                    <input type="text" id="currency" className="form-control" autoComplete="off" value={countryInfo.currencyName} readOnly/>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>

            </div>

            <div className="row">
                <button className="btn btn-primary btn-lg" style={{ margin: '20px', width: '150px' }}
                    onClick={handleButtonClick}>Get Capital</button>
                <button className="btn btn-primary btn-lg" style={{ margin: '20px', width: '150px' }}
                    onClick={clearFields}>Clear</button>
            </div>

        </div>
    )

}

export default WebService;