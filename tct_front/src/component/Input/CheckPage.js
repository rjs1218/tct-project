import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

function CheckPage() {
    const location = useLocation();

    const files = location.state.file; //e.target[0].files[0];
    const cate = location.state.cates;
    console.log(files)
    console.log(cate)

    const navigate = useNavigate();

    const uploadMoudule = async () => {

        const formData = new FormData();

        formData.append("content", files)
        formData.append("category", cate)

        const URL = "http://127.0.0.1:8000/tct/post/"

        axios({
            method: "post", // 전송 요청
            url: URL,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData, // 꼭 생성되어있는 formData 객체만 전송가능

        }).then(function (response) {
            console.log(response) //성공시 출력되는 로그
        }).catch(function(error) {
            console.log(error)
        })

        navigate('/TCT', {
            state: {
                c: 3
            }
        })
    }

    const noPassDate = (e) => {
        navigate('/TCT', {
            state: {
                c: 0
            }
        })
    }

    return (
        <div>
            <div className='tct'>
                <div className='tct-left'>
                    <div>
                        <h1>혹시 선택한 것들이 맞나요?</h1>
                        <p>아니라면 다시 선택해주세요 :)</p>
                    </div>
                </div>
                <div className='tct-right'>
                    <div>
                        <h6>{files.name}</h6>
                        <h6>{cate}</h6>
                    </div>

                    <div className="tct-footer">
                        <div className='left'>
                            <button className="footer_button" onClick={noPassDate}>PREV</button>
                        </div>
                        <div className='center'>   </div>
                        <div className='right'>
                            <button className="footer_button" onClick={uploadMoudule}>NEXT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckPage;