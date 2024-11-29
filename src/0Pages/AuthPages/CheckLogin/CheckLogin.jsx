import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfileUserTC } from "0Redux/userReducer";
import { useDispatch, useSelector } from "react-redux";

const CheckLogin = (props) => {
  const [checked, setChecked] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const load = async () => {
      await dispatch(getProfileUserTC(navigate));
      setChecked(true);
    };
    load();
  }, []);
  if (user.isInited == false) return null;
  if (checked == false) return null;

  return props.children;
};

export default CheckLogin;
