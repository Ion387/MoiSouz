import React from "react";
import s from "./Selector.module.css";

const Selector = (
  {
    onChange,
    onBlur,
    name,
    placeholder,
    errors,
    type,
    style,
    lable,
    lableStyle,
    value,
    optionValue,
  },
  ref
) => {
  const options = optionValue.map((i) => <option>{i}</option>);
  return (
    <div className={s.inputForm}>
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
        value={value}
      >
        {options}
      </select>
    </div>
  );
};

const MySelector = React.forwardRef(Selector);
export default MySelector;
