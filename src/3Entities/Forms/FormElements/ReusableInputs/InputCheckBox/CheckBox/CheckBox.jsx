import React from "react";
import s from "./CheckBox.module.css";

const CheckBox = ({
  errors,
  style,
  label,
  lableStyle,
  onChange,
  value,
  name,
  ...rest
}) => {
  return (
    <div className={s.inputForm}>
      <div className={s.checkboxBlock}>
        <input
          className={!errors ? s.checkbox : `${s.checkbox} ${s.errorInput}`}
          id={name}
          name={name}
          type="checkbox"
          style={style}
          onChange={(e) => onChange && onChange(e.target.checked)}
          defaultChecked={value}
          {...rest}
        />
        <label className={s.checkboxText} for={name} style={lableStyle}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default React.forwardRef(CheckBox);
