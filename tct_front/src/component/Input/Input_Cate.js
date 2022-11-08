import React from 'react';

export function Input_Cate() {
    // key :value 이루어진 JSON 파일로 받아온다.
    // 따라서, value 값만 받아서 리스트로 만들던지, 키 값으로 값을 받아오던지 해야하고
    // Next 버튼을 누르면, 값이 전달되게 해야한다.
    const array = ["경제/경영", "인문", "문학", "과학/수학", "정치/사회", "교육", "역사", "예술/문화", "보건", "총류"]

    const onChecked = (e) =>{
        console.log(e.target.value)
    }

    const cate = array.map((arrays) => 
        (<label id="cate">
            <input type="radio" name="category" value={arrays} onClick={onChecked}/>
                {arrays}
            </label>))

    return(
        <div>
            <p className='t'>▼</p>
            <div id="Input-Cate">
                {cate}
            </div>
        </div>
    );
}

export default Input_Cate;
