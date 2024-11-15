import Calendar from "react-calendar";
import "./Calendar.css";
import dayjs from "dayjs";
import React from "react";
import s from "./DatePicker.module.css";

export function MyDatePicker(
  {
    name,
    placeholder,
    errors,
    style,
    lable,
    lableStyle,
    value,
    setDate,
    calendarPickBirthdayHandler,
    isCalendarOpen,
    setIsCalendarOpen,
  },
  ref
) {
  /*   const [date, setDate] = useState(new Date()); */
  const onDateChange = (newDate) => {
    const formatingDate = dayjs(newDate).format("YYYY-MM-DD");
    setDate(formatingDate);
    setIsCalendarOpen(false);
  };
  return (
    <div className={s.calendarMain}>
      <lable for={name} className={s.formLables} style={lableStyle}>
        {lable}
      </lable>
      <div
        className={s.calendar}
        onClick={() => {
          setIsCalendarOpen(true);
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
          value={value}
        />
      </div>
      {isCalendarOpen === true && (
        <Calendar
          onChange={onDateChange}
          on
          showNeighboringMonth={false}
          locale={"ru"}
          defaultActiveStartDate={new Date(2000, 0, 0)}
        />
      )}
    </div>
  );
}

const DatePicker = React.forwardRef(MyDatePicker);
export default DatePicker;
