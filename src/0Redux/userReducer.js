import { fetch, setToken } from "API/AxiosApi";

const UserAC = 0;
const UserTC = 0;

export const userIsLogedUserAC = () => {
  return {
    type: "userIsLogged",
  };
};

export const setUserDataUserAC = (userLogin, email) => {
  return {
    type: "setUserData",
    userLogin,
    email,
  };
};

const initialState = {
  isUserLogged: false,

  userLogin: "login",
  userId: null,
  userEmail: 0,
  active: true,
  email: "user@admin.com",
  firstName: null,
  hashsha1: null,
  id: 2,
  lastName: "12345A",
  roles: ["ROLE_USER"],
  secondName: null,
  updatedAt: "2024-10-15T17:50:35+00:00",
  userIdentifier: "user@admin.com",
  username: "user@admin.com",
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
        userLogin: action.userLogin,
        email: action.email,
      };

    default:
      return state;
  }
};

export const setProfile = async () => {
  const response = await (
    await fetch()
  )({
    url: "/api/profile",
    method: "POST",
  });
  if (response.status == 200) {
    // успешный запрос
    console.log(response.data);
  }
};

export const authThunkUserTC = (email, password) => {
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
      console.log(response.data);
      dispatch(userIsLogedUserAC());
      setProfile();
    }
  };
};

/* export const auth = async (email,password) => {
    try {
        const response = await (
            await fetch()
        )({
            url: '/api/login_check',
            method: 'POST',
            data: {email:email, password:password},
           headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"} 
        });
            if (response.status == 200) {
                // успешный запрос
                setToken(response.data.token/* response.data );
               setProfile() 
            } // else ошибка запроса
    } catch {
        // ошибка запроса
        return;
    }
}; */

export default userReducer;
