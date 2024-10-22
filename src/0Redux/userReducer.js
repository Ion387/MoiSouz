import { fetch, setToken } from "4API/AxiosApi";

const UserAC = 0;
const UserTC = 0;

export const userIsLoggedUserAC = () => {
  return {
    type: "userIsLogged",
  };
};

export const setUserDataUserAC = (username, email) => {
  return {
    type: "setUserData",
    username,
    email,
  };
};

const initialState = {
  isUserLogged: false,

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

    case "setUserData":
      return {
        ...state,
        username: action.username,
        email: action.email,
      };

    default:
      return state;
  }
};

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
      dispatch(setUserDataUserAC(response.data.username, response.data.email));
    }
  };
};

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
      navigate("/");
      dispatch(setProfileUserTC());
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

export default userReducer;
