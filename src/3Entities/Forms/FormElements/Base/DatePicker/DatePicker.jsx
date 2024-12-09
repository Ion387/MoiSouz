import Calendar from "react-calendar";
import "./Calendar.css";
import moment from "moment";
import React, { createRef, useEffect, useState } from "react";
import s from "./DatePicker.module.css";

export function MyDatePicker(
  {
    name,
    placeholder,
    errors,
    style,
    formStyle,
    lable,
    lableStyle,
    value,
    onChange,
  },
  ref,
) {
  const [date, setDate] = useState();
  const [open, setOpen] = useState();
  const refContainer = createRef();

  useEffect(() => {
    if (value == null) return;
    setDate(moment(value, "DD.MM.YYYY").format("YYYY-MM-DD"));
  }, [value]);

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener(
      "click",
      (e) => {
        if (refContainer.current == null) return;
        if (refContainer.current.contains(e.target)) return;
        setOpen(false);
      },
      { signal: controller.signal },
    );
    return () => controller.abort();
  }, [open]);

  const onDateChange = (newDate) => {
    setDate(moment(newDate).format("YYYY-MM-DD"));
    onChange(moment(newDate).format("DD.MM.YYYY"));
    setOpen(false);
  };
  return (
    <div style={formStyle} className={s.calendarMain} ref={refContainer}>
      <lable for={name} className={s.formLables} style={lableStyle}>
        {lable}
      </lable>
      <div
        className={s.calendar}
        onClick={() => {
          setOpen(true);
        }}
      >
        <input
          type={"text"}
          className={!errors ? s.input : `${s.input} ${s.errorInput}`}
          placeholder={placeholder}
          /*     onBlur={onBlur} */
          name={name}
          id={name}
          ref={ref}
          style={style}
          value={date}
        />
      </div>
      {open === true && (
        <>
          {/*<div className={s.bgClose} onClick={setOpen(false)}></div>*/}
          <Calendar
            onChange={onDateChange}
            on
            showNeighboringMonth={false}
            locale={"ru"}
            value={date && new Date(date)}
            //defaultActiveStartDate={new Date("2000-01-01")}
          />
        </>
      )}
      <div className={s.errors}>
        <div className={s.errorsText}>{errors?.message}</div>
      </div>
    </div>
  );
}

const DatePicker = React.forwardRef(MyDatePicker);
export default DatePicker;
