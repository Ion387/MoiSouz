import Logo from "2Generics/Logo/Logo";
import s from "./LandingHeader.module.css";
import { Link } from "react-router-dom";
import Button from "3Entities/Forms/FormElements/Base/Button/Button";

const LandingHeader = (props) => {
  return (
    <div className={s.headerFlex}>
      <div className={s.logoBlock}>
        <Logo />
      </div>
      <div className={s.headerRightBlock}>
        <Link className={s.enter} to="/signin">
          <Button
            value="Войти"
            style={{
              width: "66px",
              height: "32px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          />
        </Link>
        <Link className={s.registration} to="/registration">
          Регистрация
        </Link>
      </div>
    </div>
  );
};

export default LandingHeader;
