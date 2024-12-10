import React, { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/login.css";
import lotus from "../img/lotus.jpeg";
import axios from "axios";
import AuthContext from "../store/auth-context";
import Logo from "../user/Logo";
import Loader from "../utils/Loader";


function Login(){

//class Login extends React.Component{

const loginURL = "http://localhost:8080/api/auth/signin";  
// Declare a new state variable, which we'll call "password"
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const [passwordError, setpasswordError] = useState("");
const [emailError, setemailError] = useState("");
const [loginServiceError, setloginServiceError] = useState("");
const navigate = useNavigate();
const authCxt = useContext(AuthContext);
const [isLoading, setIsLoading] = useState(false);

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': true,
}

const data = {
  userName: email,
  password: password,

}

function invokeLoginService(){
  setIsLoading(true);
  axios.post(
          loginURL, data,
          {headers:headers},
        ).then((response) => {
            if(response.data.accessToken !== ""){
              //authCxt.login(response.data.token);
              setIsLoading(false);
              localStorage.setItem("user", JSON.stringify(response.data));
              navigate("/home", {replace:true});
            }else{
              alert("some error occurred");
              setIsLoading(false);
            }
    }).catch(error => {
      if(error.response.status == 401){
        setloginServiceError("Bad credentials.");
      }else{
        setloginServiceError("Some error has occurred.");
      } 
      setIsLoading(false);    
    });
      
}

const loginSubmit = (e) => {
    e.preventDefault();
    var valid = handleValidation();
    /*
    if(valid){
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false); // Hide the loader after 2-3 seconds
        invokeLoginService();
      }, 2000); // 2 seconds delay      
    } 
    */
   if(valid){
    invokeLoginService();
   }   
  };

  const handleValidation = (event) => {
    let formIsValid = true;
    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }
    // Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/)) {
      
      formIsValid = false;
      setpasswordError(
        "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };



    return(           

        <div className="h-100" style={{backgroundColor: "#eee"}}>
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-xl-10">
                  <div className="card rounded-3 text-black">
                    <div className="row g-0">
                      <div className="col-lg-6">
                        <div className="card-body p-md-5 mx-md-4">
                          
                          <Logo></Logo>
                          

                          <form id="loginform" onSubmit={loginSubmit}> 
                            <p>Please login to your account</p>

                            <div className="form-outline mb-4">
                              <input type="email" id="emailId" className="form-control"
                                placeholder="User name or email address" 
                                onChange={(event) => setEmail(event.target.value)}/>
                              <label className="form-label" htmlFor="formUserLabel">Username</label>
                              <small id="emailHelp" className="text-danger form-text" style={{marginLeft:"10px"}}>
                                  {emailError}
                              </small>
                            </div>

                            <div className="form-outline mb-4">
                              <input type="password" id="passwordId" className="form-control" 
                              onChange={(event) => setPassword(event.target.value)}/>
                              <label className="form-label" >Password</label>
                                <small id="passwordErrorSection" className="text-danger form-text" style={{marginLeft:"10px"}}>
                                  {passwordError}
                                </small>
                            </div>

                            <small id="loginErrorSection" className="text-danger form-text" style={{marginLeft:"10px"}}>
                                  {loginServiceError}
                                </small>

                            {isLoading && <Loader/>} {/* Conditionally render the loader */}

                            <div className="text-center pt-1 mb-5 pb-1">
                              {/*
                            <a className="text-muted" href="#!" style={{marginRight:"20px"}} onClick={() => navigate("/SignUp", {replace:true})}>Sign Up</a>
                              */}
                              <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" 
                              type="submit">
                                Log in</button>
                              <a className="text-muted" href="#!" style={{marginLeft:"20px"}}>Forgot password?</a>
                            </div>

                            <div className="align-items-center justify-content-center pb-4">
                              <p className="mb-0 me-2">Don't have an account?</p>
                              <button type="button" className="btn gradient-custom-2" onClick={() => navigate("/SignUp", {replace:true})}>Create new</button>
                            </div>

                          </form>

                        </div>
                      </div>
                      <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                          <h4 className="mb-4">We are more than just a company</h4>
                          <p className="small mb-0">VIS is one place hub for all the information related to voters.
                          The systems contain: 1. Basic data, including data on electoral districts, municipalities, 
                          voting districts and election authorities. 2. Data on polling</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}
    


export default Login;