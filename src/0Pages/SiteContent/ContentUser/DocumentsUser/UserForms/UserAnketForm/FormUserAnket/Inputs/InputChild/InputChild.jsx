import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import s from "./InputChild.module.css";

import Input from "3Entities/Forms/FormElements/Base/Input/Input";
import Selector from "3Entities/Forms/FormElements/Base/Selector/Selector";
import DatePicker from "3Entities/Forms/FormElements/Base/DatePicker/DatePicker";

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
        name={`${prename}childrenName`}
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
        name={`${prename}childrenGender`}
        render={({ field, fieldState: { error } }) => (
          <Selector
            {...field}
            optionValue={genderSelect}
            errors={error}
            placeholder={"Мужской"}
            lable={"Пол"}
            style={
              (watch(`${prename}childrenGender`) || "").trim()
                ? { width: "100%" }
                : { width: "100%", color: "rgb(166, 166, 166)" }
            }
          />
        )}
      />

      <Controller
        className={s.field}
        control={control}
        name={`${prename}childrenBirthdate`}
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
