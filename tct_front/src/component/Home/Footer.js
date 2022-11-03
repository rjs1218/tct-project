import React from 'react';
import { Link } from "react-router-dom";

import '../../css/Footer.css';

function Footer() {
    return (
        <div className="footer">
            <div className="left"></div>
            <div className="center"></div>

            <div className="right">
                <Link to="/" reloadDocument="true" className='link'>CONNECT</Link>
                <p className='footer_text'>개인정보취급약관</p>
                <p className='footer_text'>이용약관</p>
            </div>
            {/* <div className='movetop'>↑</div> */}
        </div>
    );
}

export default Footer;