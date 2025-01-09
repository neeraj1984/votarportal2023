import axios from "axios";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import {useState,useEffect} from "react";
import "../css/header.css";
import Logo from "./Logo"

function Header(){
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    
    function invalidateToken(){
      const logoutURL = "http://localhost:8080/api/auth/logout";
      const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true,
          Authorization: "Bearer " + user.accessToken
      }

      axios.get(logoutURL,{headers:headers})
      .then((response) => {
          //alert(response.data);
          //alert("test hello");
      })
      .catch(error => (console.log("error")) )
  }
    
    const logout = () => {
        invalidateToken();
        localStorage.removeItem('user');
        navigate("/login", {replace:true});
      };

    const homePage = () => {
        navigate("/home", {replace:true});
      };

    const[currentPage, setCurrentPage] = useState("");

    useEffect(() => {
        setCurrentPage(window.location.pathname);
      },[]);

    return(
           
    <div className="row headerColor header" >
        <Logo></Logo>
        <div className="pt-1 col-8">
            <h4> Welcome {user.username}</h4>                         
        </div>        
           
        <div className="pt-1 col-2">           
            {
            //Immediately Invoked Function Expression (IIFE)
            (() => {
                if (currentPage !== '/home'){
                  return (
                    <a className="text-muted" href="#!" style={{marginRight:"20px"}} onClick={homePage} >Home</a>
                  )
              }             
              return null;
            })()
            }           
        </div>
                   
        
        <div className="pt-1 col-2">
            <a className="text-muted" href="#!" style={{marginRight:"20px"}} onClick={logout} >Log out</a>
        </div>
    </div>
                
    )
}


export default Header;
