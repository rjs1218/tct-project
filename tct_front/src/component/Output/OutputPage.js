import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function OutputPage() {
    const [text, setText] = useState([]);

    const navigate = useNavigate();

    const onPassDate = () => {
        navigate('/TCT', {
            state: {
                c: 4
            }
        })
    }

    const noPassDate = () => {
        navigate('/TCT', {
            state: {
                c: 0
            }
        })
    }
    
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
            <div className='tct'>
                <div className='tct-left'>
                    <div>
                        <h1>3. 의도한대로 쓰여졌나요?</h1>
                        <p>앞서 입력한 글의 내용과 주제의<br/>유사도는 다음과 같아요.</p>
                    </div>
                </div>

                <div className='tct-right'>
                    {text.map((e) => (
                        <div>
                            <h1>{e.cate}선택한 주제</h1>
                            <p>{e.similar}유사도</p>
                        </div>
                    ))}
                    <div className="tct-footer">
                        <div className='left'>
                            <button className="footer_button" onClick={noPassDate}>HOME</button>
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