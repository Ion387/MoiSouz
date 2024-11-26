import { connect } from "react-redux";
import s from "./App.module.css";
import React from "react";
import {
  authUserTC,
  getProfileUserTC,
  registrationUserTC,
} from "./0Redux/userReducer";
import { BrowserRouter /* Route, Routes */ } from "react-router-dom";
import AuthRouting from "6Routing/AuthRouting";
import CheckLogin from "0Pages/AuthPages/CheckLogin/CheckLogin";
/* import DevElement from "Dev/DevElement"; */

const App = (props) => {
  return (
    <BrowserRouter>
      {/*       <Routes>
        <Route path="/dev" element={<DevElement />} />
      </Routes> */}
      <CheckLogin>
        <div className={s.main}>
          <div className={s.section}>
            <AuthRouting
              authUserTC={props.authUserTC}
              getProfileUserTC={props.getProfileUserTC}
              registrationUserTC={props.registrationUserTC}
            />
          </div>
        </div>
      </CheckLogin>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  authUserTC,
  registrationUserTC,
  getProfileUserTC,
})(App);
