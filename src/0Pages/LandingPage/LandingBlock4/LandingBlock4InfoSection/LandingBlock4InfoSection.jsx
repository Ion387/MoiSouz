import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import s from "./LandingBlock4InfoSection.module.css";

const LandingBlock4InfoSection = (props) => {
  return (
    <div className={s.infoblock}>
      <div className={s.icon}>
        <Icon iconName={"LandingBlock4PlusIcon"} />
      </div>
      <div className={s.mainTextBlock}>
        <div className={s.titleTextblock}>{props.title}</div>
        <div className={s.textTextblock}>{props.text}</div>
      </div>

      <div className={s.rightTextBlock}>
        <div className={s.titleTextblock}>{props.rightTitle}</div>
        <div className={s.textTextblock}>{props.rightText}</div>
      </div>
    </div>
  );
};

export default LandingBlock4InfoSection;
