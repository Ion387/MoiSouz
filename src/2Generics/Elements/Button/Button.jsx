import s from "./Button.module.css";

const Button = (props) => {
  return (
    <div>
      <input
        style={props.style}
        className={s.submit}
        type={props.type}
        value={props.value}
        onClick={props.onClick}
        disabled={props.disabled}
      />
    </div>
  );
};

export default Button;