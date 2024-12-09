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
    formStyle,
    lable,
    lable2,
    lableStyle,
    value,
    disabled,
    autocomplete,
  },
  ref,
) => {
  console.log(style);
  return (
    <div style={formStyle} className={s.inputForm}>
      {!lable2 && (
        <lable for={name} className={s.formLables} style={lableStyle}>
          {lable}
        </lable>
      )}
      {lable2 && (
        <div className={s.flexLables}>
          <label for={name} className={s.formLables}>
            {lable}
          </label>
          <label for={name} className={s.formLables}>
            {lable2}
          </label>
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
        value={value}
        style={style}
        disabled={disabled}
        autoComplete={autocomplete}
      />
      <div className={s.errors}>{errors?.message}</div>
    </div>
  );
};

const Input = React.forwardRef(MyInput);
export default Input;
