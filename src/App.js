import { connect } from "react-redux";
import s from "./App.module.css";
import { authUserTC, registrationUserTC } from "./0Redux/userReducer";
import { BrowserRouter } from "react-router-dom";
import AuthRouting from "6Routing/AuthRouting";
import { clearToken } from "4API/AxiosApi";
import { useEffect } from "react";

const App = (props) => {
  return (
    <BrowserRouter>
      <div className={s.main}>
        <div className={s.section}>
          <AuthRouting
            isUserLogged={props.isUserLogged}
            authUserTC={props.authUserTC}
            registrationUserTC={props.registrationUserTC}
          />
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
