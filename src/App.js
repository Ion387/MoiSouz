import { connect } from "react-redux";
import s from "./App.module.css";
import {
  authUserTC,
  getProfileUserTC,
  registrationUserTC,
} from "./0Redux/userReducer";
import { BrowserRouter } from "react-router-dom";
import AuthRouting from "6Routing/AuthRouting";
import CheckLogin from "0Pages/AuthPages/CheckLogin/CheckLogin";

const App = (props) => {
  return (
    <BrowserRouter>
      <CheckLogin>
        <div className={s.main}>
          <div className={s.section}>
            <AuthRouting
              isUserLogged={props.isUserLogged}
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
  return {
    isUserLogged: state.user.isUserLogged,
  };
};

export default connect(mapStateToProps, {
  authUserTC,
  registrationUserTC,
  getProfileUserTC,
})(App);
