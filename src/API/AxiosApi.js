import axios from 'axios';

const KEY = 'user.token';

const axiosInstance = axios.create({
  baseURL: "http://84.201.187.106:8080/",
  method: 'POST',
});

export const getToken = () => localStorage.getItem(KEY);
export const setToken = (value) => localStorage.setItem(KEY, value);
export const clearToken = () => localStorage.removeItem(KEY);

// for auto reset axios if session lost
export const fetch = async () => {
  // set current token to axios
  axiosInstance.defaults.headers.Authorization = `Bearer ${getToken()}`;
  axiosInstance.defaults.timeout = 5000;





  /*
  // check have access by current token
  const {
    data: { error },
  } = await axiosInstance({ url: 'permission' });

  if (error == 10) {
    try {
      // reauth for get new token access
      const {
        data: { token },
      } = await axiosInstance({ url: 'auth' });
      setToken(token);

      // set new token to axios
      axiosInstance.defaults.headers.Authorization = `JWT ${getToken()}`;
    } catch {}
  }
  */

  return axiosInstance;
};