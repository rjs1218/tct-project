import React from 'react';
import { useLocation } from "react-router-dom";

import "../css/MG.css";
import '../css/TCT.css';

import Header from './Home/Header';
import File from './Input/FileInputPage';
import Cate from './Input/CategoryPage';
import Check from './Input/CheckPage';

import First from './Output/OutputPage';
import Secon from './Output/OutputPage2';
import MG from './Output/MagicGridPage';

function TCT() {
    const location = useLocation();

    const count = location.state.c;

    const User = () =>{
        switch (count){
            case 0:
                console.log(count)
                return (<File />)
            case 1:
                console.log(count)
                return (<Cate />)
            case 2: 
                console.log(count)
                return (<Check />)
            case 3:
                console.log(count)
                return (<First />)
            case 4:
                console.log(count)
                return (<Secon />)
            case 5:
                console.log(count)
                return (<MG />)
            default:
        }
    }

    return (
        <div>
            <Header />
            <div>
                <User /> 
            </div>
        </div>
    );
}

export default TCT;