import { clearToken, fetch, fetchFile, setToken } from "4API/AxiosApi";
import { current } from "@reduxjs/toolkit";

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
  data: {
    id: null,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
      return {
        ...state,
        isUserLogged: false,
      };
    default:
      return state;
  }
};

export const authUserTC = (email, password, navigate) => {
  return async (dispatch) => {
    try {
      let response = await (
        await fetch()
      )({
        url: "/api/login_check",
        method: "POST",
        data: { email: email, password: password },
      });
      if (response.status == 200) {
        // успешный запрос
        setToken(response.data.token);
        dispatch(userIsLoggedUserAC());
        navigate("/main");
        /*  dispatch(setProfileUserTC()); */
      }
    } catch {}
  };
};

export const getProfileUserTC = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      dispatch(InitUserAC());
      let response = await (
        await fetch()
      )({
        url: "/api/private/profile",
        method: "GET",
      });
      if (response.status == 200) {
        // успешный запрос
        dispatch(userIsLoggedUserAC());
        dispatch(setDataUserAC(response.data));
        //navigate("/main");
        dispatch(endLoading());
        return;
        /*  dispatch(setProfileUserTC()); */
      }
    } catch {}
    clearToken();
    dispatch(endLoading());
    navigate("/");
  };
};

export const registrationUserTC = (
  email,
  password,
  passwordRepeat,
  navigate,
) => {
  return async (dispatch) => {
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
        // успешный запрос

        setToken(response.data.token);
        dispatch(authUserTC(email, password, navigate));
      }
    } catch {}
  };
};

export const onProfileInfoFormTC = (data, navigate) => {
  console.log(data);
  return async (dispatch) => {
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
        dispatch(onFormFilled());
        //navigate("/main");
      }
    } catch {}
  };
};

export const postAvatarUserTC = (file) => {
  return async (dispatch) => {
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
  };
};

export default userReducer;
