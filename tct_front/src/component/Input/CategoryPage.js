import React from 'react';
import '../../css/Second.css';
import Header from '../Home/Header';
import Footer from './Footer2';
import File from './Input_Cate';

function Category() {
    return (
        <div>
            <Header />
            <div className='second'>
                <div className='second-left'>
                    <div>
                        <h1>2. 주제 선택</h1>
                        <p>작성자가 의도한 대로 글이 작성되었는지 확인하기 위해서 주제를 입력해주세요.</p>
                        <p>내용과 주제의 유사도를 보여드립니다.</p>
                    </div>
                </div>
                <div className='second-right'>
                    <div>
                        <h1>주제 선택</h1>
                        <p>생각한 주제를 알려주세요. </p>
                        <File />
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default Category;