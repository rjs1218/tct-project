import React, { useState } from 'react';
import '../../css/Second.css';
import axios from 'axios';

function Input_File() {
    const [files, setFiles] = useState(null);
    const [label, setLabel] = useState('+++');

    const onFileChange = async (e) => {
        const file = e.target.files
        console.log('file', file)

        // 파일 상태 setFiles에 저장
        setFiles(file)

        const label = file[0].name //파일 이름
        setLabel(label)

        // 파일 내용 출력 및 저장
        let file2 = e.target.files[0];
        let fileReader = new FileReader()

        fileReader.onload = () => {
            
          console.log(fileReader.result) //파일 내용
        }
        fileReader.readAsText(file2)
            
        axios
        .post("API URL", {
                title: file[0].name,
                content: fileReader.result,
        })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    return (
        <div>
            <p className='t'>▼</p>
            <label for="input-file" >{label}</label>
            <input type="file" id="input-file" accept='.txt' onChange={onFileChange} data-target={files} />
        </div>
    );
}

export default Input_File;
