import React, { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { Navigate, RouteProps, useLocation } from "react-router";
import { createBrowserHistory } from "history";

const PrivateRoute: React.FC<RouteProps> = ({ children }) => {
    const history = createBrowserHistory();
    const logged = true;
    const navigate = useNavigate();

    return logged ? <div>{children}</div> : <Navigate to="/login" />;
};

export default PrivateRoute;
