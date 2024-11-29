import React, { createRef, useEffect, useState } from "react";
import s from "./SelectorModal.module.css";
import Input from "../../../Base/Input/Input";
import ModalChoicePicker from "3Entities/Forms/FormElements/ReusableInputs/InputSelectorModal/SelectorModal/ModalChoicePicker/ModalChoicePicker";

const SelectorModal = ({
  style,
  data = [], // { value: string; label: string; }[]
  onChange,
  value = [], // string[] - value[]
  label,
  ...rest
}) => {
  const [select, setSelect] = useState(
    data.filter((el) => value.includes(el.value)),
  );
  const [show, setShow] = useState(false);
  const refContainer = createRef();

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener(
      "click",
      (e) => {
        if (refContainer.current == null) return;
        if (refContainer.current.contains(e.target)) return;
        setShow(false);
      },
      { signal: controller.signal },
    );
    return () => controller.abort();
  }, [show]);

  const handleSubmit = (data) => {
    setShow(false);
    onChange && onChange(data.map((el) => el.value));
  };

  const handleCancel = () => {
    setShow(false);
    setSelect(data.filter((el) => value.includes(el.value)));
  };

  return (
    <div className={s.inputForm} ref={refContainer}>
      <div className={s.choiceHobbies} onClick={() => setShow(true)}>
        <Input
          value={value && value.join(", ")}
          style={{ ...(style || {}), width: "100%", cursor: "pointer" }}
          lable={label}
          autocomplete="off"
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
