import s from "./ColorFlag.module.css";

const ColorFlag = (props) => {
  return (
    <button
      className={
        props.status === "green"
          ? `${s.button} ${s.colorGreen}`
          : props.status === "red"
            ? `${s.button} ${s.colorRed}`
            : `${s.button} ${s.colorYellow}`
      }
    >
      <div className={s.text}>
        {props.status === "green"
          ? props.text.green
          : props.status === "red"
            ? props.text.red
            : props.text.yellow}
      </div>
    </button>
  );
};

export default ColorFlag;
