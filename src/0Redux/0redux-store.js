import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer.js";
import documentsReducer from "./documentsReducer.js";
import organizationReducer from "./organizationReducer.js";
import userFormsReducer from "./userFormsReducer.js";
import loadingReducer from "./loadingReducer.js";
import navReducer from "./navReducer.js";
import tradeUnionReducer from "./tradeUnionReducer.js";
import tradeUnionFormsReducer from "./tradeUnionFormsReducer.js";

let store = configureStore({
  reducer: {
    user: userReducer, //первое - название раздела в стэйте
    userForms: userFormsReducer,
    loading: loadingReducer,
    documents: documentsReducer,
    organization: organizationReducer,
    nav: navReducer,
    tradeUnion: tradeUnionReducer,
    tradeUnionForms: tradeUnionFormsReducer,
  },
});

window.store = store;

export default store;
