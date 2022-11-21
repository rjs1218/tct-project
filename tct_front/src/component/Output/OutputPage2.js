import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();

    const onPassDate = () => {
        navigate('/TCT', {
            state: {
                c: 5
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
                {end.map((e) => (
                        <div>
                            <h1>{e.cate}분석한 카테고리</h1>

                            <p>추천 색상</p>
                            <p>{e.color1}{e.color2}{e.color3}</p>

                            <p>{e.keywords}분석한 키워드</p>

                            <p>위와 같은 키워드와 관련도가 높아요.</p>
                        </div>
                    ))}
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