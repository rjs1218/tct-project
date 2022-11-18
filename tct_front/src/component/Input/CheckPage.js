import React from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';

import Header from '../Home/Header';

function CheckPage() {
    const location = useLocation();

    const files = location.state.file; //e.target[0].files[0];
    const cate = location.state.cates;
    console.log(files)
    console.log(cate)

    const uploadMoudule = async () => {

        const formData = new FormData();

        formData.append("content", files)
        formData.append("category", cate)

        const URL = "http://127.0.0.1:8000/tct/post/"

        axios({
            method: "post", // 전송 요청
            url: URL,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData, // 꼭 생성되어있는 formData 객체만 전송가능

        }).then(function (response) {
            console.log(response) //성공시 출력되는 로그
        }).catch(function(error) {
            console.log(error)
        })
    }

    return (
        <div>
            <Header />
            <div className='second'>
                <div className='second-left'>
                    <div>
                        <h1>혹시 선택한 것들이 맞나요?</h1>
                        <p>아니라면 다시 선택해주세요 :)</p>
                        <Link to='/File'><button className="footer_button">PREV</button></Link>
                    </div>
                </div>
                <div className='second-right'>
                    <div>
                        <h1>{files.name}</h1>
                        <p>{cate}</p>
                        <Link to='/First'><button className="next_button" onClick={uploadMoudule}>NEXT</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckPage;