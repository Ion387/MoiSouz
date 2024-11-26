/* import AuthPage from "0Pages/AuthPage/AuthPage"; */
import LoginPage from "0Pages/AuthPages/LoginPage/LoginPage";
import Registration from "0Pages/AuthPages/Registration/Registration";
import LandingPage from "0Pages/LandingPage/LandingPage";
import SiteContent from "0Pages/SiteContent/SiteContent";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

const AuthRouting = (props) => {
  const isUserLogged = useSelector((state) => state.user.isUserLogged);
  return (
    <>
      <Routes>
        {!isUserLogged && (
          <>
            <Route
              path="/*"
              element={
                <LandingPage registrationUserTC={props.registrationUserTC} />
              }
            />

            <Route
              path="/signin"
              element={
                <LoginPage
                  authUserTC={props.authUserTC}
                  getProfileUserTC={props.getProfileUserTC}
                />
              }
            />

            <Route
              path="/registration"
              element={
                <Registration registrationUserTC={props.registrationUserTC} />
              }
              registrationUserTC={props.registrationUserTC}
            />
          </>
        )}

        {isUserLogged && (
          <>
            <Route path="/*" element={<SiteContent />} />
          </>
        )}
      </Routes>
    </>
  );
};
export default AuthRouting;
