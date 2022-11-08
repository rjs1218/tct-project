import React, { useState } from 'react';
import { Link } from "react-router-dom";

import "../css/MG.css";
import '../css/TCT.css';
import '../css/Footer.css';

import Header from './Home/Header';
import File from './Input/FileInputPage';
import Cate from './Input/CategoryPage';
import {Input_Cate} from './Input/Input_Cate';

import First from './Output/OutputPage';
import Secon from './Output/OutputPage2';
import MG from './Output/MagicGridPage';

function TCT() {
    const [count, setCount] = useState(0)

    const [bText, setBText] = useState("HOME")
    const [bText2, setBText2] = useState("NEXT")
    
    const [link, setLink] = useState("/")
    const [link2, setLink2] = useState("")

    const User = () =>{
        switch (count){
            case 0:
                console.log(count)
                return (<File />)
            case 1:
                console.log(count)
                Input_Cate()
                return (<Cate />)
            case 2:
                console.log(count)
                
                return (<First />)
            case 3:
                console.log(count)
                return (<Secon />)
            case 4:
                console.log(count)
                return (<MG />)
            default:
        }
    }

    const onCountUp = () => {
        if (count >= 0 && bText === "HOME"){
            setBText("PREV")
            setLink("")
        }

        setCount(count + 1)

        if (count === 3){
            setLink2("/")
            setBText2("HOME")
        }
    }

    const onCountDown = () => {
        if (count <= 1 && bText === "PREV"){
            setBText("HOME")
            setLink("/")
        }
        setCount(count - 1)

        if (count === 4){
            setLink2("")
            setBText2("NEXT")
        }
        
    }

    return (
        <div>
            <Header />
            <div>
                <User /> 
            </div>
            
            <div className="footer">
                <div className='left'>
                    <Link to={link}><button className="footer_button" onClick={onCountDown}>{bText}</button></Link>
                </div>
                <div className='center'>{count + 1}/5</div>
                <div className='right'>
                    <Link to={link2}><button className="footer_button" onClick={onCountUp}>{bText2}</button></Link>
                </div>
            </div>
        </div>
    );
}

export default TCT;