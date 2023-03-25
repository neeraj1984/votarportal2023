import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from "./user/Login";
import Home from "./voter/Home";
import SignUp from "./user/SignUp";
import AddVoter from './voter/AddVoter';
import UpdateVoter from './voter/updateVoter';
import DeleteVoter from './voter/DeleteVoter';
import VoterList from './voter/voterList';

import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>   
  <BrowserRouter> 
    <Routes>
      <Route index element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="addVoter" element={<AddVoter />} />
      <Route path="updateVoter" element={<UpdateVoter />} />
      <Route path="DeleteVoter" element={<DeleteVoter />} />
      <Route path="voterList" element={<VoterList />} />
    </Routes> 
  </BrowserRouter> 
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
