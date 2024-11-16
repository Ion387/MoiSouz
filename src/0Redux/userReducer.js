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
  id: null,
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
        ...action.data,
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
        navigate("/main");
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
  navigate
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
  const currentPayload = {
    secondName: "Кормушкин",
    firstName: "Владимир",
    lastName: "Ярославович",
    birthdate: "1984.09.04",
    gender: "male",
    education: "высшее",
    profession: ["программист"],
    position: ["программист"],
    address: {
      postcode: "123456",
      region: "Нижегородская обл.",
      area: "Нижегородская обл.",
      city: "Нижний Новгород",
      street: "Крупской",
      house: "20",
      flat: "34",
    },
    phone: "+79108768990",
    phoneDop: "+79108768990",
    children: [
      {
        childrenName: "Владислав",
        childrenGender: "male",
        childrenBirthdate: "2016.02.04",
      },
    ],
    hobbies: ["ролики"],
    /* 
  const currentPayload = {
    secondName: data.secondName,
    firstName: data.firstName,
    lastName: data.lastName,
    birthdate: data.birthdate,
    gender: data.gender,
    education: data.education,
    profession: [data.profession],
    position: [data.position],
    address: {
      postcode: data.postcode,
      region: data.region,
      area: data.area,
      city: data.city,
      street: data.street,
      house: data.house,
      flat: data.flat,
    },
    phone: data.phone,
    phoneDop: data.phoneDop,
    children: [
      {
        childrenName: data.childrenName,
        childrenGender: data.childrenGender,
        childrenBirthdate: data.childrenBirthdate,
      },
    ],
    hobbies: data.hobbies.map((i) => i && i), */
  };
  return async (dispatch) => {
    try {
      let response = await (
        await fetch()
      )({
        url: "/api/private/profile",
        method: "POST",
        data: currentPayload,
      });
      if (response.status == 200) {
        // успешный запрос
        dispatch(onFormFilled());
        navigate("/main");
      }
    } catch {}
  };
};

export const postAvatarUserTC = (datas) => {
  console.log("start post avatar");
  return async (dispatch) => {
    try {
      let response = await (
        await fetch()
      )({
        url: "/api/private/avatar",
        method: "POST",
        data: datas,
      });
      console.log(response);
      if (response.status == 200) {
        // успешный запрос

        console.log("avatar post");
        console.log(response);
      }
    } catch {}
  };
};

export default userReducer;
