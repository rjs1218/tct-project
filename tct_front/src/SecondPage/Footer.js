import React from 'react';
import { useNavigate } from "react-router-dom";

function Footer() {
    let navigate = useNavigate();

    function handleClick() {
      navigate("/", {replace: true});
    }
    // function handleClick2() {
    //     navigate("/Second2", {replace: true});
    //   }
    return (
        <div>
            <button onClick={handleClick} >HOME</button>
            <button>NEXT</button>
            {/* <button onClick={handleClick2}>NEXT</button> */}
        </div>
    );
}

export default Footer;