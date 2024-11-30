import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import s from "./StepsBlock.module.css";

const StepsBlock = (props) => {
  return (
    <div className={s.main}>
      <div className={s.stepRectangle}>
        <div className={s.stepText}>{props.step}</div>
      </div>
      <div className={s.textBlock}>
        <div className={s.title}> {props.title}</div>
        <div className={s.text}> {props.text}</div>
      </div>
    </div>
  );
};

export default StepsBlock;
