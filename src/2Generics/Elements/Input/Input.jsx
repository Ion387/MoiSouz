import React from "react";
import s from "./Input.module.css";

const MyInput = (
  {
    onChange,
    onBlur,
    name,
    placeholder,
    errors,
    type,
    style,
    lable,
    lable2,
    lableStyle,
    value,
  },
  ref,
) => {
  return (
    <div className={s.inputForm}>
      {!lable2 && (
        <lable for={name} className={s.formLables} style={lableStyle}>
          {lable}
        </lable>
      )}
      {lable2 && (
        <div className={s.flexLables}>
          <lable for={name} className={s.formLables}>
            {lable}
          </lable>
          <lable for={name} className={s.formLables}>
            {lable2}
          </lable>
        </div>
      )}

      <input
        type={type || "text"}
        className={!errors ? s.input : `${s.input} ${s.errorInput}`}
        placeholder={placeholder}
        onChange={onChange}
        /*     onBlur={onBlur} */
        name={name}
        id={name}
        ref={ref}
        style={style}
        value={value}
      />
    </div>
  );
};

const Input = React.forwardRef(MyInput);
export default Input;
