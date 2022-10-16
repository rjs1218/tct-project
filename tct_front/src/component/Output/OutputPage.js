import React, { useState } from 'react';
import '../../css/Second.css';
import Header from '../Home/Header';
import Footer from './Footer3';
import axios from 'axios';

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
                        <p>앞서 입력한 글의 내용과 주제의 유사도는 다음과 같아요.</p>
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
            </div>
            <Footer />
        </div>
    );
}

export default OutputPage;