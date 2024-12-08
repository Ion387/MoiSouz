import Logo from "2Generics/Logo/Logo";
import s from "./LandingTitle.module.css";
import { Link } from "react-router-dom";
import Button from "3Entities/Forms/FormElements/Base/Button/Button";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";

const LandingTitle = (props) => {
  return (
    <div className={s.main}>
      <div className={s.logoBlock}>
        <Logo
          style={{
            fontSize: "154px",
            fontWeight: "800",
          }}
        />
      </div>
      <div className={s.textBlock}>
        комплексное сервисное решение для автоматизации <br />
        деятельности профсоюзов
      </div>
      <Link className={s.enter} to="/registration">
        <Button
          value="       Попробовать бесплатно"
          style={{
            width: "274px",
            height: "54px",
            fontSize: "16px",
            fontWeight: "600",
            borderRadius: "17px",
          }}
        />
        <div className={s.likeIcon}>
          <Icon iconName="landingLikeIcon" />
        </div>
      </Link>
    </div>
  );
};

export default LandingTitle;
