import React from 'react';
import File from './Input_Cate';

function Category() {
    return (
        <div>
            <div className='tct'>
                <div className='tct-left'>
                    <div>
                        <h1>2. 주제 선택</h1>
                        <p>작성자가 의도한 대로<br/>작성되었는지 확인하기 위해서<br/>주제를 입력해주세요.</p><br/>
                        <p>내용과 주제의 유사도를<br/>보여드립니다.</p>
                    </div>
                </div>
                <div className='tct-right'>
                    <div>
                        <h1>주제 선택</h1>
                        <p>생각한 주제를 알려주세요. </p><br/>
                        <File />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;