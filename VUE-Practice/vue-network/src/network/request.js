import axios from "axios";

export function request(config) {
    const instance = axios.create({
        baseURL: "https://api.mtnhao.com",
        timeout: 5000
    });

    //拦截请求
    instance.interceptors.request.use(
        config => {
            // console.log(config);
            if (isLocalCacheEmpty(config)) {
                return config;
            }
        },
        err => {
            return err;
        }
    );

    //拦截response
    instance.interceptors.response.use(
        response => {
            // console.log(response);
            if (response.config.method === "get") {
                localStorage.setItem(
                    response.config.url,
                    JSON.stringify(response.data)
                );
            }
            return response.data;
        },
        err => {
            return err;
        }
    );

    if (isLocalCacheEmpty(config)) {
        return instance(config);
    } else {
        return Promise.resolve(JSON.parse(localStorage.getItem(config.url)));
    }
}

function isLocalCacheEmpty(config) {
    let value = JSON.parse(localStorage.getItem(config.url));
    if (
        (Array.isArray(value) && value.length === 0) ||
        value === null ||
        value.length === 0 ||
        value === ""
    ) {
        return true;
    } else {
        return false;
    }
}
