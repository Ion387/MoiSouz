import React, { useState } from "react";
import ReactDOM from "react-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";

export function MyCalendar(props) {
  /*   const [date, setDate] = useState(new Date()); */
  const onDateChange = (newDate) => {
    /*     const dataFormating = new Intl.DateTimeFormat("en-US").format(newDate); */
    const formatingDate = dayjs(newDate).format("YYYY-MM-DD");
    props.setDate(formatingDate);
  };

  return (
    <Calendar
      onChange={onDateChange}
      on
      showNeighboringMonth={false}
      locale={"ru"}
      defaultActiveStartDate={new Date(2000, 0, 0)}
    />
  );
}
