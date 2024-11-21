import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import s from "./index.module.css";

import Input from "2Generics/Elements/Input/Input";
import Selector from "2Generics/Elements/Selector/Selector";
import DatePicker from "2Generics/Elements/DatePicker/DatePicker";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import InputAvatar from "2Generics/Elements/InputAvatar";

const educationSelect = [
  { value: "Высшее", label: "Высшее" },
  { value: "Среднее профессиональное", label: "Среднее профессиональное" },
  { value: "Среднее общее образование", label: "Среднее общее образование" },
  { value: "Основное общее образование", label: "Основное общее образование" },
];

const genderSelect = [
  { value: "male", label: "Мужской" },
  { value: "female", label: "Женский" },
];

export const InputUserResolvers = {
  lastName: yup
    .string()
    .matches(/[а-яА-яёЁ]$/, "Фамилия заполненно не верно")
    .required("Укажите Фамилия"),
  firstName: yup
    .string()
    .matches(/[а-яА-яёЁ]$/, "Имя заполненно не верно")
    .required("Укажите Имя"),
  middleName: yup
    .string()
    .matches(/[а-яА-яёЁ]$/, "Отчество заполненно не верно")
    .required("Укажите Отчество"),
  birthdate: yup.string().required("Укажите Дату рождения"),
  education: yup.string().required("Укажите Образование"),
  gender: yup.string().required("Укажите Пол"),
  avatar: yup.string().required("Укажите Фото"),
};

const InputUser = ({ prename = "" }) => {
  const { control, watch } = useFormContext();

  return (
    <div className={s.input}>
      <div className={s.nameAvatarGrid}>
        <Controller
          className={s.field}
          control={control}
          name={`${prename}lastName`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable={"Фамилия"}
              lable2={false}
              placeholder={"Иванов"}
              errors={error}
            />
          )}
        />

        <Controller
          className={s.field}
          control={control}
          name={`${prename}avatar`}
          render={({ field, fieldState: { error } }) => (
            <InputAvatar {...field} error={error} />
          )}
        />

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
      </div>

      <Controller
        className={s.field}
        control={control}
        name={`${prename}middleName`}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            lable={"Отчество"}
            lable2={false}
            placeholder={"Иванович"}
            errors={error}
          />
        )}
      />

      <div className={s.gridBirthDataEducationGender}>
        <Controller
          control={control}
          name={`${prename}birthdate`}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              lable="Дата рождения"
              placeholder="1980-05-08"
              value={field.value}
              onChange={(date) => field.onChange(date)}
              errors={error}
            />
          )}
        />

        <Controller
          className={s.field}
          control={control}
          name={`${prename}education`}
          render={({ field, fieldState: { error } }) => (
            <Selector
              {...field}
              lable={"Образование"}
              optionValue={educationSelect}
              placeholder={"Высшее"}
              errors={error}
              style={
                (watch(`${prename}education`) || "").trim()
                  ? {}
                  : { color: "rgb(166, 166, 166)" }
              }
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
              lable={"Пол"}
              optionValue={genderSelect}
              placeholder={"Мужской"}
              errors={error}
              style={
                (watch(`${prename}gender`) || "").trim()
                  ? {}
                  : { color: "rgb(166, 166, 166)" }
              }
            />
          )}
        />
      </div>
    </div>
  );
};

export default InputUser;
