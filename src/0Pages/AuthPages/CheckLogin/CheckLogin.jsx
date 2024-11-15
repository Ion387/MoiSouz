import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getProfileUserTC } from "0Redux/userReducer";
import { connect, useSelector } from "react-redux";

const CheckLogin = (props) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    props.getProfileUserTC(navigate);
  }, []);
  if (user.isInited == false) return null;
  if (user.isLoading) return null;

  return props.children;
};

const mapStateToProps = (state) => {
  return {
    isUserLogged: state.user.isUserLogged,
  };
};

export default connect(mapStateToProps, {
  getProfileUserTC,
})(CheckLogin);
