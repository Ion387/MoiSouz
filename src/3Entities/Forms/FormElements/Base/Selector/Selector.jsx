import React from "react";
import s from "./Selector.module.css";

const MySelector = (
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
    lableStyle,
    value,
    optionValue = [], // { value: string; label: string; }[]
  },
  ref,
) => {
  const options = optionValue.map((el) => (
    <option value={el.value}>{el.label}</option>
  ));
  return (
    <div style={formStyle} className={s.inputForm}>
      {
        <lable for={name} className={s.formLables} style={lableStyle}>
          {lable}
        </lable>
      }

      <select
        className={!errors ? s.input : `${s.input} ${s.errorInput}`}
        onChange={onChange}
        name={name}
        id={name}
        ref={ref}
        style={style}
      >
        <option hidden disabled selected value>
          {optionValue[0]?.label || ""}
        </option>
        {options}
      </select>
      <div className={s.errors}>
        <div className={s.errorsText}>{errors?.message}</div>
      </div>
    </div>
  );
};

const Selector = React.forwardRef(MySelector);
export default Selector;
