import React, { lazy, useEffect } from "react";
import Index from "@/pages/index";
import Login from "@/pages/login";
import Test from "@/pages/Test";
import Sss from "@/pages/Test/sss";
import Ax from "@/pages/666/index";
import Trhee from "@/pages/666/trhee/index";
import Layout from "@/layout";
import { useRoutes, RouteObject, useLocation } from "react-router-dom";
import { routerBeforeEach } from "../permission";

const NotFound = lazy(() => import("@/pages/404"));

export interface RouterObj extends RouteObject {
    label?: string;
    isMenu?: boolean;
    children?: RouterObj[];
}

export const routerList: Array<RouterObj> = [
    {
        path: "/",
        element: <Layout />,
        label: "首页",
        isMenu: true,
        children: [
            {
                label: "首页",
                path: "/index",
                element: <Index />,
            },
        ],
    },
    {
        path: "/test",
        label: "测试啊",
        element: <Layout />,
        isMenu: true,
        children: [
            {
                path: "/test/index",
                label: "测试啊",
                element: <Test />,
            },
            {
                path: "/test/sss",
                label: "sss",
                element: <Sss />,
            },
        ],
    },
    {
        path: "/r",
        label: "五毒",
        element: <Layout />,
        isMenu: true,
        children: [
            {
                path: "/r/index",
                label: "五毒",
                element: <Test />,
            },
            {
                path: "/r/oo",
                label: "sss",
                element: <Sss />,
            },
        ],
    },
    {
        path: "/666",
        label: "多级导航",
        element: <Layout />,
        isMenu: true,
        children: [
            {
                path: "/666/index",
                label: "多级导航",
            },
            {
                path: "/666/two",
                label: "二级",
                isMenu: true,
                children: [
                    {
                        path: "/666/two/three",
                        label: "三级",
                        element: <Trhee />,
                        isMenu: true,
                        children: [
                            {
                                path: "/666/two/three/four",
                                label: "四级",
                                element: <Login />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
];

const RenderRouter: React.FC = () => {
    routerBeforeEach();
    return useRoutes(routerList);
};

export default RenderRouter;
