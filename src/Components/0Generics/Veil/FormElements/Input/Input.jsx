import s from "./Input.module.css";

const Input = (props) => {
  return (
    <div>
      <input className={s.input} {...props} />
    </div>
  );
};

export default Input;
