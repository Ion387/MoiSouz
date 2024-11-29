import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import s from "./InputJoinToTradeUnion.module.css";

import Input from "2Generics/Elements/Input/Input";
import Selector from "2Generics/Elements/Selector/Selector";
import DatePicker from "2Generics/Elements/DatePicker/DatePicker";
import InputAvatar from "2Generics/Elements/InputPicture/InputPicture";
import { useSelector } from "react-redux";

const tradeUnionSelect = [
  {
    value: "profsouz0",
    label:
      "Профсоюзная организация аппарата Московской областной организации профсоюза работников здравохранения РФ",
  },

  { value: "profsouz1", label: "Профсоюз работников полиции" },
  { value: "profsouz2", label: "Профсоюз металлургов" },
  { value: "profsouz3", label: "Профсоюз медицинских работников" },
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

const InputJoinToTradeUnion = ({ prename = "" }) => {
  const { control, watch } = useFormContext();

  const { data } = useSelector((state) => state.user);

  return (
    <div className={s.input}>
      <div className={s.dateNumberGrid}>
        <Input value={"123"} lable={"Номер документа"} lable2={false} />
        <Input value={"123"} lable={"Дата документа"} lable2={false} />

        <Controller
          control={control}
          name={`${prename}birthdate`}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              lable="Дата документа"
              placeholder="19.08.1980"
              value={field.value}
              onChange={(date) => field.onChange(date)}
              errors={error}
            />
          )}
        />
      </div>

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
        name={`${prename}firstName`}
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
        name={`${prename}firstName`}
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
      <Controller
        className={s.field}
        control={control}
        name={`${prename}firstName`}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            lable={"Должность"}
            lable2={false}
            placeholder={"Бухгалтер"}
            errors={error}
          />
        )}
      />

      <div className={s.dateJoinUTNameGrid}>
        <Controller
          control={control}
          name={`${prename}birthdate`}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              lable="Дата вступления"
              placeholder="20.12.2024"
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
              lable={"Выберите профсоюз из списка"}
              optionValue={tradeUnionSelect}
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
      </div>
    </div>
  );
};

export default InputJoinToTradeUnion;
