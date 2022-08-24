import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Alert, Button } from "antd";
import "./index.scss";

const Sss: React.FC = () => {
    const [showMessage, setShowMessage] = useState(false);
    return (
        <>
            <CSSTransition in={showMessage} timeout={2000} classNames={'boss-text'}>
                <div>boss级人物：铠爹</div>
            </CSSTransition>
            <div>
                <button onClick={() => setShowMessage(true)}>召唤boss</button>
            </div>
        </>
    );
};

export default Sss;
