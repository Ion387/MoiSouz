import axios from "axios";

const KEY = "user.token";

const axiosInstance = axios.create({
  baseURL: "http://84.201.187.106:8080/",
  method: "POST",
});

/* const axiosInstanceFile = axios.create({
  baseURL: "http://84.201.187.106:8080/",
  method: "POST",
  headers: {
    "Content-Type": "multipart/form-data",
  },
}); */

export const getToken = () => localStorage.getItem(KEY);
export const setToken = (value) => localStorage.setItem(KEY, value);
export const clearToken = () => localStorage.removeItem(KEY);

export const fetch = async () => {
  if (getToken()) {
    axiosInstance.defaults.headers.Authorization = `Bearer ${getToken()}`;
  }
  return axiosInstance;
};

/* export const fetchFile = async () => {
  if (getToken()) {
    axiosInstanceFile.defaults.headers.Authorization = `Bearer ${getToken()}`;
    axiosInstanceFile.defaults.headers.ContentType = "multipart/form-data";
  }
  return axiosInstance;
}; */

/* 
const response = await (
            await fetch()
)({
   url: '/auth/login',
   method: 'GET',
   params: { email, pass, ... },
}); */
