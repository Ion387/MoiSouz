import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import s from "./SendButton.module.css";

const SendButton = (props) => {
  return (
    <button className={s.button}>
      <div className={s.inner}>
        <div className={s.icon}>
          <Icon iconName="SendDocumentIcon" />
        </div>
        <div className={s.text}>Добавить документ</div>
      </div>
    </button>
  );
};

export default SendButton;
