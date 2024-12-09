import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import s from "./LandingBlock2.module.css";
import Logo from "2Generics/Logo/Logo";
import TextAroundBlock from "./TextAroundBlock/TextAroundBlock";
import { Link } from "react-router-dom";
import Button from "3Entities/Forms/FormElements/Base/Button/Button";

const LandingBlock2 = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.title}>ВОЗМОЖНОСТИ СЕРВИСА</div>
        <div className={s.centerBlock}>
          <div className={s.bigIcon}>
            <div className={s.bigIconScale}>
              <Icon iconName="LandingBlock2CentralCicleIcon" />
            </div>
          </div>
          <div className={s.iconInnerBlock}>
            <div className={s.iconInnerBlockLogo}>
              <Logo style={{ fontSize: "50px" }} white />
            </div>
            <div className={s.iconInnerBlockText}>
              модульность решения позволяет
              <br /> подключать необходимые блоки
              <br /> в любой момент времени
            </div>
            <Link to="/registration" className={s.iconInnerBlockButton}>
              <Button
                value="Начать пользоваться"
                style={{
                  backgroundColor: "#fff",
                  color: "black",
                  width: "226px",
                  fontSize: "16px",
                }}
              />
            </Link>
          </div>
          <div className={s.textAroundPosition}>
            <TextAroundBlock />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingBlock2;
