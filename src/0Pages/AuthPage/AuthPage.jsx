import s from "./AuthPage.module.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import Registration from "./Registration/Registration";

const AuthPage = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <Routes>
          <Route
            path="/"
            element={<LoginPage authUserTC={props.authUserTC} />}
          />
          <Route
            path="/registration"
            element={
              <Registration registrationUserTC={props.registrationUserTC} />
            }

            /*  registrationUserTC={props.registrationUserTC}  */
          />
        </Routes>
      </div>
    </div>
  );
};

export default AuthPage;
