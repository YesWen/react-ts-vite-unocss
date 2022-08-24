import React, { useEffect, useState } from "react";
import { getTagsList, deleteTags, getActivated, toggleActivated, getIsDelete, resetIsDelete } from "@/store/modules/tags";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { routerList } from "@/router";
import { setKeyPath, handleBreadcrumb } from "@/store/modules/breadcrumb";

const Tags: React.FC = () => {
    const location = useLocation();
    const tagsList = useAppSelector(getTagsList);
    const isDelete = useAppSelector(getIsDelete);
    const activated = useAppSelector(getActivated);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [deleteIndex, setDeleteIndex] = useState(0);
    // const handleBreadcrumb = (path) => {
    //     const p = path.split("/").slice(1);
    //     const getKeyPath = (arr, index) => {
    //         let item = "";
    //         for (let i = 0; i <= index; i++) {
    //             item = item + "/" + arr[i];
    //         }
    //         return item;
    //     };
    //     let keyPath = p.map((item, index) => {
    //         index == 0 ? (item = "/" + item) : (item = getKeyPath(p, index));
    //         return item;
    //     });
    //     dispatch(setKeyPath(keyPath));
    //     // let rootPath = "/" + path.split("/")[1];
    //     // const currentRouter = routerList.filter((item) => item.path == rootPath);
    //     // const getKeyPath = (routes, path) => {
    //     //     let path_list = [];
    //     //     const loop = (routes, path) => {
    //     //         for (let i = 0; i < routes.length; i++) {
    //     //             path_list.push(routes[i].path);
    //     //             if (routes[i].children) {
    //     //                 if (path == routes[i].path) {
    //     //                     break;
    //     //                 }
    //     //                 loop(routes[i].children, path);
    //     //             }
    //     //         }
    //     //         return path_list;
    //     //     };
    //     //     return loop(routes, path);
    //     // };
    //     // dispatch(setKeyPath(getKeyPath(currentRouter, path)));
    // };
    useEffect(() => {
        if (isDelete) {
            navigate("/");
            dispatch(resetIsDelete());
            dispatch(toggleActivated("/"));
        }
    }, [isDelete]);
    const handleClick = (e, item, index) => {
        e.stopPropagation();
        dispatch(toggleActivated(index));
        navigate(item.path);
        dispatch(handleBreadcrumb(item.path));
    };
    const deleteTag = (e, item, index) => {
        e.stopPropagation();
        setDeleteIndex(index);
        dispatch(deleteTags({ currnetPath: location.pathname, deletePath: tagsList[index].path, path: item.path, index }));
    };
    return (
        <div
            className="o-px-20px o-h-40px o-flex o-items-center o-bg-#fff"
            style={{
                boxShadow: "0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%)",
            }}
        >
            {tagsList.length > 0 &&
                tagsList.map((item, index) => (
                    <div
                        key={item.path}
                        onClick={(e) => handleClick(e, item, index)}
                        className={`o-bg-#42b983 o-pl-10px o-py-3px  o-text-13px o-flex o-items-center o-mr-10px o-cursor-pointer
                        ${item.path == activated ? "o-bg-#42b983 o-text-#fff" : "o-bg-#fff o-text-#333 o-border-1px o-border-#d8dce5 "}`}
                    >
                        {item.path == activated && <div className="o-w-10px o-h-10px o-bg-#fff o-rounded-50% o-mr-5px"></div>}
                        <span className="o-pr-5px">{item.label}</span>
                        <div className="o-hover:bg-#eee  o-w-20px o-h-20px o-rounded-50% ">
                            <CloseOutlined onClick={(e) => deleteTag(e, item, index)} size={15} />
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Tags;
