import React from "react";
import { useNavigate } from "react-router";

const Test: React.FC = () => {
    const navigate = useNavigate();
    const toPage = () => {
        navigate("/test/sss");
    };
    return <div className="o-cursor-pointer" onClick={toPage}>我是test1</div>;
};

export default Test;
