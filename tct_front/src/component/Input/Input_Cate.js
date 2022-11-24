import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

export function Input_Cate() {
    const [cates, setCate] = useState(null);

    const categorys = [
        { mains: "총류", 
            subs: ['신문/언론/저널리즘', '문헌정보학', '일반연속간행물','일반학회/단체/협회/기관']},

        { mains: "철학", 
            subs: ['철학','형이상학','심리학','윤리학']},

        { mains: "사회과학", 
        subs: ['사회과학','통계학','경제학','사회학/사회문제','정치학','행정학','법학','교육학','풍속/민속학','군방/군사학']},

        { mains: "순수과학", 
        subs: ['지학','광물학','물리학']},

        { mains: "기술과학", 
        subs: ['공학/공업일반']},

        { mains: "예술", 
        subs: ['예술', '문화','건축술','회화/도화','오락/운동','연극','음악']},

        { mains: "문학", 
        subs: ['문학','한국문학','영미문학']},

        { mains: "역사", 
        subs: ['역사','아시아']}
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
            result.push(<li id='List' value={sub} onClick={onChangeCate}>{sub}</li>);
        }
        return result
    }

    const onChangeCate = (e) => {
        setCate(e.target.innerText)
    }

    const navigate = useNavigate();
    const location = useLocation();

    const files = location.state.file;
    // console.log(files)

    const onPassDate = () => {
        if (cates !== null) {
            navigate('/TCT', {
                state: {
                    file: files,
                    cates: cates,
                    c: 2
                }
            })
        }
    }

    const noPassDate = () => {
        navigate('/TCT', {
            state: {
                file: files,
                cates: cates,
                c: 0
            }
        })
    }

    return(
        <div>
            <p className='t'>▼</p>
            <div id="Input-Cate">
                <Toggle />
            </div>

            <br/>
            <div className="tct-footer">
                <div className='left'>
                    <button className="footer_button" onClick={noPassDate}>PREV</button>
                </div>
                <div className='center'>2/5</div>
                <div className='right'>
                    <button className="footer_button" onClick={onPassDate}>NEXT</button>
                </div>
            </div>
        </div>
    );
}

export default Input_Cate;