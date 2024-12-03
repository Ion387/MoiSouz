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

/* export const setRegSlugUserAC = (slug) => {
  return {
    type: "setRegSlugUserAC",
    slug,
  };
}; */

const initialState = {
  isUserLogged: false,
  isUserNowRegistered: false,
  /*   временная переменная */
  isUserFormFilled: false,
  isInited: false,
  typeOfRegistration: null,
  data: {
    id: null,

    /* 


firstName(pin):"Владимир"
lastName(pin):"Кормушкин"
middleName(pin):"Ярославович"
profession(профессия):["Бухгалтер"]
position(должность):["Главный бухгалтер"]

    ROLES:["ROLE_USER"]
    hobbies:["Плавание"]
    address:{area(pin):"Нижегородская обл."


city(pin):"Нижний Новгород"
flat(pin):"34"
house(pin):"20"
postcode(pin):"123456"
region(pin):"Нижегородская обл."
street(pin):"Крупской"}

avatar(pin):"/media/avatars/20241127081307-653f8ac7-f958-4149-8456-dcf6f8147de5.png"
birthdate(pin):"27.11.2024"
children(pin):
education(pin):"Высшее"
email(pin):"ion06@bk.ru"

gender(pin):"male"
guid(pin):"653f8ac7-f958-4149-8456-dcf6f8147de5"
hasTradeunionProfile(pin):false
hasUserProfile(pin):true
id(pin):93
isActive(pin):true

name(pin):"Кормушкин В.Я."
phone(pin):"1123123123"
phoneDop(pin):"1231231233"
    */
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
    /*     case "setRegSlugUserAC":
      return {
        ...state,
        slug: action.slug,
      }; */
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

export const confirmEmailUserTC = (slug, navigate) => {
  return async (dispatch) => {
    await dispatch(loading());
    try {
      let response = await (
        await fetch()
      )({
        url: `/api/confirm/email/${slug}`,
        method: "POST",
      });
      if (response.status === 200 && response.data && response.data.token) {
        // успешный запрос
        navigate("/signin");
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

export default userReducer;
