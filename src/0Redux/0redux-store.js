import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer.js";
import documentsReducer from "./documentsReducer.js";
import organizationReducer from "./organizationReducer.js";
import userFormsReducer from "./userFormsReducer.js";
import loadingReducer from "./loadingReducer.js";
import navReducer from "./navReducer.js";

let store = configureStore({
  reducer: {
    user: userReducer, //первое - название раздела в стэйте
    userForms: userFormsReducer,
    loading: loadingReducer,
    documents: documentsReducer,
    organization: organizationReducer,
    nav: navReducer,
  },
});

window.store = store;

export default store;
