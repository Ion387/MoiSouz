import s from "./DocumentsButton.module.css";

const DocumentsButton = (props) => {
  return (
    <button
      className={
        props.status === "done"
          ? `${s.button} ${s.colorGreen}`
          : props.status === "wait"
            ? `${s.button} ${s.colorYellow}`
            : `${s.button} ${s.colorRed}`
      }
    >
      <div className={s.text}>
        {props.status === "done"
          ? `Исполнено`
          : props.status === "wait"
            ? `В обработке`
            : `Отказано`}
      </div>
    </button>
  );
};

export default DocumentsButton;
