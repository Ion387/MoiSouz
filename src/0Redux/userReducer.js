import { clearToken, fetch, fetchFile, setToken } from "4API/AxiosApi";
import { current } from "@reduxjs/toolkit";

export const error = (message) => {
  return {
    type: "error",
    data: message,
  };
};

export const userIsLoggedUserAC = () => {
  return {
    type: "userIsLogged",
  };
};

export const onFormFilled = () => {
  return {
    type: "onFormFilled",
  };
};

export const setDataUserAC = (data) => {
  return {
    type: "setDataUserAC",
    data,
  };
};

export const loading = () => {
  return {
    type: "loading",
  };
};

export const endLoading = () => {
  return {
    type: "endLoading",
  };
};

export const InitUserAC = () => {
  return {
    type: "InitUserAC",
  };
};

export const logoutUserAC = () => {
  return {
    type: "logoutUserAC",
  };
};

const initialState = {
  isUserLogged: false,
  /*   временная переменная */
  isUserFormFilled: false,
  isLoading: false,
  isInited: false,
  error: null, // null | string
  data: {
    id: null,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "error":
      return {
        ...state,
        error: action.data,
      };

    case "userIsLogged":
      return {
        ...state,
        isUserLogged: true,
      };

    case "onFormFilled":
      return {
        ...state,
        isUserFormFilled: true,
      };

    case "setDataUserAC":
      return {
        ...state,
        data: { ...action.data },
      };

    case "loading":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "endLoading":
      return {
        ...state,
        isLoading: false,
      };
    case "InitUserAC":
      return {
        ...state,
        isInited: true,
      };
    case "logoutUserAC":
      clearToken();
      return {
        ...state,
        isUserLogged: false,
        data: { id: null },
      };
    default:
      return state;
  }
};

export const authUserTC = (email, password, navigate) => {
  return async (dispatch) => {
    await dispatch(loading());
    try {
      let response = await (
        await fetch()
      )({
        url: "/api/login_check",
        method: "POST",
        data: { email: email, password: password },
      });
      if (response.status == 200 && response.data && response.data.token) {
        // успешный запрос
        setToken(response.data.token);
        await dispatch(userIsLoggedUserAC());
        await dispatch(getProfileUserTC(navigate));
        //navigate("/main");
        /*  dispatch(setProfileUserTC()); */
        return true;
      } else {
        await dispatch(error(response.data.message));
      }
    } catch ({ response }) {
      await dispatch(error(response?.data?.message || "Ошибка"));
    }
    await dispatch(endLoading());
    return false;
  };
};

export const getProfileUserTC = (navigate) => {
  return async (dispatch) => {
    try {
      await dispatch(loading());
      await dispatch(InitUserAC());
      let response = await (
        await fetch()
      )({
        url: "/api/private/profile",
        method: "GET",
      });
      if (response.status == 200) {
        // успешный запрос
        await dispatch(userIsLoggedUserAC());
        await dispatch(setDataUserAC(response.data));
        //navigate("/main");
        await dispatch(endLoading());
        return response.data;
        /*  dispatch(setProfileUserTC()); */
      }
    } catch {}
    await dispatch(endLoading());
    await dispatch(logoutUserAC());
    switch (window.location.pathname) {
      case "/":
      case "/signin":
      case "/registration":
        break;

      default:
        navigate("/");
        break;
    }
    return null;
  };
};

export const registrationUserTC = (
  email,
  password,
  passwordRepeat,
  navigate,
) => {
  return async (dispatch) => {
    await dispatch(loading());
    try {
      let response = await (
        await fetch()
      )({
        url: "/api/registration",
        method: "POST",
        data: {
          email: email,
          password: password,
          passwordRepeat: passwordRepeat,
        },
      });
      if (response.status == 200) {
        if (response.data.status == "error") {
          await dispatch(error(response.data.description));
        } else {
          // успешный запрос
          setToken(response.data.token);
          await dispatch(authUserTC(email, password, navigate));
        }
      } else {
        await dispatch(error(response.data.message));
      }
    } catch ({ response }) {
      await dispatch(error(response?.data?.message || "Ошибка"));
    }
    await dispatch(endLoading());
  };
};

export const onProfileInfoFormTC = (data, navigate) => {
  return async (dispatch) => {
    await dispatch(loading());
    try {
      let response = await (
        await fetch()
      )({
        url: "/api/private/profile",
        method: "POST",
        data,
      });
      if (response.status == 200) {
        // успешный запрос
        await dispatch(onFormFilled());
        //navigate("/main");
      }
    } catch {}
    await dispatch(endLoading());
  };
};

export const postAvatarUserTC = (file) => {
  return async (dispatch) => {
    await dispatch(loading());
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      if (typeof file != "object") return;

      let response = await (
        await fetch()
      )({
        url: "/api/private/avatar",
        method: "POST",
        data: formData,
      });
      if (response.status == 200) {
        // успешный запрос
      }
    } catch {}
    await dispatch(endLoading());
  };
};

export default userReducer;
