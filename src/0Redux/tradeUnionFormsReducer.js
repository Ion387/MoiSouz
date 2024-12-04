import { fetch } from "4API/AxiosApi";
import { endLoading, loading } from "./loadingReducer";
import { getProfileUserTC } from "./userReducer";
import { getDataTUTC } from "./tradeUnionReducer";

export const error = (message) => {
  return {
    type: "error",
    data: message,
  };
};

export const onFormFilledUTAC = () => {
  return {
    type: "onFormFilled",
  };
};

const initialState = {
  /*   временная переменная */
  isUserFormFilled: false,
};

const tradeUnionFormsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "onFormFilled":
      return {
        ...state,
        isTUFormFilled: true,
      };

    default:
      return state;
  }
};

export const submitCreateTUFormTC = (data, navigate) => {
  return async (dispatch) => {
    await dispatch(loading());
    try {
      let response = await (
        await fetch()
      )({
        url: "/api/private/tradeunion-owner",
        method: "POST",
        data,
      });
      if (response.status === 200) {
        // успешный запрос
        await dispatch(onFormFilledUTAC());
        await dispatch(getDataTUTC());
        navigate("/entry");
      }
    } catch {}
    await dispatch(endLoading());
  };
};

export const postLogoTUFormTC = (file) => {
  return async (dispatch) => {
    await dispatch(loading());
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      if (typeof file != "object") return;

      let response = await (
        await fetch()
      )({
        url: "/api/private/tradeunion-logo",
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

export default tradeUnionFormsReducer;
