import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "../user/header";
import apiResponseInterceptor from "./ApiResponseInterceptor";
import Loader from "../utils/Loader";

function WebService() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [country, setCountry] = useState("");
    const [countryError, setCountryError] = useState("");
    const [capital, setCapital] = useState("");
    const [currency, setCurrency] = useState("");
    const [countryInfo, setCountryInfo] = useState({ capitalName: '', currencyName: '' });

    const [currencyFrom, setCurrencyFrom] = useState("");
    const [currencyTo, setCurrencyTo] = useState("");
    const [exchangeRate, setExchangeRate] = useState("");
    const [currencyInfo, setCurrencyInfo] = useState({ exchangeRate: '' });

    const [currencyFromError, setCurrencyFromError] = useState("");
    const [currencyToError, setCurrencyToError] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState('');
    const countryWebServiceURL = "http://localhost:8080/countryWebService";
    const currencyWebServiceURL = "http://localhost:8080/currencyRateWebService";
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true,
        Authorization: "Bearer " + user.accessToken
    }

    // Static values for dropdown
    const webServices = [
        { id: 1, name: 'Weather' },
        { id: 2, name: 'Currency' },
        { id: 3, name: 'Country' },
        { id: 4, name: 'Sports' }
    ];

    const handleInputChange = (e) => {
        setCountry(e.target.value); // Ensure this captures the string correctly
    };

    const handleValidation = (event) => {
        let validInput = true;
        if (selectedWebService == "1") {

        }else if (selectedWebService == "2"){
            if(currencyFrom === '' ){
                validInput = false;
                setCurrencyFromError("Currency From is required");
            }else{
                validInput = true;
                setCurrencyFromError('');
            }
            if(currencyTo === ''){
                validInput = false;
                setCurrencyToError("Currency To is required");
            }else{
                validInput = true;
                setCurrencyToError('');
            }
        }else if (selectedWebService == "3"){
            if(country === ''){
                validInput = false;
                setCountryError("Country is required");
            }else{
                validInput = true;
                setCountryError('');
            }

        }else if (selectedWebService == "4"){

        }
        return validInput;
    };

    const handleButtonClick = () => {
        //alert("Selected Value:" + selectedWebService);
        var valid = handleValidation();
        if (valid && selectedWebService == "2") {
            fetchCurrency();
        } else if (valid && selectedWebService == "3") {
            fetchCapital();
        }
    };

    const clearFields = () => {
        setCountry("");
        setCountryInfo({ capitalName: '', currencyName: '' });
        setCurrencyFrom("");
        setCurrencyTo("");
        setExchangeRate("");
        setCurrencyInfo({exchangeRate: ''});
    }

    const [selectedWebService, setSelectedWebService] = useState("");

    // Handle dropdown change
    const handleWebServiceChange = (event) => {
        setSelectedWebService(event.target.value);
    };

    // Handler for currencyFrom input change
    const handleCurrencyFromChange = (e) => {
        setCurrencyFrom(e.target.value);
    };

    // Handler for currencyTo input change
    const handleCurrencyToChange = (e) => {
        setCurrencyTo(e.target.value);
    };

    // Handler for exchangeRate input change
    const handleExchangeRateChange = (e) => {
        setExchangeRate(e.target.value);
    };

    function fetchCurrency() {
        //alert('Country being sent:' +country);
        setIsLoading(true); 
        apiResponseInterceptor.get(currencyWebServiceURL, { headers: headers, params: { baseCurrency: currencyFrom, toCurrency: currencyTo } })
            .then(response => {
                if (response.data !== '') {
                    setCurrencyInfo(response.data);
                    setError('');
                } else {
                    setError('Provided currency might be wrong, please check it again.');
                }
                setIsLoading(false);

            })
            .catch(error => {
                console.error('Error in accessing Country Web Service:', error);
                //alert('Error fetching capital');
                setError('Error in accessing Country Web Service. Please try again.');
                setIsLoading(false); 
            });
    }

    function fetchCapital() {
        setIsLoading(true); 
        apiResponseInterceptor.get(countryWebServiceURL, { headers: headers, params: { countryCode: country } })
            .then(response => {
                if (response.data.capitalName !== '' || response.data.currencyName !== '') {
                    //setCapital(response.data);
                    setCountryInfo(response.data);
                    setError('');
                } else {
                    setError('Provided country might be wrong, please check it again.');
                }
                setIsLoading(false);

            })
            .catch(error => {
                console.error('Error in accessing Country Web Service:', error);
                //alert('Error fetching capital');
                setError('Error in accessing Country Web Service. Please try again.');
                setIsLoading(false);
            });
    }


    return (

        <div className="container">

            <Header></Header>
            <h2>Web Service Test </h2>

            <div className="row">
                <div className="pt-1 col-3">Select Service:<span style={{ color: "red" }}>*</span> </div>
                <div className="pt-1 col-3">
                    <select id="webService" className="form-control" value={selectedWebService}
                        onChange={handleWebServiceChange}>
                        <option value="">Select Web Service...</option>
                        {
                            webServices.map((item, i) => (
                                <option key={i} value={item.id}>{item.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="pt-1 col-3"></div>
            </div>

            {isLoading && <Loader/>} {/* Conditionally render the loader */}
            
            { /* Weather web service */ }
            {selectedWebService === '1' && (
                <> {/* JSX fragment - <>...</> is needed here */}
                </>
            )}
            
            { /* Currency web service */ }
            {selectedWebService === '2' && (
                <>
                    <div className="row">

                        <div className="pt-1 col-3">Currency(From):<span style={{ color: "red" }}>*</span>
                        </div>
                        <div className="pt-1 col-3">
                            <input type="text" id="currencyFrom" className="form-control" autoComplete="off"
                                onChange={handleCurrencyFromChange} value={currencyFrom}/>
                            <small id="emailHelp" className="text-danger form-text" style={{marginLeft:"10px"}}>
                                  {currencyFromError}
                              </small>
                        </div>
                        <div className="pt-1 col-3">ex: INR, USD, GBP</div>

                    </div>
                    <div className="row">

                        <div className="pt-1 col-3">Currency(To):<span style={{ color: "red" }}>*</span>
                        </div>
                        <div className="pt-1 col-3">
                            <input type="text" id="currencyTo" className="form-control" autoComplete="off"
                                onChange={handleCurrencyToChange} value ={currencyTo}/>
                            <small id="emailHelp" className="text-danger form-text" style={{marginLeft:"10px"}}>
                                  {currencyToError}
                              </small>
                        </div>
                        <div className="pt-1 col-3"></div>

                    </div>

                    <div className="row">

                        <div className="pt-1 col-3">Exchange Rate:<span style={{ color: "red" }}>*</span>
                        </div>
                        <div className="pt-1 col-3">
                            <input type="text" id="exchangeRate" className="form-control" 
                            value={currencyInfo.exchangeRate}
                                readOnly />
                        </div>
                        <div className="pt-1 col-3"></div>

                    </div>

                </>
            )}
            
            { /* Country web service */ }
            {selectedWebService === '3' && (
                <>
                    <div className="row">

                        <div className="pt-1 col-3">Country:<span style={{ color: "red" }}>*</span>
                        </div>
                        <div className="pt-1 col-3">
                            <input type="text" id="country" value={country} className="form-control" autoComplete="off"
                                onChange={handleInputChange} /> 
                            <small id="emailHelp" className="text-danger form-text" style={{marginLeft:"10px"}}>
                                  {countryError}
                              </small>                               
                        </div>
                        <div className="pt-1 col-3">ex: IN, GT, GR, HK, BG, PL etc</div>

                    </div>

                    <div className="row">

                        <div className="pt-1 col-3">Capital:</div>
                        <div className="pt-1 col-3">
                            <input type="text" id="capital" className="form-control" autoComplete="off" value={countryInfo.capitalName} readOnly />
                        </div>
                        <div className="pt-1 col-3"></div>

                    </div>

                    <div className="row">

                        <div className="pt-1 col-3">Currency:</div>
                        <div className="pt-1 col-3">
                            <input type="text" id="currency" className="form-control" autoComplete="off" value={countryInfo.currencyName} readOnly />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </div>
                        <div className="pt-1 col-3"></div>

                    </div>

                </>
            )}

            {selectedWebService !== '' && (
                <>
                    <div className="row">
                        <button className="btn btn-primary btn-lg" style={{ margin: '20px', width: '150px' }}
                            onClick={handleButtonClick}>Get API</button>
                        <button className="btn btn-primary btn-lg" style={{ margin: '20px', width: '150px' }}
                            onClick={clearFields}>Clear</button>
                    </div>
                </>
            )}



        </div>
    )

}

export default WebService;