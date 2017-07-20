/**
 * Created by wuxiaoran on 2017/7/20.
 */

import axios from 'axios';

export const api = axios.create({
  baseURL: "/api",
  timeout:1000,
});

//添加一个响应拦截器
api.interceptors.response.use(function(res){
  //在这里对返回的数据进行处理
  return res.data;
},function(err){
  return Promise.reject(err);
});


