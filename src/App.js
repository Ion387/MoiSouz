import { connect } from "react-redux";
import s from "./App.module.css";
import SiteContent from "./0Pages/SiteContent/SiteContent";
import { authUserTC, registrationUserTC } from "./0Redux/userReducer";
import AuthPage from "./0Pages/AuthPage/AuthPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "0Pages/LandingPage/LandingPage";

const App = (props) => {
  return (
    <BrowserRouter>
      <div className={s.main}>
        <div className={s.section}>
          <Routes>
            <Route
              path="/landing"
              element={
                <LandingPage registrationUserTC={props.registrationUserTC} />
              }
            />
            <Route
              path="/*"
              element={
                props.isUserLogged ? (
                  <SiteContent />
                ) : (
                  <AuthPage
                    authUserTC={props.authUserTC}
                    registrationUserTC={props.registrationUserTC}
                  />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    isUserLogged: state.user.isUserLogged,
  };
};

export default connect(mapStateToProps, { authUserTC, registrationUserTC })(
  App
);
