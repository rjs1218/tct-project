import React, { useRef, useEffect } from "react";

import MagicGridEngine from "magic-grid";

function MagicGridPage(props) {
    const MagicGrid = ({ children, ...props }) => {
        const container = useRef();
        const timeout = useRef();
        const grid = useRef();
      
        const onResize = () => {
          if (!timeout.current) timeout.current = setTimeout(handleReposition, 200);
        };
      
        const handleReposition = () => {
          grid.current && grid.current.positionItems();
          clearTimeout(timeout.current);
          timeout.current = null;
        };
      
        useEffect(() => {
          if (!grid.current) {
            grid.current = new MagicGridEngine({
              container: container.current,
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
      
        return <div ref={container}>{children}</div>;
      };
      
      const Card = ({ name }) => {
        return <div id="Card">{name}</div>;
      };

    return (
        <div id="container">
            <div id="container">
                <MagicGrid static gutter={12}>
                    <Card name="&nbsp;" />
                    <Card name="&nbsp;" />
                    <Card name="&nbsp;" />
                    <Card name="&nbsp;" />
                </MagicGrid>
            </div>
        </div>
    );
}

export default MagicGridPage;