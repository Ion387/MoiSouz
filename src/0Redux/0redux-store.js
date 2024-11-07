import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer.js";
import documentsReducer from "./documentsReducer.js";
import organizationReducer from "./organizationReducer.js";

let store = configureStore({
  reducer: {
    user: userReducer, //первое - название раздела в стэйте
    documents: documentsReducer,
    organization: organizationReducer,
  },
});

window.store = store;

export default store;
