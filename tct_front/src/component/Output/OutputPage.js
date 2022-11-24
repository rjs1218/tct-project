import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function OutputPage() {
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

    const keywordtest = [
        {
            "id": 138,
            "keyword": "고급 주방",
            "file_id": 41
        },
        {
            "id": 139,
            "keyword": "건강식 서양식",
            "file_id": 41
        },
        {
            "id": 140,
            "keyword": "냉장고 재료",
            "file_id": 41
        }
    ]
    
    // 데이터 조회 요청
    const URL = 'http://127.0.0.1:8000/tct/keyword/get-keyword/'

    const [data, setData] = useState(null);

    //@@@@@@두번째
    //responseType : 서버가 응답해주는 데이터의 타입 지정 
    //(arraybuffer, documetn, json, text, stream, blob)
    const onget = async () => {
        axios({
            method: "get",
            url: URL,
            responseType: "json"
        }).then(function (response) {
            // response Action
            setData(response.data)
            console.log(response.data)
        }).catch(function(error) {
            console.log(error)
        });
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
                    <button onClick={onget}>불러오기</button>
                    {/* 1 */}
                    {keywordtest.map(user => (
                        <li >
                            {user.keyword}
                        </li>
                    ))}
                    {/* 2 */}
                    <li>{JSON.stringify(keywordtest.keyword)}</li>

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