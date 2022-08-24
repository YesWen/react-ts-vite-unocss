import React from "react";

import type { PaginationProps } from "antd";
import { Pagination } from "antd";

const Ax: React.FC = () => {
    const onChange: PaginationProps["onChange"] = (pageNumber) => {
        console.log("Page: ", pageNumber);
    };
    return <div>1</div>;
    return <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />;
};

export default Ax;
