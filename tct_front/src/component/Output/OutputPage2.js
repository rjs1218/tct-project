import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

function OutputPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const keywords = location.state.keywords;

    const [loading, setLoad] = useState(null);

    const onPassDate = () => {
        navigate('/TCT', {
            state: {
                c: 5,
                keywords: keywords,
            }
        })
    }

    const noPassDate = () => {
        navigate('/TCT', {
            state: {
                c: 3
            }
        })
    }

    // 데이터 조회 요청
    const URL = 'http://127.0.0.1:8000/tct/image/get_rgb/'

    const [data, setData] = useState();

    // 비동기적 요청
    useEffect(() => {
        axios({
            method: "get",
            url: URL,
            responseType: "json"
        }).then(function (response) {
            // response Action
            setData(response.data)
            console.log(response.data)
            setLoad(true)
        }).catch(function(error) {
            console.log(error)
        });
    }, []);
    
    return (
        <div>
            <div className='tct'>
                <div className='tct-left'>
                    <div>
                        <h1>4. TCT</h1>
                        <p>이런 제목과 색상은 어떠세요?</p>
                    </div>
                </div>
                <div className='tct-right'>
                        <div>
                            <h5>추천 색상</h5>
                            <div id='block'>
                                {loading && data.map(user => (
                                    <span style={{backgroundColor: "rgb"+user.code}}>&nbsp;</span>
                                ))}
                            </div>
                            {keywords.map(user => (
                                <h1 id='tct-keywords'>{user.keyword}</h1>
                            ))}
                            
                            <p>위와 같은 키워드와 관련도가 높아요.</p>
                        </div>

                    <div className="tct-footer">
                        <div className='left'>
                            <button className="footer_button" onClick={noPassDate}>PREV</button>
                        </div>
                        <div className='center'>4/5</div>
                        <div className='right'>
                            <button className="footer_button" onClick={onPassDate}>NEXT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OutputPage;
