import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

function OutputPage() {
    const [loading, setLoad] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const cate = location.state.cates;
    const file = location.state.files;
    // const data2 = [{keyword:'test'}, {keyword: 'test'}, {keyword: 'test'}]
    // const cosins = {percent:"90%"}
    
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
                    <h5>{cate}</h5>
                    <h5 className='percent'>{loading && data.percent}</h5>
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
