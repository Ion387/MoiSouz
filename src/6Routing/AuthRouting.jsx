/* import AuthPage from "0Pages/AuthPage/AuthPage"; */
import EmailConfirm from "0Pages/AuthPages/EmailConfirm/EmailConfirm";
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
            <Route path="/*" element={<LandingPage />} />

            <Route path="/signin" element={<LoginPage />} />

            <Route path="/registration" element={<Registration />} />
            <Route path="/confirm/email/:slug" element={<EmailConfirm />} />
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
