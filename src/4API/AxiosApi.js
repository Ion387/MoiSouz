import axios from "axios";

const KEY = "user.token";

const axiosInstance = axios.create({
  baseURL: "http://84.201.187.106:8080/",
  method: "POST",
});

export const getToken = () => localStorage.getItem(KEY);
export const setToken = (value) => localStorage.setItem(KEY, value);
export const clearToken = () => localStorage.removeItem(KEY);

export const fetch = async () => {
  axiosInstance.defaults.headers.Authorization = `Bearer ${getToken()}`;
  axiosInstance.defaults.timeout = 5000;

  return axiosInstance;
};
