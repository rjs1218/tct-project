import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Header.css';

function Header() {
    return (
        <div className="header">
            <Link to="/" className="link">CONNECT</Link>
            <hr></hr>
        </div>
    );
}

export default Header;