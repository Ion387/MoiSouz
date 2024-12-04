import s from "./EmailConfirm.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { confirmEmailUserTC } from "0Redux/userReducer";
import Button from "3Entities/Forms/FormElements/Base/Button/Button";

const EmailConfirm = () => {
  const params = useParams();
  const slug = params.slug;
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(confirmEmailUserTC(slug));
    }, 1000);
  }, []);
  return (
    <div className={s.main}>
      <div className={s.loginBlock}>
        <div className={s.title}>
          Поздравляем, <br />
          Вы зарегистрированы <br />в сервисе МойСоюз!
        </div>
        <div className={s.buttonBlock}>
          <Link to="/signin">
            <Button
              value={"Войти в личный кабинет"}
              style={{ width: "250px" }}
              type={"button"}
            />
          </Link>
          <div className={s.bottomButton}>
            <Link to="/">
              <Button
                value={"Перейти на стартовую страницу"}
                white
                style={{ width: "250px" }}
                type={"button"}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirm;
