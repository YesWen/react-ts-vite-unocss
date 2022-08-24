import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { getUserInfo, userAsync, setUserInfo } from "@/store/modules/user";

import { api } from "@/common/request";

const Index: React.FC<{}> = () => {
    const user_info = useAppSelector(getUserInfo);
    const dispatch = useAppDispatch();
    const [incrementAmount, setIncrementAmount] = useState(1);
    const incrementValue = Number(incrementAmount) || 0;

    const test = async () => {
        let res = await api.bannerList({ type: "1" });
    };

    useEffect(() => {
        test();
    }, []);

    return (
        <div className="o-p-30px">
            {/* <div className="o-flex o-bg-#fff o-w-100px">
                <div style={{ wordBreak: "break-word" }}>
                    <span>¥&nbsp;</span>
                    <span>25067896789678</span>
                    <span>预估到手价</span>
                    <span>限购</span>
                </div>
            </div> */}

            <hr />
            <div className="o-flex o-pb-20px"></div>
            <hr />
            <p>
                {user_info.name}-{user_info.desc}
            </p>
            <div className="o-mt-20px"></div>
            <button className="o-mr-20px" onClick={() => dispatch(setUserInfo({ name: "oo", desc: "123" }))}>
                同步
            </button>
            <button onClick={() => dispatch(userAsync({ name: "ooo", desc: "cao" }))}>异步</button>
        </div>
    );
};

export default Index;
