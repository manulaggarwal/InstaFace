import React from 'react';
import './logo.css';
import instaLogo from './logo-removebg.png';

export default ({ width = "", height = "" }) => (
    <div className="logo-main">
        <span>
            <img alt="fb_logo" style={{ width: "130px", height: "30px" }} src={instaLogo}></img>
        </span>
    </div>)