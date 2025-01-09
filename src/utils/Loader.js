import React, { Component } from "react";
import "../css/loader.css";

function Loader() {

    return (
        <div className="overlay">
            <div className="loader">
                <div className="spinner"></div> {/* Spinning wheel */}
                <p>Loading...</p>
            </div>
        </div>
    )

}

export default Loader;