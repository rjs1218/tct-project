import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

function OutputPage() {
    const [loading, setLoad] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const cate = location.state.cates;
    const keywords = location.state.keywords;
    const file = location.state.files;

    const URL = 'http://127.0.0.1:8000/tct/image/get_rgb/'

    const [data, setData] = useState();

    useEffect(() => {
        axios({
            method: "get",
            url: URL,
            responseType: "json"
        }).then(function (response) {
            setData(response.data)
            setLoad(true)
        }).catch(function(error) {
            console.log(error)
        });
    }, []);

    const onPassDate = () => {loading &&
        navigate('/TCT', {
            state: {
                c: 5,
                keywords: keywords,
                files: file,
                cates: cate,
                codes: data
            }
        })
    }

    const noPassDate = () => {
        navigate('/TCT', {
            state: {
                c: 3,
                keywords: keywords,
                files: file,
                cates: cate,
            }
        })
    }
    
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
                            <div id='block'>
                                {loading && keywords.map(user => (
                                    <h1 id='tct-keywords'>{user.keyword}</h1>
                                ))}
                                <p>위와 같은 키워드와 관련도가 높은 색상이에요.</p>
                            </div>
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