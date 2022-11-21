import React from 'react';
import File from './Input_File';

function FileInputPage() {
    return (
        <div>
            <div className='tct'>
                <div className='tct-left'>
                    <div>
                        <h1>1. 내용 입력</h1>
                        <p>작성 중인 글을 입력하고 생각하고 <br/>있던 주제나 카테고리를 마음껏<br/>입력하세요.</p><br/>
                        <p>글에서 핵심 내용을 추출하고<br/>글의 흐름을 문장으로<br/>만들어드립니다.</p>
                    </div>
                </div>
                <div className='tct-right'>
                    <div>
                        <h1>글 내용 입력</h1>
                        <p>글을 입력하면 주제와 유사한지 확인합니다. </p><br/>
                        <File />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileInputPage;