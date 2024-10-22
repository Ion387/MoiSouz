import { connect } from "react-redux";
import s from "./App.module.css";
import SiteContent from "./0Pages/SiteContent/SiteContent";
import { authUserTC, registrationUserTC } from "./0Redux/userReducer";
import AuthPage from "./0Pages/AuthPages/AuthPage";

const App = (props) => {
  return (
    <div className={s.main}>
      {props.isUserLogged ? (
        <SiteContent />
      ) : (
        <AuthPage
          authUserTC={props.authUserTC}
          registrationUserTC={props.registrationUserTC}
        />
      )}
    </div>
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
