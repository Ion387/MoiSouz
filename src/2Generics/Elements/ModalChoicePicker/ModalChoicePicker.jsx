import s from "./ModalChoicePicker.module.css";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import Button from "2Generics/Elements/Button/Button";

const ModalChoicePicker = (props) => {
  const choiceList = props.lableArray.map((el, index) => (
    <div
      className={s.choiceItem}
      key={el.value}
      onClick={() => {
        if (
          props.choice?.some((elChoice) => elChoice.value == el.value) == false
        ) {
          props.setChoice((prevState) => [...prevState, el]);
        } else {
          props.setChoice((prevState) =>
            prevState.filter((f) => f.value != el.value),
          );
        }
      }}
    >
      <div className={s.choiceIndicator}>
        {props.choice?.some((elChoice) => elChoice.value == el.value) ? (
          <Icon iconName="choicePickerIcon" />
        ) : (
          <Icon iconName="choiceNotPickerIcon" />
        )}
      </div>

      {el.label}
    </div>
  ));
  const submitHandler = (e) => {
    e.stopPropagation();
    props.submit(props.choice.filter((el) => el));
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
          onClick={(e) => {
            e.stopPropagation();
            props.cancel();
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
