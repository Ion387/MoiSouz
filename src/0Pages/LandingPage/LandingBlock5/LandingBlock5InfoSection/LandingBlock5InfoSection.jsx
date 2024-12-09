import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import s from "./LandingBlock5InfoSection.module.css";

const LandingBlock5InfoSection = (props) => {
  return (
    <div className={s.infoblock}>
      <div
        className={s.leftTextBlock}
        dangerouslySetInnerHTML={{ __html: props.leftText }}
      ></div>

      <div className={s.rightTextBlock}>{props.rightText}</div>
    </div>
  );
};

export default LandingBlock5InfoSection;
