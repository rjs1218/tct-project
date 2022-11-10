import React, { useState } from 'react';
import axios from 'axios';

export function Input_Cate() {
    const [cates, setCate] = useState(null);
    
    let categorys = [
        { mains: "총류", 
            subs: ['신문, 잡지', '방송통신', '문헌정보학', '도서관학 및 정보과학', '일반연속간행물', '일반학회, 단체, 협회, 기관', '일반학회, 단체, 연구조사기관', '총류일반', '기타', '통상', '물류등기타']},

        { mains: "사회과학", 
            subs: ['사회과학', '통계학', '국가통계', '경제학', '산업금융', '재정·금융', '금융', '공적연금','건강보험',  '산업·중소기업일반', '산업진흥·고도화', '세제', '사회학',  '기초생활보장', '고용노동', '보육·가족및여성',  '노인·청소년', '안전관리', '사회복지일반', '취약계층지원', '보건의료', '식품의약안전', '정치학', '국정운영', '외교', '국정홍보', '무역및투자유치', '기획재정', '행정학', '일반행정', '병무행정', '지방행정·재정지원', '법학', '국민권익·인권', '법제', '공정거래', '법무및검찰', '경찰', '교육학', '유아및초·중등교육', '고등교육', '교육일반', '평생·직업교육', '풍속, 민속학', '풍속,예절,민속학', '보훈', '국방', '통일']}
    ]

    const Toggle = () => {
        const result = []
        
        for (const main of categorys) {
            result.push(<details className='toggle'>
                            <summary>{main.mains}</summary>
                            {SubList(main)}
                        </details>);
        }
        return result
    }

    const SubList = (main) => {
        const result = []

        for (const sub of main.subs){
            result.push(<li id='List' value={sub} onClick={onOpenToggle}>{sub}</li>);
        }
        return result
    }

    const onOpenToggle = (e) => {
        const cate = e.target.innerText
        setCate(cate)
        console.log(cate)
    }

    const uploadMoudule = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        const upload_cate = cates;
        console.log(upload_cate)

        formData.append("category", upload_cate)

        const URL = "http://127.0.0.1:8000/tct/post/"

        axios({
            method: "put", // 전송 요청
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

    return(
        <div>
            <form onSubmit={uploadMoudule}>
                <p className='t'>▼</p>
                <div id="Input-Cate">
                    <Toggle />
                <input type="submit" value="보내기" />
                </div>
            </form>
        </div>
    );
}

export default Input_Cate;