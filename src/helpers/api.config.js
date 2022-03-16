import Cookie from "js-cookie";
import axios from "axios";

const API_URL = "http://mistho-assignment-api.herokuapp.com/api";

const headers = {
    'Content-Type': 'application/json',
};

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 60000, // 1 min.
    headers: headers,
});

axiosInstance.interceptors.request.use(
    function (request) {
        const token = Cookie.get("access_token");

        if (!!token) {
            request.headers.authorization = `Bearer ${token}`;
        }
        return request;
    });

export default axiosInstance;