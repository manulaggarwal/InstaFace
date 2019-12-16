import React from 'react';
import './logo.css';
import instaFaceLogo from './instaface_logo.png';

export default () => (
    <div className="logo-main">
        <span>
            <img alt="fb_logo" style={{ width: "130px", height: "30px" }} src={instaFaceLogo}></img>
        </span>
        {/* <span>
            <img alt="insta_logo" style={{ width: "130px", height: "50px", margin: "5px 0px 0px 10px" }} src={instaLogo}></img>
        </span> */}
        {/* <strong className="logo-insta">Insta</strong><strong className="logo-fb">Face</strong> */}
    </div>)