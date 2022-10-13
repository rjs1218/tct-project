import React from 'react';
import './Footer.css';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="footer">
            <hr></hr>
            <Link to="/" reloadDocument="true" className="link">CONNECT</Link>
            <p>개인정보취급약관</p>
            <p>이용약관</p>

            {/* <div className='movetop'>↑</div> */}
        </div>
    );
}

export default Footer;