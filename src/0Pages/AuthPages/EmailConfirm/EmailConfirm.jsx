import s from "./EmailConfirm.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { confirmEmailUserTC } from "0Redux/userReducer";

const EmailConfirm = () => {
  const params = useParams();
  const slug = params.slug;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      dispatch(confirmEmailUserTC(slug, navigate));
    }, 1000);
  }, []);
  return (
    <div className={s.main}>
      <div className={s.loginBlock}>
        <div className={s.title}>
          Почта подтвеждена.
          <br />
          Спасибо за регистрацию!
        </div>
      </div>
    </div>
  );
};

export default EmailConfirm;
