import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from '../Home/Header';

import MagicGridEngine from "magic-grid";

function MagicGridPage() {
    const MagicGrid = ({ children, ...props }) => {
      // useRef를 사용하여 children 을 제어 및 생성
      // 즉, children 에 해당하는 객체를 매직 그리드처럼 제어한다.
        const container = useRef();
        const timeout = useRef();
        const grid = useRef();
      
        // 초기화 시간 조정
        // 초기값 200
        // 1000 = 1초
        const onResize = () => {
          if (!timeout.current) timeout.current = setTimeout(handleReposition, 200);
        };
      
        //재배치 (초기화 선언)
        const handleReposition = () => {
          grid.current && grid.current.positionItems();
          clearTimeout(timeout.current);
          timeout.current = null;
        };
      
        // 매직 그리드 제어
        useEffect(() => {
          if (!grid.current) {
            grid.current = new MagicGridEngine({
              container: container.current,
              items: 20,
              animate: true,
              center: true,
              static:true,
              ...props
            });
            window.addEventListener("resize", onResize);
          }
          handleReposition();
      
          // 초기화
          return () => {
            clearTimeout(timeout.current);
            window.removeEventListener("resize", onResize);
            grid.current = null;
          };
        });
        
        // 객체 생성 및 초기화
        useEffect(() => {
          handleReposition();
        });

        //container
        // 위 선언을 걸쳐서 매직 그리드 엘리먼트 생성
        return <div ref={container}>{children}</div>;
      };

      let ran = "#" + Math.floor(Math.random() * 1000000)

      let colors = ["rgb(255,205,0)", "blue", "red", "rgb(255, 255, 0)", "#123456", ran]

      //Card
      // 선언한 card 엘리먼트 전부 태그 값으로 출력하는 곳
      const Card = () => {
        const result = []
        for (const color of colors) {
          // (max - min) + min
          let ranH = Math.floor(Math.random() * (120 - 70) + 70)
          
          result.push(<div id="Card" style={{backgroundColor: color, height: ranH}}></div>);
        }
        return result
      };

    return (
        <div id="container">
            <Header />
            <div id="container">
                <MagicGrid static gutter={12}> {/*엘리먼트 간격*/}
                    {/*children*/}
                    <Card />
                </MagicGrid>
            </div>
            <div className="MG-footer">
            <div className='left'>
              <Link to='/Secon'><button className="footer_button">PREV</button></Link>
            </div>
            <div className='center'>5/5</div>
            <div className='right'>
              <Link to='/'><button className="footer_button">HOME</button></Link>
            </div>
            </div>
        </div>
    );
}

export default MagicGridPage;