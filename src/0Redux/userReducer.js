import { fetch, setToken } from "4API/AxiosApi";
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
    type: "setUserData",
    data,
  };
};

const initialState = {
  isUserLogged: false,
  /*   временная переменная */
  isUserFormFilled: false,
  userId: null,
  userEmail: 0,
  active: true,
  email: "",
  firstName: null,
  hashsha1: null,
  id: null,
  lastName: "",
  roles: ["ROLE_USER"],
  secondName: null,
  updatedAt: "2024-10-15T17:50:35+00:00",
  userIdentifier: "user@admin.com",
  username: "",
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
        secondName: action.data.secondName,
        firstName: action.data.firstName,
        lastName: action.data.lastName,
        birthdate: action.data.birthdate,
        education: action.data.education,
        profession: action.data.profession,
        position: action.data.position,
        postcode: action.data.postcode,
        region: action.data.region,
        area: action.data.area,
        city: action.data.city,
        street: action.data.street,
        house: action.data.house,
        flat: action.data.flat,
        phone: action.data.phone,
        phoneDop: action.data.phoneDop,
        children: action.data.children,
        /* children:[
        {
            "name": "Вероника",
            "gender": "female",
            "birthdate": "2010-05-12"
        },
        {
            "name": "Андрей",
            "gender": "male",
            "birthdate": "2015-11-06"
}] */

        hobbies: action.hobbies,
      };

    default:
      return state;
  }
};
/* Пример Thunk
export const setProfileUserTC = () => {
  return async (dispatch) => {
    let response = await (
      await fetch()
    )({
      url: "/api/profile",
      method: "POST",
    });
    if (response.status == 200) {
      // успешный запрос
      dispatch(setDataUserAC(response.data));
    }
  };
}; */

export const authUserTC = (email, password, navigate) => {
  return async (dispatch) => {
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
  };
};

export const registrationUserTC = (
  email,
  password,
  passwordRepeat,
  lastName,
  firstName,
  secondName,
  navigate
) => {
  return async (dispatch) => {
    let response = await (
      await fetch()
    )({
      url: "/api/registration",
      method: "POST",
      data: {
        email: email,
        password: password,
        passwordRepeat: passwordRepeat,
        lastName: lastName,
        firstName: firstName,
        secondName: secondName,
      },
    });
    if (response.status == 200) {
      // успешный запрос
      setToken(response.data.token);
      dispatch(authUserTC(email, password, navigate));
    }
  };
};

export const onProfileInfoFormTC = (data, navigate) => {
  console.log("Thunk start");
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
    hobbies: data.hobbies,
  };
  return async (dispatch) => {
    let response = await (
      await fetch()
    )({
      url: "/api/private/profile",
      method: "POST",
      data: currentPayload,
    });
    if (response.status == 200) {
      // успешный запрос
      console.log("Good response ");
      dispatch(onFormFilled());
      navigate("/main");
    }
  };
};

export default userReducer;
