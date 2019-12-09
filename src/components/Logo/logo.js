import React from 'react';
import './logo.css';
import fbLogo from './facebook_logos.png';
import instaLogo from './Instagram_logo.svg';

export default () => (
    <div className="logo-main">
        <span style={{ borderRight: "1px solid", padding: "0px 10px" }}>
            <img style={{ width: "130px", height: "30px" }} src={fbLogo}></img>
        </span>
        <span>
            <img style={{ width: "130px", height: "50px", margin: "5px 0px 0px 10px" }} src={instaLogo}></img>
        </span>
        {/* <strong className="logo-insta">Insta</strong><strong className="logo-fb">Face</strong> */}
    </div>)