import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";


export function Input_File() {
    const [files, setFiles] = useState(null);
    const [label, setLabel] = useState('+++');

    const navigate = useNavigate();

    // 데이터 넘기기
    const onPassDate = () => {
        navigate('/TCT', {
            state: {
                file: files[0],
                c: 1
            }
        })
    }

    const onFileChange = async (e) => {
        const file = e.target.files

        // 파일 상태 setFiles에 저장
        setFiles(file)

        const label = file[0].name //파일 이름
        setLabel(label)

        // 파일 내용 출력 및 저장
        let file2 = e.target.files[0];
        let fileReader = new FileReader()

        fileReader.onload = () => {
            
        //   console.log(fileReader.result) //파일 내용
        }
        fileReader.readAsText(file2)
    }

    return (
        <div>
            <p className='t'>▼</p><br/>
            <label htmlFor="input-file" >{label}</label>
            <input type="file" id="input-file" accept='.txt' onChange={onFileChange} data-target={files} />

            <div className="tct-footer">
                <div className='left'>
                    <Link to='/'><button className="footer_button">HOME</button></Link>
                </div>
                <div className='center'>1/5</div>
                <div className='right'>
                    <button className="footer_button" onClick={onPassDate}>NEXT</button>
                </div>
            </div>
        </div>
    );
}

export default Input_File;