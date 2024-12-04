import { fetch } from "4API/AxiosApi";
import { endLoading, error, loading } from "./loadingReducer";
import { setPartnerNavAC, setWithRegNavAC } from "./navReducer";

/* export const changeROLESUserAC = (ROLE) => {
  return {
    type: "setLoggedUserAC",
    ROLE,
  };
}; */

export const setDataTUAC = (data) => {
  return {
    type: "setDataTUAC",
    data,
  };
};

const initialState = {
  data: {},
};

const tradeUnionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setDataTUAC":
      return {
        ...state,
        data: { ...action.data },
      };

    default:
      return state;
  }
};

export const getDataTUTC = (navigate) => {
  return async (dispatch) => {
    try {
      await dispatch(loading());
      let response = await (
        await fetch()
      )({
        url: "/api/private/tradeunion-owner",
        method: "GET",
      });
      if (response.status === 200) {
        // успешный запрос
        if (!response.data.firstName) {
          dispatch(setWithRegNavAC());
        } else {
          dispatch(setWithRegNavAC());
        }
        await dispatch(setDataTUAC(response.data));
        /*   navigate("/main"); */
        /*        await dispatch(endLoading());
        return response.data; */
        /*  dispatch(setProfileUserTC()); */
      }
    } catch {}
    await dispatch(endLoading());
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

export default tradeUnionReducer;
