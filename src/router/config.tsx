import React from "react";
import { RouteProps } from "react-router-dom";

interface ProviderRouterProps extends RouteProps {
    auth?: boolean;
}

const R: React.FC<ProviderRouterProps> = ({ children }) => {
    console.log(children, "---------------children");
    return <>{children}</>;
};

export default R;
