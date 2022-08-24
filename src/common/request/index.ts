import Axios, { AxiosInstance } from "axios";
import { notification } from "antd";
import { map } from "@/api";
import { getToken, removeToken, removeRoles, removeName, removeAvatar } from "@/utils/auth";

const axios = Axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + "",
    timeout: 1000,
    headers: { "Content-Type": "application/json" },
});
export const api = new Proxy(map, {
    get: function (target, name: string) {
        return request(target[name]);
    },
});
const request = (ins) => {
    if (!ins) throw new Error("错误调用: " + name);
    let { url, type } = ins;
    return async (data, options = {}) => {
        return new Promise((resolve, reject) => {
            axios({ url: url, method: type, data: data, ...options }).then((res) => {
                resolve(res);
            });
        });
    };
};

axios.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use(
    (response) => {
        const data = response.data;
        if (response.status === 200) {
            return data;
        }

        notification.error({
            message: `请求错误 ${response.statusText}: ${response}`,
            description: data || response.statusText || "Error",
        });

        if (response.status === 401) {
            removeToken();
            removeRoles();
            removeName();
            removeAvatar();
            window.location.href = "/login";
        }

        return Promise.reject(new Error(response.statusText || "Error"));
    },
    (error) => {
        console.log("err:", error, error.response); // for debug
        let msg = "请求错误";
        if (error.response && error.response.status) {
            switch (error.response.status) {
                case 401:
                    removeToken();
                    removeRoles();
                    removeName();
                    removeAvatar();
                    window.location.href = "/login";
                    break;
                case 403:
                    removeToken();
                    removeRoles();
                    removeName();
                    removeAvatar();
                    window.location.href = "/login";
                    break;
                case 404:
                    notification.error({
                        message: `请求不存在`,
                        description: error.response.data?.msg || "Error",
                    });
                    break;
                case 406:
                    notification.error({
                        message: `请求参数有误`,
                        description: error.response.data?.msg || "Error",
                    });
                    break;
                default:
                    notification.error({
                        message: `请求错误`,
                        description: error.response.data?.msg || "Error",
                    });
            }
        }
        return Promise.reject(error);
    }
);

// export default axios;
