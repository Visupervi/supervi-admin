// axios 封装
// 根域名
// 超时时间
// 拦截器

import axios from "axios"
import { clearToken, getToken } from "./token";
import { clearUserInfo } from "@/store/modules/user";

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 50000
})
// Add a request interceptor
// 一般是添加请求参数
request.interceptors.request.use(config => {
  // Do something before request is sent
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
}, error => {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
// 响应返回客户端之前处理
request.interceptors.response.use(response => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, error => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  if (error.response.status === 401) {
    clearToken()
    window.location.reload()
  }
  return Promise.reject(error);
});
export { request }