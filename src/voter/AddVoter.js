import React, { useRef, useState,useEffect,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "../user/header";
import VoterDOB from "./VoterDOB";
import ReactSelect from 'react-select';
import SuccessAlert from "../utils/SuccessAlert";


function AddVoter(){
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const dobRef = useRef();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const [state, setState] = useState("");
    const [states, getStates] = useState([]); //defined as array
    const [cities, setCities] = useState([]); //defined as array
    const [selectedCity, setSelectedCity] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [dobError, setDobError] = useState();
    const [invalidMobile, setInvalidMobile] = useState();
    const [emailError, setEmailError] = useState();
    const [address1Error, setAddress1Error] = useState("");

    const [isSuccess, setSuccess] = useState(false);
    
    const addVoterURL = "http://localhost:8080/voter/addVoter";
    const getStatesURL = "http://localhost:8080/voter/getStates";
    const getCitiesURL = "http://localhost:8080/voter/getCities";
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true,
        Authorization: "Bearer " + user.accessToken
      }
    
    const data = {
        firstName: firstName,
        lastName: lastName,
        genderCode: gender,
        dob: dob,
        email: email,
        mobile: mobile,
        stateId: state,
        cityId: selectedCity,
      }

    const fetchStates = useCallback(() => {
        loadStates();
      }, [/* Additional dependencies */])

     // Similar to componentDidMount and componentDidUpdate:
      useEffect(() => {
        fetchStates();
      },[fetchStates]); //useEffect executes on EVERY re-render if you don't pass the dependency array[]


    function loadStates(){
        axios.get(getStatesURL, {headers:headers},)
          .then((response) => {
              getStates(response.data);
      }).catch(error => {
            alert(error);    
      });
    }

    const handleValidation = (event) => {
        dobSetter(); //set the date from child to parent component
        setSuccess(false);
        let formIsValid = true;
        
        var firstNameIsValid = validateFirstName();
        var lastNameIsValid = validateLastName();
        var genderIsValid = validateGender();
        var dobIsValid = validateDOB();
        var emailIsValid = emailValidation();
        var mobileIsValid = phoneValidation();     
        var addressIsValid = validateAddress();

        if(!firstNameIsValid || !lastNameIsValid || !genderIsValid || !dobIsValid 
            || !emailIsValid || !mobileIsValid|| !addressIsValid){
                formIsValid = false;
        }

        return formIsValid;
    }

    function dobSetter(){
        data.dob = dobRef.current.getDob();
    }

    function validateFirstName(){
        var isFirstNameValid = true;
        if(firstName === ''){
            setFirstNameError("First Name is required");
            isFirstNameValid = false;
        }else{
            setFirstNameError("");
            isFirstNameValid = true;
        }

        return isFirstNameValid;
    }
    function validateLastName(){
        var isLastNameValid = true;
        if(lastName === ""){
            setLastNameError("Last Name is required");
            isLastNameValid = false;
        }else{
            setLastNameError("");
            isLastNameValid = true; 
        }
        return isLastNameValid;
    }

    function validateDOB(){
        var dob = dobRef.current.getDob()
        var isDOBValid = true;
        if(dob === ''){
            setDobError("DOB is required");
            isDOBValid = false;
        }else{
            setDobError("");
            isDOBValid = true;
        }
        return isDOBValid;
    }

    function validateGender(){
        var isGenderValid = true;
        if(gender === ''){
            setGenderError("Gender is required");
            isGenderValid = false;
        }else{
            setGenderError("");
            isGenderValid = true;
        }
        return isGenderValid;
    }

    function validateAddress(){
        var isAddressValid = true;
        if(address1 === ''){
            setAddress1Error("Address1 is required");
            isAddressValid = false;
        }else{
            setAddress1Error("");
            isAddressValid = true;
        }
        return isAddressValid;
    }

    function emailValidation(){
        var formIsValid = true;
        //alert(email);
        if(typeof email !== "undefined"){
            if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
                formIsValid = false;
                setEmailError("Email id Not Valid");
              } else {
                setEmailError("");
                formIsValid = true;
              }
        }else{
            formIsValid = false;
            setEmailError("Email is required");
        }      
          return formIsValid;
    }

    function phoneValidation() {
        var isValid = true;
        //var regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
        var pattern = new RegExp(/^[0-9\b]+$/);
        //return !(!mobile || pattern.test(mobile) === false);
        if (!pattern.test(mobile)) {
            isValid = false;
            setInvalidMobile("Please enter valid mobile number(digits).");     
          }else if(mobile.length !== 10){       
            isValid = false; 
            setInvalidMobile("Please enter valid mobile number.");          
          }else{
            setInvalidMobile("");  
          }
          return isValid;
      }

    function invokeService(){
        setFirstNameError("");
        setLastNameError("");
        setInvalidMobile("");
        setEmailError("");
        setDobError("");
        setGenderError("");
        setAddress1Error("");

        axios.post(
            addVoterURL, 
            data,
            {headers:headers},
          ).then((response) => {
              //alert("data saved successfully.");
              //alert.success("data saved successfully");
              setSuccess(true);
      }).catch(error => {
            alert(error);    
      });
    }

    const save = () => {
        let isValid = handleValidation();
        if(isValid){
            invokeService();
        }          
      };

    const  changeCity = (event, value) => {
        //let selectDOM = event.target;
        //let selectedState = selectDOM.options[selectDOM.selectedIndex].getAttribute("value");
        //alert(selectedState);
        setState(event.target.value);
        setSelectedCity("");
        axios.get('http://localhost:8080/voter/getCitiesByState?stateId=' + event.target.value , {headers:headers},)
        .then(response => {
            console.log(response.data);
            //let cities = response.data.filter((city) => city.cityId === value);
            //let cities = [...new Set(response.data.map((item) => item.cityName))];
            //cities.sort();
            //alert(cities);
            //setCities(cities);
            //let defaultVal = <option key="">Select City....</option>
            //let cityDrpOptions = defaultVal + response.data.map((city) => <option key={city.cityId}>{city.cityName}</option>);
            //alert(cityDrpOptions);
            let cities = response.data;
            cities.sort();
            setCities(response.data);
        });
    }

    const  resetCity = (event, value, id) => {
        setSelectedCity(event.target.value);
    }

    return(
        <div className="container">
                <Header></Header>
                <div className ="row mb-4"></div>
                {/* <h2>Add Voter</h2> */}

                <div className="align-items-center justify-content-center pb-4">
                
                <div className="row">
                    <small id="firstNameErrorSection" className="text-danger form-text">
                        {firstNameError}
                    </small>
                    <small id="lastNameErrorSection" className="text-danger form-text">
                        {lastNameError}
                    </small>
                    <small id="mobileErrorSection" className="text-danger form-text">
                        {invalidMobile}
                    </small>
                    <small id="emailErrorSection" className="text-danger form-text">
                        {emailError}
                    </small>

                    <small id="genderErrorSection" className="text-danger form-text">
                        {genderError}
                    </small>
                    <small id="dobErrorSection" className="text-danger form-text">
                        {dobError}
                    </small>
                     
                    <small id="addressErrorSection" className="text-danger form-text">
                        {address1Error}
                    </small> 

                     { isSuccess && <SuccessAlert></SuccessAlert>}            
                    
                </div>

                <div className="row">
                    <div className="pt-1 col-3">First Name:<span style={{color:"red"}}>*</span> 
                    </div>                   
                    <div className="pt-1 col-3">
                          <input type="firstName" id="firstName" className="form-control" autoComplete="off"
                            onChange={(event) => setFirstName(event.target.value)}/> 
                    </div> 
                    <div className="pt-1 col-3">Last Name: <span style={{color:"red"}}>*</span>
                    </div>                   
                    <div className="pt-1 col-3">
                          <input type="lastName" id="lastName" className="form-control" autoComplete="off"
                          onChange={(event) => setLastName(event.target.value)}/>  
                      </div>  
                </div>

                <div className="row">
                    <div className="pt-1 col-3">Gender:<span style={{color:"red"}}>*</span> </div>                   
                    <div className="pt-1 col-3">
                          <select type="select" id="gender" className="form-control" onChange={(event) => setGender(event.target.value)}>
                              <option value="">Select Gender....</option>
                              <option value="M">Male</option>
                              <option value="F">Female</option>
                              <option value="O">Other</option>
                            </select> 
                    </div>

                    <div className="pt-1 col-3">Date of Birth:<span style={{color:"red"}}>*</span> </div>                   
                    <div className="pt-1 col-3 form-group">
                                <VoterDOB id="dobId" ref={dobRef}></VoterDOB>
                    </div>    
                </div>

                <div className="row">
                    <div className="pt-1 col-3">Email:<span style={{color:"red"}}>*</span> </div>                   
                    <div className="pt-1 col-3">
                          <input type="email" id="email" className="form-control" autoComplete="off"
                          onChange={(event) => setEmail(event.target.value)}/> 
                      </div> 
                      <div className="pt-1 col-3">Mobile:<span style={{color:"red"}}>*</span> </div>                   
                    <div className="pt-1 col-3">
                          <input type="mobile" id="mobile" className="form-control" autoComplete="off"
                          onChange={(event) => setMobile(event.target.value)}/> 
                      </div> 
                </div>

                <div className="row">
                    <div className="pt-1 col-3">Address1:<span style={{color:"red"}}>*</span> </div>                   
                    <div className="pt-1 col-3">
                          <input type="address1" id="address1" className="form-control" autoComplete="off"
                          onChange={(event) => setAddress1(event.target.value)}/> 
                      </div>
                      <div className="pt-1 col-3">Address2: </div> 
                      <div className="pt-1 col-3">
                          <input type="address2" id="address2" className="form-control" autoComplete="off"
                          onChange={(event) => setAddress2(event.target.value)}/> 
                      </div>  
                </div>

                <div className="row">
                <div className="pt-1 col-3">State:<span style={{color:"red"}}>*</span> </div>    
                    <div className="pt-1 col-3">
                        <select type="state" id="state" className="form-control" 
                                        //onChange={(event) => setState(event.target.value)}
                                        onChange={(event, value) => changeCity(event, value)}>
                            <option value="">Select State....</option>
                        {
                             states.map((item, i) => (
                                <option key={i} value={item.stateId}>{item.stateName}</option>                                     
                             ))
                        }
                        </select> 
                      </div> 
                    <div className="pt-1 col-3">City:<span style={{color:"red"}}>*</span> </div>                   
                    <div className="pt-1 col-3">
                        <select type="city" id="cityId" className="form-control" value = {selectedCity}
                                       //{
                                      // onChange={
                                       //    (event) => setState(event.target.value)
                                       // } 
                                        onChange={(event,value) => resetCity(event, value)}
                                        >
                                <option value="" >Select City....</option>
                                {
                                    cities.map((item, i) => (
                                        <option key={i} value={item.cityId} >{item.cityName}</option>                                     
                                     ))
                                }
                            </select>
                      </div>
                                      
                </div>
                
                <div className="row">
                    <div className="pt-1 col-6"></div>
                    <div className="pt-1 col-6">
                      <button type="button" className="btn gradient-custom-2" onClick={save}>Add</button>
                    </div>
                    
                </div>
                </div>
                               
        </div>
    );
}

export default AddVoter;
