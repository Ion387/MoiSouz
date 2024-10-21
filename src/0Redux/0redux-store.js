import { configureStore } from "@reduxjs/toolkit";
import { compose } from "redux";
import userReducer from "./userReducer.js";
import documentsReducer from "./documentsReducer.js";
import organizationReducer from "./organizationReducer.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = configureStore({
  reducer: {
    user: userReducer, //первое - название раздела в стэйте
    documents: documentsReducer,
    organization: organizationReducer,
  },
});

window.store = store;

export default store;
