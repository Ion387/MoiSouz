import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import s from "./index.module.css";

import Input from "2Generics/Elements/Input/Input";
import Selector from "2Generics/Elements/Selector/Selector";
import DatePicker from "2Generics/Elements/DatePicker/DatePicker";

const genderSelect = ["Мужской", "Женский"];

export const InputChildResolvers = {
  fname: yup
    .string()
    .matches(/[а-яА-яёЁ]$/, "Имя заполненно не верно")
    .required("Укажите Имя"),
  gender: yup.string().required("Укажите Пол"),
  bdate: yup.string().required("Укажите Дату рождения"),
};

const InputChild = ({ prename = "" }) => {
  //calendar
  const [isBirthdayCalendarOpen, setIsBirthdayCalendarOpen] = useState(false);

  const { control, watch } = useFormContext();

  return (
    <div className={s.input}>
      <Controller
        className={s.field}
        control={control}
        name={`${prename}fname`}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            lable={"Имя"}
            lable2={false}
            placeholder={"Иван"}
            errors={error}
          />
        )}
      />

      <Controller
        className={s.field}
        control={control}
        name={`${prename}gender`}
        render={({ field, fieldState: { error } }) => (
          <Selector
            {...field}
            optionValue={genderSelect}
            errors={error}
            placeholder={"Мужской"}
            lable={"Пол"}
            style={
              (watch(`${prename}gender`) || "").trim()
                ? { width: "100%" }
                : { width: "100%", color: "rgb(166, 166, 166)" }
            }
          />
        )}
      />

      <Controller
        className={s.field}
        control={control}
        name={`${prename}bdate`}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            setIsCalendarOpen={setIsBirthdayCalendarOpen}
            lable={"Дата рождения"}
            placeholder={"1980-05-08"}
            onChange={(date) => field.onChange(date)}
            isCalendarOpen={isBirthdayCalendarOpen}
            style={{ width: "100%" }}
            errors={error}
          />
        )}
      />
    </div>
  );
};

export default InputChild;
