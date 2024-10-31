import s from "./Button.module.css";

const Button = (props) => {
  return (
    <div>
      <input
        style={props.style}
        className={s.submit}
        type="submit"
        value={props.value}
      />
    </div>
  );
};

export default Button;
