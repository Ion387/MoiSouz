import { clearToken, fetch, setToken } from "4API/AxiosApi";
import { endLoading, error, loading } from "./loadingReducer";
import { setPartnerNavAC, setWithRegNavAC } from "./navReducer";

/* export const changeROLESUserAC = (ROLE) => {
  return {
    type: "setLoggedUserAC",
    ROLE,
  };
}; */

export const setLoggedUserAC = () => {
  return {
    type: "setLoggedUserAC",
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

export const setDataUserAC = (data) => {
  return {
    type: "setDataUserAC",
    data,
  };
};

export const choseTypeOfRegistrationUserAC = (typeOfRegistration) => {
  return {
    type: "choseTypeOfRegistrationUserAC",
    typeOfRegistration,
  };
};

const initialState = {
  isUserLogged: false,
  isUserNowRegistered: false,
  /*   временная переменная */
  isUserFormFilled: false,
  isInited: false,
  typeOfRegistration: null,
  data: {
    id: null,
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setLoggedUserAC":
      return {
        ...state,
        isUserLogged: true,
      };

    case "logoutUserAC":
      clearToken();
      return {
        ...state,
        isUserLogged: false,
        data: { id: null },
      };

    case "choseTypeOfRegistrationUserAC":
      console.log(action.typeOfRegistration);
      return {
        ...state,
        typeOfRegistration: action.typeOfRegistration,
      };

    case "setDataUserAC":
      return {
        ...state,
        data: { ...action.data },
      };
    case "InitUserAC":
      return {
        ...state,
        isInited: true,
      };

    default:
      return state;
  }
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
      if (response.status === 200) {
        // успешный запрос
        if (!response.data.firstName) {
          dispatch(setWithRegNavAC());
        } else {
          dispatch(setWithRegNavAC());
        }
        await dispatch(setLoggedUserAC());
        await dispatch(setDataUserAC(response.data));
        /*   navigate("/main"); */

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
      if (response.status === 200 && response.data && response.data.token) {
        // успешный запрос
        setToken(response.data.token);
        await dispatch(setLoggedUserAC());
        await dispatch(getProfileUserTC(navigate));
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
      if (response.status === 200) {
        if (response.data.status === "error") {
          await dispatch(error(response.data.description));
        } else {
          // успешный запрос
          setToken(response.data.token);
          /* await dispatch(authUserTC(email, password, navigate)); */
          navigate("/signin");
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

export default userReducer;
