import axios from 'axios';
import { message } from 'antd';
import authUtil from './authUtil';

const BASE_URL = process.env.REACT_APP_REPORT_BACKEND_FE_BASE_UR;
const PORT = process.env.REACT_APP_REPORT_BACKEND_FE_PORT;

const ACCESS_TOKEN = localStorage.getItem("access_token");
const BEARER_TOKEN = 'Bearer '.concat(ACCESS_TOKEN);


// --------------------------EXPENSE-API --------------------------

const geomanagementApi = axios.create({
    // baseURL: `http://${BASE_URL}${PORT}/expense/v1`
    baseURL: `/geomanagement/v1/`

});

geomanagementApi.interceptors.request.use(config => {
    // config.headers["Authorization"] = BEARER_TOKEN;
    // config.headers["user_name"] = authUtil.parseJwt(ACCESS_TOKEN).user_name;
    // config.headers["ip"] = "123";
    return config
});

geomanagementApi.interceptors.response.use(response => {
    return response;
}, error => {
    handleError(error);
    return Promise.reject(error);
});


const handleError = (error) => {
    if (error.response) {
        if (error.response.status === 401) {
            authUtil.logout();
        } else if (error.response.status === 503) {
            // message.error("503 - Service Unavailable", 2);
            // authUtil.redirectToPreLocation();
        }
        //TODO: Handle Other statuses. . .
    } else {

        message.error(error.message, 60);
    }
}


export {
    geomanagementApi
};