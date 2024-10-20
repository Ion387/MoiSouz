import React from "react";
import s from "./Input.module.css";

const Input = ({ onChange, onBlur, name, placeholder, errors }, ref) => {
  return (
    <div>
      <input
        className={!errors ? s.input : `${s.input} ${s.errorInput}`}
        placeholder={placeholder}
        onChange={onChange}
        /*     onBlur={onBlur} */
        name={name}
        ref={ref}
      />
    </div>
  );
};

const MyInput = React.forwardRef(Input);
export default MyInput;
