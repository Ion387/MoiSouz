import { connect } from "react-redux";
import s from "./App.module.css";
import SiteContent from "./0Pages/SiteContent/SiteContent";
import LoginPage from "./0Pages/AuthPages/AuthPage";
import { authThunkUserTC } from "./0Redux/userReducer";

const App = (props) => {
  return (
    <div className={s.main}>
      {props.isUserLogged ? (
        <SiteContent />
      ) : (
        <LoginPage authThunkUserTC={props.authThunkUserTC} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isUserLogged: state.user.isUserLogged,
  };
};

export default connect(mapStateToProps, { authThunkUserTC })(App);
