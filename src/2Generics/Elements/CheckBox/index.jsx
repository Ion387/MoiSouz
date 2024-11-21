import React from "react";
import s from "./index.module.css";

const CheckBox = ({ errors, style, label, onChange, ...rest }) => {
  return (
    <div className={s.inputForm}>
      <div className={s.checkboxBlock}>
        <input
          className={!errors ? s.checkbox : `${s.checkbox} ${s.errorInput}`}
          type="checkbox"
          style={style}
          onChange={(e) => onChange && onChange(e.target.checked)}
          {...rest}
        />
        <div className={s.checkboxText}>{label}</div>
      </div>
    </div>
  );
};

export default React.forwardRef(CheckBox);
