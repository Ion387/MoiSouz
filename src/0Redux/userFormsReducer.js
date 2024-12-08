import { fetch } from "4API/AxiosApi";
import { endLoading, loading } from "./loadingReducer";
import { getProfileUserTC } from "./userReducer";

export const error = (message) => {
  return {
    type: "error",
    data: message,
  };
};

export const choseTypeOfRegistrationUserAC = (typeOfRegistration) => {
  return {
    type: "choseTypeOfRegistrationUserAC",
    typeOfRegistration: false,
  };
};

export const onFormFilledUserAC = () => {
  return {
    type: "onFormFilled",
  };
};

const initialState = {
  /*   временная переменная */
  isUserFormFilled: false,
};

const userFormsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "onFormFilled":
      return {
        ...state,
        isUserFormFilled: true,
      };

    default:
      return state;
  }
};

export const submitUserAnketFormTC = (data, navigate) => {
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
      if (response.status === 200) {
        // успешный запрос
        await dispatch(onFormFilledUserAC());
        await dispatch(getProfileUserTC());
        navigate("/entry");
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
      if (response.status === 200) {
        // успешный запрос
      }
    } catch {}
    await dispatch(endLoading());
  };
};

export default userFormsReducer;
