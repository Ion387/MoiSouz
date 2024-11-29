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
          <div className={s.bigCircleBlock}>
            <Icon iconName="LandingBlock2CentralCicleIcon" />
            <div className={s.iconInnerBlock}>
              <div className={s.iconInnerBlockLogo}>
                <Logo
                  moi={{ fontSize: "50px", fontWeight: "800", color: "#fff" }}
                  souz={{ fontSize: "50px", fontWeight: "800" }}
                />
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
              <div className={s.textAroundPosition}>
                <TextAroundBlock />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingBlock2;
