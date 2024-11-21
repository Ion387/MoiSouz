import React, { useState } from "react";
import s from "./index.module.css";
import Input from "../Input/Input";
import ModalChoicePicker from "3Entities/ModalChoicePicker/ModalChoicePicker";

const SelectorModal = ({
  style,
  data = [],
  onChange,
  value = [],
  label,
  ...rest
}) => {
  const [select, setSelect] = useState(value);

  //modal
  const [show, setShow] = useState(false);

  const handleSubmit = (data) => {
    setShow(false);
    onChange && onChange(data);
  };

  const handleCancel = () => {
    setShow(false);
    setSelect(value);
  };

  return (
    <div className={s.inputForm}>
      <div className={s.choiceHobbies} onClick={() => setShow(true)}>
        <Input
          value={value && value.join(", ")}
          style={{ ...(style || {}), width: "100%", cursor: "pointer" }}
          lable={label}
          {...rest}
        />
        {show && (
          <ModalChoicePicker
            lableArray={data}
            choice={select}
            setChoice={setSelect}
            submit={handleSubmit}
            cancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(SelectorModal);
