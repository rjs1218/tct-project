import React from 'react';
import './Second.css';
import Header from '../Header';
import Footer from './Footer';

function Second() {
    return (
        <div>
            <Header />
            <h1>1. 내용 입력</h1>
            <p>작성 중인 글을 입력하고 생각하고 있던 주제나 카테고리를 마음껏 입력하세요.</p>
            <p>글에서 핵심 내용을 추출하고 글의 흐름을 문장으로 만들어드립니다.</p>

            <h4>글 내용 입력</h4>
            <p>글을 입력하면 주제와 유사한지 확인해드립니다.</p>
            <p>▼</p>
            <input />
            <Footer />
        </div>
    );
}

export default Second;