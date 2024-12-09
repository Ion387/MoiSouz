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
            formStyle={{ marginTop: "0px" }}
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
            formStyle={{ marginTop: "0px" }}
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
            formStyle={{ marginTop: "0px" }}
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
