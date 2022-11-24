import React from 'react';
import Spinner from '../assets/spinner.gif'

// import '../css/Loading.css'

function Loading() {
    return (
        <div>
            <p>로딩 중</p>
             <img src={Spinner} alt="로딩중" width="5%" />
        </div>
    );
}

export default Loading;