import axios from "axios";

const KEY = "user.token";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_PATH}:8080/`,
  method: "POST",
});

export const getToken = () => localStorage.getItem(KEY);
export const setToken = (value) => localStorage.setItem(KEY, value);
export const clearToken = () => localStorage.removeItem(KEY);
export const hasToken = () => {
  const token = getToken();
  return token != null && token != "undefined";
};

export const fetch = async () => {
  axiosInstance.defaults.headers.Authorization = hasToken()
    ? `Bearer ${getToken()}`
    : null;
  return axiosInstance;
};
