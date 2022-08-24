import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { asyncSetTags } from "@/store/modules/tags";
import { handleBreadcrumb } from "@/store/modules/breadcrumb";
import { useAppDispatch } from "@/store/hooks";
import { routerList } from "@/router";

export const routerBeforeEach = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const rootPath = routerList.map((item) => item.path);
    const navigate = useNavigate();

    useEffect(() => {
        if (rootPath.includes(location.pathname)) {
            if (location.pathname === "/") {
                navigate(`/index`);
            } else {
                navigate(`${location.pathname}/index`);
            }
        }
        dispatch(asyncSetTags(location.pathname));
        dispatch(handleBreadcrumb(location.pathname));
    }, [location]);
};
