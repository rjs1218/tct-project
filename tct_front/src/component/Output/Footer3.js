import React from 'react';
import { Link } from "react-router-dom";
import '../../css/Footer.css';

function Footer3() {

    return (
        <div className="footer">
            <div className='left'>
                <Link to="/CategoryPage"><button className="footer_button">PREV</button></Link>
            </div>
            <div className='center'></div>
            <div className='right'>
                <Link to="/Output">
                    <button className="footer_button">NEXT</button>
                </Link>
            </div>
        </div>
    );
}

export default Footer3; 