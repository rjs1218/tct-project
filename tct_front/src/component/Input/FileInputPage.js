import React from 'react';
import File from './Input_File';

import "../../css/MG.css";
import '../../css/TCT.css';
import '../../css/Footer.css';

import Header from '../Home/Header';

function FileInputPage() {
    return (
        <div>
            <Header />
            <div className='second'>
                <div className='second-left'>
                    <div>
                        <h1>1. 내용 입력</h1>
                        <pre><p>작성 중인 글을 입력하고 생각하고 <br/>있던 주제나 카테고리를 마음껏<br/>입력하세요.</p></pre>
                        <p>글에서 핵심 내용을 추출하고<br/>글의 흐름을 문장으로<br/>만들어드립니다.</p>
                    </div>
                </div>
                <div className='second-right'>
                    <div>
                        <h1>글 내용 입력</h1>
                        <p>글을 입력하면 주제와 유사한지 확인합니다. </p>
                        <File />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileInputPage;