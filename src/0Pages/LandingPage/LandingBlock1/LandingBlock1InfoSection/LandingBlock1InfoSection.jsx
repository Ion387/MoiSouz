import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import s from "./LandingBlock1InfoSection.module.css";

const LandingBlock1InfoSection = (props) => {
  return (
    <div className={s.infoblock}>
      <div className={s.icon}>
        <Icon iconName={props.iconName} />
      </div>
      <div className={s.textBlockInfoblock}>
        <div className={s.titleInfoblock}>{props.title}</div>
        <div className={s.textInfoblock}>{props.text}</div>
      </div>
    </div>
  );
};

export default LandingBlock1InfoSection;
