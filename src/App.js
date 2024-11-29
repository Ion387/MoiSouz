import s from "./App.module.css";
import React from "react";
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

export default App;
