import Calendar from "react-calendar";
import s from "./ModalChoicePicker.module.css";
import dayjs from "dayjs";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import Button from "2Generics/FormElements/Button/Button";

const ModalChoicePicker = (props) => {
  const choiceList = props.lableArray.map((i, index) => (
    <div
      className={s.choiceItem}
      key={i}
      onClick={() => {
        if (!props.choice[index]) {
          props.setChoice((prevState) => {
            const newState = [...prevState];
            newState[index] = i;
            return newState;
          });
        } else {
          props.setChoice((prevState) => {
            const newState = [...prevState];
            newState[index] = null;
            return newState;
          });
        }
      }}
    >
      <div className={s.choiceIndicator}>
        {props.choice[index] ? (
          <Icon iconName="choicePickerIcon" />
        ) : (
          <Icon iconName="choiceNotPickerIcon" />
        )}
      </div>

      {i}
    </div>
  ));
  const submitHandler = () => {
    props.submit(props.choice);
  };
  return (
    <div className={s.modalChoicePicker}>
      <div className={s.choiceList}>{choiceList}</div>
      <div className={s.buttonGrid}>
        <Button
          value={"Отмена"}
          type={"button"}
          style={{
            width: "95px",
            height: "39px",
            border: "1px solid rgb(131, 131, 131)",
            backgroundColor: "white",
            color: "rgb(117, 117, 117)",
            fontSize: "14px",
          }}
          onClick={() => {
            props.cancel(false);
          }}
        />
        <Button
          value={"Выбрать"}
          type={"button"}
          style={{ width: "162px", height: "39px", fontSize: "14px" }}
          onClick={submitHandler}
        />
      </div>
    </div>
  );
};

export default ModalChoicePicker;
