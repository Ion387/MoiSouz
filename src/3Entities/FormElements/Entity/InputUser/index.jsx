import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import s from "./index.module.css";

import Input from "2Generics/Elements/Input/Input";
import Selector from "2Generics/Elements/Selector/Selector";
import DatePicker from "2Generics/Elements/DatePicker/DatePicker";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";

const educationSelect = [
  "Высшее",
  "Среднее профессиональное",
  "Среднее общее образование",
  "Основное общее образование",
];

const genderSelect = ["Мужской", "Женский"];

export const InputUserResolvers = {
  lname: yup
    .string()
    .matches(/[а-яА-яёЁ]$/, "Фамилия заполненно не верно")
    .required("Укажите Фамилия"),
  fname: yup
    .string()
    .matches(/[а-яА-яёЁ]$/, "Имя заполненно не верно")
    .required("Укажите Имя"),
  mname: yup
    .string()
    .matches(/[а-яА-яёЁ]$/, "Отчество заполненно не верно")
    .required("Укажите Отчество"),
  bdate: yup.string().required("Укажите Дату рождения"),
  education: yup.string().required("Укажите Образование"),
  gender: yup.string().required("Укажите Пол"),
  avatar: yup.string().required("Укажите Фото"),
};

const InputUser = ({ prename = "" }) => {
  //avatar
  const [avatarPreview, setAvatarPreview] = useState(null);
  //calendar
  const [isBirthdayCalendarOpen, setIsBirthdayCalendarOpen] = useState(false);

  const previewAvatarHandler = (e) => {
    const file = e.target.files[0];

    const urlImage = URL.createObjectURL(file);
    const formData = new FormData();
    formData.append("avatar", file);
    setAvatarPreview(urlImage);
  };

  const { control, watch } = useFormContext();

  return (
    <div className={s.input}>
      <div className={s.nameAvatarGrid}>
        <Controller
          className={s.field}
          control={control}
          name={`${prename}lname`}
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
            <label
              className={s.inputAvatarBlock}
              style={error && { borderColor: "red" }}
            >
              <input
                onChange={previewAvatarHandler}
                className={s.inputAvatar}
                id="image-file"
                type="file"
              />

              {avatarPreview ? (
                <div className={s.avaterPreview}>
                  <img
                    src={avatarPreview}
                    className={s.avaterPreview}
                    alt="input-avatar"
                    onLoad={({ target }) => field.onChange(target.src)}
                  />
                </div>
              ) : (
                <div className={s.inputLableBlock}>
                  <div className={s.inputAvatarText}>
                    Добавить
                    <br />
                    фото
                  </div>
                  <div className={s.addAvatarIcon}>
                    <Icon iconName="addSomethingIcon" />
                  </div>
                </div>
              )}
            </label>
          )}
        />

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
      </div>

      <Controller
        className={s.field}
        control={control}
        name={`${prename}mname`}
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
          name={`${prename}bdate`}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              setIsCalendarOpen={setIsBirthdayCalendarOpen}
              lable={"Дата рождения"}
              placeholder={"1980-05-08"}
              onChange={(date) => field.onChange(date)}
              isCalendarOpen={isBirthdayCalendarOpen}
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
