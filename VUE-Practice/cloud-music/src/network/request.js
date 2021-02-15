import axios from "axios";

export function request(config) {
    const instance = axios.create({
        baseURL: "https://api.mtnhao.com",
        timeout: 5000
    });

    //拦截请求
    instance.interceptors.request.use(
        config => {
            if (isLocalCacheEmpty(getStorageKEY(config))) {
                console.log(1111222);
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
            if (response.config.method === "get") {
                localStorage.setItem(
                    getStorageKEY(response.config),
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
        return Promise.resolve(JSON.parse(localStorage.getItem(getStorageKEY(config))));
    }

}

function getStorageKEY(config) {
    let params = ""
    if (config.params !== undefined && Object.keys(config.params).length > 0) {
        Object.keys(config.params).forEach(key => {
            params = params+"&"+key+"="+config.params[key]
        });
    }
    return config.url + params
}

function isLocalCacheEmpty(config) {
    let value = JSON.parse(localStorage.getItem(getStorageKEY(config)));
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
