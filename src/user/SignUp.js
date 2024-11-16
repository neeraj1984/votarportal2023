import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import axios from "axios";
import "../css/signup.css";


const signUpURL = "http://localhost:8080/api/auth/signup";  
const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': true,
  }



class SignUp extends Component {
    //class component can not use useNavigate hook rather Navigate component
    constructor(props) {
        super(props);
        this.handleRegister   = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        
        this.state = {
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          successful: false,
          usernameError: "",
          passwordError: "",
          firstNameError: "",
          lastNameError: "",
          redirectToLogin: false, 
        };
      }

      onChangeUsername(e) {
        this.setState({
          username: e.target.value,
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value,
        });
      }

      onChangeFirstName(e) {
        this.setState({
          firstName: e.target.value,
        });
      }

      onChangeLastName(e) {
        this.setState({
          lastName: e.target.value,
        });
      }


    handleRegister(e) {

        const data = {
            userName: this.state.username,
            password: this.state.password,
            firstName:this.state.firstName,
            lastName:this.state.lastName
          }
        //alert(this.state.username);
        e.preventDefault();
    
        this.setState({
          successful: false,
        });
        //in class component, we need to bind and use "this" to call method
        var valid = this.handleValidation(); 
        if(valid){

            axios.post(
                signUpURL, data,
                {headers:headers},
              ).then((response) => {
                this.setState({ 
                  redirectToLogin: true, 
                });   
                alert(response.data.message + " You will be redirected to login page to Sign in.");
                  //this.props.history.push('/login');
                  //this.props.navigate('/login'); 
                               
          }).catch(error => {
            //alert(error);
            if (!error.response) { //network error handling
              alert(
                "You can not sign up at this moment as service seems to be down."
              );
            }
          });

        }
}

handleValidation(e) {
    let formIsValid = true;
    if (!this.state.username.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
      formIsValid = false;
      this.state.usernameError = "User name is not valid";
      return false;
    } else {
      this.state.usernameError = "";
      formIsValid = true;
    }
    // Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character
    if (!this.state.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/)) {
      
      formIsValid = false;
      this.state.passwordError =
        "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
      ;
      return false;
    } else {
        this.state.passwordError = "";
      formIsValid = true;
    }

    if(this.state.firstName == ""){
      formIsValid = false;
      this.state.firstNameError = "First Name is required";
    }

    if(this.state.lastName == ""){
      formIsValid = false;
      this.state.lastNameError = "Last Name is required";
    }

    return formIsValid;
  }


    render() {
        const { message} = this.props;
        const { redirectToLogin } = this.state;
        // If "redirectToLogin" is true, render Navigate to redirect to /login
        if (redirectToLogin) {
          return <Navigate to="/login" />;
        }
        return (

            <div className="col-md-12">
              <div className="card bg-light text-dark">
      
                <h1><center>User Registration </center></h1>
      
      
                <form onSubmit={this.handleRegister}
                  ref={(c) => {
                    this.form = c;
                  }}
                >
                  {!this.state.successful && (
                    <div>
                      <div className="form-group">
                        <label htmlFor="username">Username/Email</label>
                        <input type="text"
                          className="form-control"
                          name="username"
                          value={this.state.username}
                          style={{width: "25%"}}
                          onChange={this.onChangeUsername}
                        />
                         <small id="emailHelp" className="text-danger form-text" style={{marginLeft:"10px"}}>
                                  {this.state.usernameError}
                              </small>
                      </div>
      
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={this.state.password}
                          style={{width: "25%"}}
                          onChange={this.onChangePassword}
                        />

                        <small id="passwordHelp" className="text-danger form-text" style={{marginLeft:"10px"}}>
                                  {this.state.passwordError}
                              </small>

                      </div>

                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          value={this.state.firstName}
                          style={{width: "25%"}}
                          onChange={this.onChangeFirstName}
                        />

                        <small id="firstNameHelp" className="text-danger form-text" style={{marginLeft:"10px"}}>
                                  {this.state.firstNameError}
                              </small>

                      </div>

                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          value={this.state.lastName}
                          style={{width: "25%"}}
                          onChange={this.onChangeLastName}
                        />

                        <small id="lastNameHelp" className="text-danger form-text" style={{marginLeft:"10px"}}>
                                  {this.state.lastNameError}
                              </small>

                      </div>
      
                      <div className="form-group">
                        <button className="btn btn-dark btn-block">
                                   Sign Up</button>
                      </div>
                    </div>
                  )}

                </form>
              </div>
            </div>
          ); 
    }

}


export default SignUp;