import React from 'react';
import { useNavigate } from "react-router-dom";

import '../../css/Home.css';
import Header from './Header';
import Footer from './Footer';

function Home() {
    const navigate = useNavigate();

    const onPassDate = () => {
        navigate('/TCT', {
            state: {
                c: 0
            }
        })
    }
    
    return (
        <div className='home'>
            <Header />
            <div className='home_container'>
                <h1><button className='home_title'>TCT</button></h1>
                <h2>T<span>opic</span> C<span>olor</span> T<span>heme</span></h2>
                <p className='home_start_p'>당신의 글은 생각한 대로 작성되고 있나요?</p>

                <button className='home_start' onClick={onPassDate}>START</button>
            </div>

            <div>
                <h3>프로젝트 소개</h3>
                {/* <img className='home_image_project' src="" alt="" /> */}
                <p className='home_image_project'> </p>
                <h4>TCT</h4>
                <div className='home_project_information'>
                    <p className='home_text'>프로젝트 소개 내용</p>
                </div>
            </div>
            
            <div>
            <h3>팀 소개</h3>

                <div className='home_team_information'>
                    <div className='home_image_team'> </div>
                    <div className='home_text_left'>
                        <h5>CONNECT</h5>
                        <p className='home_text'>팀 소개 내용</p>
                    </div>
                </div>
                <div className='home_team_information'>
                    <div className='home_image_team'> </div>
                    <div className='home_text_left'>
                        <h5>CONNECT</h5>
                        <p className='home_text'>팀 소개 내용</p>
                    </div>
                </div>
                <div className='home_team_information'>
                    <div className='home_image_team'> </div>
                    <div className='home_text_left'>
                        <h5>CONNECT</h5>
                        <p className='home_text'>팀 소개 내용</p>
                    </div>
                </div>
            </div>

            <div>
                <h3>그 외</h3>
                <div className='home_project_information'>
                    <p className='home_text'>기타로 소개할 내용</p>
                </div>
            </div>
            <hr></hr>
            <Footer />
        </div>
    );
}

export default Home;