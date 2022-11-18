import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import Header from '../Home/Header';

function OutputPage() {
    const [text, setText] = useState([]);
    
    axios
    .get("API URL")
    .then((response) => {
        setText([...response.data]);
        console.log(response.data);
        })
    .catch(function (error) {
        console.log(error)
    })

    return (
        <div>
            <Header />
            <div className='second'>
                <div className='second-left'>
                    <div>
                        <h1>3. 의도한대로 쓰여졌나요?</h1>
                        <p>앞서 입력한 글의 내용과 주제의<br/>유사도는 다음과 같아요.</p>
                    </div>
                </div>

                <div className='second-right'>
                    {text.map((e) => (
                        <div>
                            <h1>{e.cate}선택한 주제</h1>
                            <p>{e.similar}유사도</p>
                        </div>
                    ))}
                </div>
                <div className="footer">
                    <div className='left'>
                        <Link to='/'><button className="footer_button">HOME</button></Link>
                    </div>
                    <div className='center'>3/5</div>
                    <div className='right'>
                        <Link to='/Secon'><button className="footer_button">NEXT</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OutputPage;