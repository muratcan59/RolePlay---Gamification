import axios from "axios";
import Cookies from "universal-cookie";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 60000,
});

service.interceptors.request.use(
  config => {
    const cookies = new Cookies();
    const headerKeys = cookies.get("RT");

    if (headerKeys) {
      config.headers["Authorization"] = headerKeys;
      return config;
    }
    
    window.location.href = process.env.REACT_APP_API_WEBFORM + "/uyelik/react.user.aspx?source=" + window.location.href;

    return Promise.reject("Authorization");
  },
  err => Promise.reject(err)
);

service.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err)
);

export default service;