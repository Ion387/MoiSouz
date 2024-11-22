import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileUserTC } from "0Redux/userReducer";
import { connect, useSelector } from "react-redux";

const CheckLogin = (props) => {
  const [checked, setChecked] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      await props.getProfileUserTC(navigate);
      setChecked(true);
    };
    load();
  }, []);
  if (user.isInited == false) return null;
  if (checked == false) return null;

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
