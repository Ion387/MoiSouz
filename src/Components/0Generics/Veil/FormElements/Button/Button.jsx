import s from "./Button.module.css";

const Button = (props) => {
  return (
    <div>
      <input className={s.submit} type="submit" value={props.value} />
    </div>
  );
};

export default Button;
