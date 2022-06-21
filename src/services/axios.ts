// @ts-nocheck

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { CONFIG_APP } from "../common/constants";
import { loadFromStorage as loadStorage } from "../common/utils";


const instance: AxiosRequestConfig = {
  baseURL: CONFIG_APP.API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const noAuthInstace: AxiosInstance = axios.create(instance);

const authInstace: AxiosInstance = axios.create(instance);

authInstace.interceptors.request.use(
    config => {
      const dataUser = loadStorage('User');
      config.headers.Authorization = `Bearer ${dataUser?.access_token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

authInstace.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorResponse = (error || {}).response || {};
    if (errorResponse.status === 403) {
      window.location.href = "/forbidden";
    }

    return Promise.reject(error);
  }
);

export const postAuth = async(url, data, params, headers) => {
  console.log('data', data);
  const response = await authInstace.request({
    url,
    method: "POST",
    data,
    params,
    headers,
  });
  return response.data
};

export const getAuth = async(url, params, headers) => {
  const response = await authInstace.request({
    url,
    method: "GET",
    params,
    headers,
  });
  return response.data
};

export const putAuth = async (url, data, params, headers) => {
  const response = await authInstace.request({
    url,
    method: "PUT",
    params,
    data,
    headers,
  });
  return response.data
};

export const deleteAuth = (url, params, headers) => {
  return authInstace.request({
    url,
    method: "DELETE",
    params,
    headers,
  });
};

export default {
  authInstace,
  noAuthInstace,
  postAuth,
  getAuth,
  putAuth,
  deleteAuth,
};
