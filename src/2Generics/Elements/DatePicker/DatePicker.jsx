import Calendar from "react-calendar";
import "./Calendar.css";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import s from "./DatePicker.module.css";

export function MyDatePicker(
  { name, placeholder, errors, style, lable, lableStyle, value, onChange },
  ref,
) {
  const [date, setDate] = useState();
  const [open, setOpen] = useState();

  useEffect(() => {
    if (value == null) return;
    setDate(dayjs(value).format("YYYY-MM-DD"));
  }, [value]);

  const onDateChange = (newDate) => {
    const formatingDate = dayjs(newDate).format("YYYY-MM-DD");
    setDate(formatingDate);
    onChange(formatingDate);
    setOpen(false);
  };
  return (
    <div className={s.calendarMain}>
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
        <Calendar
          onChange={onDateChange}
          on
          showNeighboringMonth={false}
          locale={"ru"}
          value={date && new Date(date)}
          //defaultActiveStartDate={new Date("2000-01-01")}
        />
      )}
    </div>
  );
}

const DatePicker = React.forwardRef(MyDatePicker);
export default DatePicker;
