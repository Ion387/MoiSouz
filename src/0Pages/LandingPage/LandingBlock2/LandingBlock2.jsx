import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import s from "./LandingBlock2.module.css";
import Logo from "2Generics/Logo/Logo";
import TextAroundBlock from "./TextAroundBlock/TextAroundBlock";

const LandingBlock2 = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.title}>ВОЗМОЖНОСТИ СЕРВИСА</div>
        <div className={s.centerBlock}>
          <div className={s.bigCircle}>
            <Icon iconName="LandingBlock2CentralCicleIcon" />
          </div>
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
            <div className={s.textAroundPosition}>
              <TextAroundBlock />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingBlock2;
