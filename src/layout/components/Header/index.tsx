import React, { useState } from "react";
import { Layout, Breadcrumb } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, MenuProps } from "antd";

// import avatar from "/public/vite.svg";

export interface HeaderProps {
    collapsed: boolean;
    breadcrumbItem: Array<string>;
    setCollapsed: (value?: boolean) => void;
}

const changeDropdown: MenuProps["onClick"] = ({ key }) => {
    console.log(key);
};

const Header: React.FC<HeaderProps> = (props) => {
    const menu = (
        <Menu
            onClick={changeDropdown}
            items={[
                { key: "1", label: "个人中心" },
                { key: "2", label: "退出登录" },
            ]}
        />
    );

    const [visible, setVisible] = useState(false);

    return (
        <Layout.Header className="o-flex o-items-center o-justify-between" style={{ paddingLeft: "20px" }}>
            <div className="o-flex  o-items-center">
                {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: "trigger",
                    onClick: () => props.setCollapsed(!props.collapsed),
                })}
                <div className="o-pl-20px ">
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        {props.breadcrumbItem.map((item) => (
                            <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                </div>
            </div>
            <div className="o-flex  o-items-center ">
                <Dropdown overlay={menu} placement="bottomRight" arrow={true} visible={visible}>
                    <div
                        className="o-flex  o-items-center o-cursor-pointer o-relative"
                        style={{ height: "50px" }}
                        onClick={() => setVisible(!visible)}
                    >
                        <span className="o-mr-20px">userName</span>
                        <Avatar
                            style={{ backgroundColor: "#40c9c6" }}
                            shape="circle"
                            src={"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"}
                            size={40}
                            icon={<UserOutlined />}
                        />
                        <div className="o-absolute o-bottom--20px o-right--20px">
                            <CaretDownOutlined />
                        </div>
                    </div>
                </Dropdown>
            </div>
        </Layout.Header>
    );
};

export default Header;
