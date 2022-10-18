import React, { useState } from 'react';
import '../../css/Second.css';
import Header from '../Home/Header';
import Footer from './Footer4';
import axios from 'axios';

function OutputPage() {
    const [end, setEnd] = useState([]);
    
    axios
    .get("API URL")
    .then((response) => {
        setEnd([...response.data]);
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
                        <h1>4. TCT</h1>
                        <p>이런 제목과 색상은 어떠세요?</p>
                    </div> 
                </div>
                <div className='second-right'>
                {end.map((e) => (
                        <div>
                            <h1>{e.cate}분석한 카테고리</h1>

                            <p>추천 색상</p>
                            <p>{e.color1}{e.color2}{e.color3}</p>

                            <p>{e.keywords}분석한 키워드</p>

                            <p>위와 같은 키워드와 관련도가 높아요.</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default OutputPage;