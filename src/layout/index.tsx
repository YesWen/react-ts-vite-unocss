import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import type { MenuProps } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { routerList, RouterObj } from "../router";
import { getCurrentLabel } from "@/store/modules/tags";
import { setKeyPath, getKeyPath } from "@/store/modules/breadcrumb";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import Header from "./components/Header";
import Tags from "./components/tags";

const { Sider, Content } = Layout;

const handleMenuList = (route: Array<RouterObj>, rootRouter: Array<string>): MenuProps["items"] => {
    const res = [];
    route.forEach((item, index) => {
        if (item.isMenu) {
            res.push({ key: item.path, label: item.label, icon: React.createElement(UserOutlined) });
            if (item.children) {
                const isRootPath = rootRouter.includes(item.path);
                //顶层路由导航栏需要children 子导航不需要children
                let itemChildren = isRootPath ? item.children.slice(1) : item.children;
                if (handleMenuList(itemChildren, rootRouter).length > 0) {
                    res[index].children = handleMenuList(itemChildren, rootRouter);
                }
            }
        }
    });
    return res;
};

const handleBreadcrumb = (routes: Array<RouterObj>, keyPath: Array<string>): Array<string> => {
    let labels = [];
    const loop = (routes: Array<RouterObj>, keyPath: Array<string>) => {
        routes.forEach((item) => {
            for (let j of keyPath) {
                if (j == "/index") j = "/";
                if (item.path == j) {
                    labels.push(item.label);
                    if (item.children) {
                        loop(item.children, keyPath);
                    }
                }
            }
        });
    };
    loop(routes, keyPath);
    return labels;
};

const getMenu = (path) => {
    const p = path.split("/").slice(1);
    const getKeyPath = (arr, index) => {
        let item = "";
        for (let i = 0; i <= index; i++) {
            item = item + "/" + arr[i];
        }
        return item;
    };
    let keyPath = p.map((item, index) => {
        index == 0 ? (item = "/" + item) : (item = getKeyPath(p, index));
        return item;
    });
    if (path == "/index") {
        return ["/"];
    }

    return keyPath;
};

const App: React.FC = () => {
    const rootRouter = routerList.map((item) => item.path);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentLabel = useAppSelector(getCurrentLabel);
    const [collapsed, setCollapsed] = useState(false);
    const [breadcrumbItem, setBreadcrumbItem] = useState([currentLabel]);
    const keyPath = useAppSelector(getKeyPath);
    const location = useLocation();
    const [defaultMenuKey, setDefaultMenuKey] = useState(getMenu(location.pathname));
    const [getOpenKeys, setOpenkeys] = useState(["/"]);
    useEffect(() => {
        setOpenkeys(getMenu(location.pathname));
    }, []);

    useEffect(() => {
        setBreadcrumbItem(handleBreadcrumb(routerList, keyPath));
    }, [keyPath]);

    const handleMenu = ({ keyPath, key }) => {
        dispatch(setKeyPath(keyPath));
        navigate(key);
    };

    const routers = handleMenuList(routerList, rootRouter);
    const menuItemList = useMemo(() => handleMenuList(routerList, rootRouter), [routers]);

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo o-w-full o-h-60px o-flex o-justify-center o-items-center">
                    <div className=" o-w-80% o-h-60% o-bg-#4d5c6a flex-center o-text-#fff">Oo</div>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={defaultMenuKey}
                    items={menuItemList}
                    onClick={handleMenu}
                    openKeys={getOpenKeys}
                    onOpenChange={(openKeys) => {
                        setOpenkeys(openKeys);
                    }}
                />
            </Sider>
            <Layout className="site-layout">
                <Header collapsed={collapsed} breadcrumbItem={breadcrumbItem} setCollapsed={setCollapsed}></Header>
                <Tags />
                <div className="site-layout-background">
                    <Content className="o-p-20px o-h-93vh">
                        <div className="o-w-full o-h-full o-bg-#fff o-p-20px">
                            <Outlet />
                        </div>
                    </Content>
                </div>
            </Layout>
        </Layout>
    );
};

export default App;
