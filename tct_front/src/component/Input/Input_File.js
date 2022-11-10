import React, { useState } from 'react';
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
    }

    const uploadMoudule = async (e) => {
        e.preventDefault();

        // formData 객체 생성 및 초기화
        const formData = new FormData();

        //파라메타 e의 정보 가져오기
        // form 에서 e.tartget은 리스트형태로 저장된다.
        // 따라서 e 리스트 중에 0번째에 저장됨.
        const upload_file = e.target[0].files[0]; //파일은 0번째가 실제 파일을 나타낸다.
        console.log(upload_file);

        // formData.append("Key", value)
        formData.append("content", upload_file);
        formData.append("category", '0') // 서버가 생성한 형식에 맞게 보내기 위해 거짓데이터 전송

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
    }

    return (
        <div>
            <form onSubmit={uploadMoudule}>
                <p className='t'>▼</p>
                <label htmlFor="input-file" >{label}</label>
                <input type="file" id="input-file" accept='.txt' onChange={onFileChange} data-target={files} />
                <input type="submit" value="보내기" />
            </form>
        </div>
    );
}

export default Input_File;