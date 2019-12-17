import React from 'react';
import './logo.css';
import instaFaceLogo from './instaface_logo.png';
import fbLogo from './facebook_logos.png';
import instaLogo from './logo-removebg.png';

export default ({width="", height=""}) => (
    <div className="logo-main">
        <span>
            <img alt="insta_logo" width={width} height={height} src={instaLogo}></img>
        </span> 
    </div>)