import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import s from "./InputTradeUnionBody.module.css";

import Input from "2Generics/Elements/Input/Input";
import DatePicker from "2Generics/Elements/DatePicker/DatePicker";
import InputAddress from "../InputAddress/InputAddress";

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
  avatar: yup.mixed().required("Укажите Фото"),
};

const InputTradeUnionBody = ({ prename = "" }) => {
  const { control, watch } = useFormContext();

  return (
    <div className={s.input}>
      <div className={s.grid50prc}>
        <Controller
          className={s.field}
          control={control}
          name={`${prename}lastName`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable={"ИНН"}
              lable2={false}
              placeholder={"740000000000 "}
              errors={error}
            />
          )}
        />
        <Controller
          className={s.field}
          control={control}
          name={`${prename}firstName`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable={"КПП"}
              lable2={false}
              placeholder={"740001001"}
              errors={error}
            />
          )}
        />
      </div>

      <InputAddress />
      <div className={s.dateOfCreationGrid}>
        <Controller
          control={control}
          name={`${prename}birthdate`}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              lable="Дата образования"
              placeholder="15.05.2005"
              value={field.value}
              onChange={(date) => field.onChange(date)}
              errors={error}
            />
          )}
        />
        <Controller
          className={s.field}
          control={control}
          name={`${prename}firstName`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable={"ОКАТО"}
              lable2={false}
              placeholder={"124420001001"}
              errors={error}
            />
          )}
        />

        <Controller
          className={s.field}
          control={control}
          name={`${prename}firstName`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable={"ОКТМО"}
              lable2={false}
              placeholder={"124420001001"}
              errors={error}
            />
          )}
        />
      </div>
      <div className={s.Grid50prc2row}>
        <Controller
          className={s.field}
          control={control}
          name={`${prename}firstName`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable={"Председатель"}
              lable2={false}
              placeholder={"Имя"}
              errors={error}
            />
          )}
        />
        <Controller
          className={s.field}
          control={control}
          name={`${prename}firstName`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable={false}
              lable2={false}
              lableStyle={null}
              placeholder={"Фамилия"}
              errors={error}
            />
          )}
        />
        <Controller
          className={s.field}
          control={control}
          name={`${prename}firstName`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable={false}
              lable2={false}
              placeholder={"Отчество"}
              errors={error}
              lableStyle={{ height: "0px" }}
            />
          )}
        />
        <Controller
          className={s.field}
          control={control}
          name={`${prename}firstName`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable={false}
              lable2={false}
              placeholder={"Инн"}
              errors={error}
              lableStyle={{ height: "0px" }}
            />
          )}
        />
      </div>

      <div className={s.grid50prc}>
        <Controller
          className={s.field}
          control={control}
          name={`${prename}firstName`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable={"E-mail"}
              lable2={false}
              placeholder={"director@mail.ru"}
              errors={error}
            />
          )}
        />
        <Controller
          className={s.field}
          control={control}
          name={`${prename}firstName`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable={"Телефон"}
              lable2={false}
              lableStyle={null}
              placeholder={"+7 999 777 77 66"}
              errors={error}
            />
          )}
        />
      </div>

      <div className={s.Grid50prc2row}>
        <Controller
          className={s.field}
          control={control}
          name={`${prename}firstName`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable={"Банковские реквизиты"}
              lable2={false}
              placeholder={"Банк"}
              errors={error}
            />
          )}
        />
        <Controller
          className={s.field}
          control={control}
          name={`${prename}firstName`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable={false}
              lable2={false}
              placeholder={"р/с"}
              errors={error}
            />
          )}
        />
        <Controller
          className={s.field}
          control={control}
          name={`${prename}firstName`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable={false}
              lable2={false}
              placeholder={"БИК"}
              errors={error}
              lableStyle={{ height: "0px" }}
            />
          )}
        />
        <Controller
          className={s.field}
          control={control}
          name={`${prename}firstName`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable={false}
              lable2={false}
              placeholder={"к/с"}
              errors={error}
              lableStyle={{ height: "0px" }}
            />
          )}
        />
      </div>

      <div className={s.grid50prc}>
        <Controller
          className={s.field}
          control={control}
          name={`${prename}firstName`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable={"E-mail организации"}
              lable2={false}
              placeholder={"prof-souz@mail.ru"}
              errors={error}
            />
          )}
        />
        <Controller
          className={s.field}
          control={control}
          name={`${prename}firstName`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable={"Телефон организации"}
              lable2={false}
              lableStyle={null}
              placeholder={"+7 495 000 00 00"}
              errors={error}
            />
          )}
        />
      </div>
    </div>
  );
};

export default InputTradeUnionBody;

{
  /* <Controller
  control={control}
  name={`${prename}birthdate`}
  render={({ field, fieldState: { error } }) => (
    <DatePicker
      lable="Дата образования"
      placeholder="15.05.2005"
      value={field.value}
      onChange={(date) => field.onChange(date)}
      errors={error}
    />
  )}
/>; */
}
