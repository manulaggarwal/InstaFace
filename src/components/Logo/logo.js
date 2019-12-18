import React from 'react';
import './logo.css';

import instaLogo from './logo-removebg.png';

export default ({w="", h=""}) => (
    <div className="logo-main">
        <span>
            <img alt="insta_logo" width={w} height={h} src={instaLogo}></img>
        </span>
        <span style={{color:"white"}}>
            InstaFace
        </span> 
    </div>)