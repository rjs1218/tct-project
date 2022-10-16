import React from 'react';
import { Link } from "react-router-dom";
import '../../css/Footer.css';

function Footer() {

    return (
        <div className="footer">
            <div className='left'>
                <Link to="/"><button className="footer_button">HOME</button></Link>
            </div>
            <div className='center'></div>
            <div className='right'>
                <Link to="/CategoryPage">
                    <button className="footer_button">NEXT</button>
                </Link>
            </div>
        </div>
    );
}

export default Footer; 