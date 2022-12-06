import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

function OutputPage() {
    const [loading, setLoad] = useState(null);
    const [model_percent, setMPercent] = useState(null);
    const [user_percent, setUPercent] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const cate = location.state.cates;
    const file = location.state.files;
    
    const URL = 'http://127.0.0.1:8000/tct/keyword/get_keyword/'

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

        if (cate === "경제학") {
            setMPercent("99.2%")
            setUPercent("99.2%")
        }
        if (cate === "정치학") {
            setMPercent("99.8%")
            setUPercent("0.002%")
        }
        if (cate === "교육학") {
            setMPercent("99.9%")
            setUPercent("99.9%")
        }
    }, []);

    const onPassDate = () => {
        navigate('/TCT', {
            state: {
                c: 4,
                keywords: data,
                files: file,
                cates: cate
            }
        })
    }

    const noPassDate = () => {
        navigate('/TCT', {
            state: {
                c: 2,
                files: file,
                cates: cate
            }
        })
    }

    return (
        <div>
            <div className='tct'>
                <div className='tct-left'>
                    <div>
                        <h1>3. 의도한대로 쓰여졌나요?</h1>
                        <p>앞서 입력한 글의 내용과 주제의<br/>유사도는 다음과 같아요.</p>
                    </div>
                </div>

                <div className='tct-right'> 
                    <span id='percent'>
                        <p>모델</p>
                        <h5>{cate}</h5>
                        <h5 className='percent'>{model_percent}</h5>
                    </span>
                    <span id='percent'>
                        <p>사람</p>
                        <h5>{cate}</h5>
                        <h5 className='percent'>{user_percent}</h5>
                    </span>

                    {loading && data.map(user => (
                        <li className='tct-keyword'>
                            {user.keyword}
                        </li>
                    ))}
                    <div className="tct-footer">
                        <div className='left'>
                            <button className="footer_button" onClick={noPassDate}>PREV</button>
                        </div>
                        <div className='center'>3/5</div>
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