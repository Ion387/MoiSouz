import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import s from "./index.module.css";

import Input from "2Generics/Elements/Input/Input";
import Selector from "2Generics/Elements/Selector/Selector";
import DatePicker from "2Generics/Elements/DatePicker/DatePicker";

const genderSelect = [
  { value: "male", label: "Мужской" },
  { value: "female", label: "Женский" },
];

export const InputChildResolvers = {
  firstName: yup
    .string()
    .matches(/[а-яА-яёЁ]$/, "Имя заполненно не верно")
    .required("Укажите Имя"),
  gender: yup.string().required("Укажите Пол"),
  birthdate: yup.string().required("Укажите Дату рождения"),
};

const InputChild = ({ prename = "" }) => {
  const { control, watch } = useFormContext();

  return (
    <div className={s.input}>
      <Controller
        className={s.field}
        control={control}
        name={`${prename}firstName`}
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
        name={`${prename}birthdate`}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            lable="Дата рождения"
            placeholder="1980-05-08"
            value={field.value}
            onChange={(date) => field.onChange(date)}
            style={{ width: "100%" }}
            errors={error}
          />
        )}
      />
    </div>
  );
};

export default InputChild;
