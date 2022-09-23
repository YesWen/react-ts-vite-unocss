import React, { useState } from "react";
import { Alert, Button } from "antd";
import "./index.scss";

const Sss: React.FC = () => {
    const [showMessage, setShowMessage] = useState(false);
    return (
        <>
            <div>
                <button onClick={() => setShowMessage(true)}>召唤boss</button>
            </div>
        </>
    );
};

export default Sss;
