import React, { useState } from 'react';
import axios from 'axios';

function Input_Cate() {
    const [label, setLabel] = useState('판타지 소설 공상');

    const onFileChange2 = async (e) => {
        const label = "판타지 소설 공상" //카테고리
        setLabel(label)
        console.log(label)

        axios
        .post("API URL", {
                maintitle: label,
        })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    return(
        <div>
            <p className='t'>▼</p>
            <button className="labelbutton" onClick={onFileChange2}>{label}</button>
        </div>
    );
}

export default Input_Cate;