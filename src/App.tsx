import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import RenderRouter from "./router";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <RenderRouter />
        </BrowserRouter>
    );
};

export default App;
