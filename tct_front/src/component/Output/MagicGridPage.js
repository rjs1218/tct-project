import React, { useRef, useEffect } from "react";

import MagicGridEngine from "magic-grid";

function MagicGridPage() {
    const MagicGrid = ({ children, ...props }) => {
        const container = useRef();
        const timeout = useRef();
        const grid = useRef();
      
        // 1000 = 1초
        const onResize = () => {
          if (!timeout.current) timeout.current = setTimeout(handleReposition, 200);
        };
      
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
      
          return () => {
            clearTimeout(timeout.current);
            window.removeEventListener("resize", onResize);
            grid.current = null;
          };
        });
        
        useEffect(() => {
          handleReposition();
        });

        //container
        return <div ref={container}>{children}</div>;
      };

      let ran = "#" + Math.floor(Math.random() * 1000000)

      let colors = ["rgb(255,205,0)", "blue", "red", "rgb(255, 255, 0)", "#123456", ran]

      //Card
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
            <div id="container">
                <MagicGrid static gutter={12}>
                    <Card />
                </MagicGrid>
            </div>
        </div>
    );
}

export default MagicGridPage;