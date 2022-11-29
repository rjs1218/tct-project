import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Load from '../Loading'

function CheckPage() {
    const [loading, setLoad] = useState(null);
    
    const location = useLocation();

    const file = location.state.files;
    const cate = location.state.cates;

    const navigate = useNavigate();

    const uploadMoudule = async () => {
        setLoad(true)
        
        const formData = new FormData();

        formData.append("file", file)
        // formData.append("category", cate)

        const URL = "http://127.0.0.1:8000/tct/file-upload/"

        axios({
            method: "post",
            url: URL,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,

        }).then(function (response) {
            console.log(response)
            setLoad(false);

            navigate('/TCT', {
                state: {
                    c: 3,
                    files: file,
                    cates: cate
                }
            })
        }).catch(function(error) {
            console.log(error)
        })
    }

    const noPassDate = () => {
        navigate('/TCT', {
            state: {
                c: 0,
            }
        })
    }

    return (
        <div>
            {loading && <Load />}
            <div className='tct'>
                <div className='tct-left'>
                    <div>
                        <h1>혹시 선택한 것들이 맞나요?</h1>
                        <p>아니라면 다시 선택해주세요 :)</p>
                    </div>
                </div>
                <div className='tct-right'>
                    <div>
                        <h6>{file.name}</h6>
                        <h6>{cate}</h6>
                    </div>

                    <div className="tct-footer">
                        <div className='left'>
                            <button className="footer_button" onClick={noPassDate}>AGAIN</button>
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