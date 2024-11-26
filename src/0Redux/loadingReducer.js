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

export const error = (message) => {
  return {
    type: "error",
    data: message,
  };
};

const initialState = {
  isLoading: null,
  error: null,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "endLoading":
      return {
        ...state,
        isLoading: false,
      };

    case "error":
      return {
        ...state,
        error: action.data,
      };

    default:
      return state;
  }
};

export default loadingReducer;
