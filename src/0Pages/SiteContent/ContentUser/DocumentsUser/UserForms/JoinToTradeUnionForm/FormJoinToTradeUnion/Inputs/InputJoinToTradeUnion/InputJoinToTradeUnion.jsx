import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import s from "./InputJoinToTradeUnion.module.css";

import Input from "3Entities/Forms/FormElements/Base/Input/Input";
import Selector from "3Entities/Forms/FormElements/Base/Selector/Selector";
import DatePicker from "3Entities/Forms/FormElements/Base/DatePicker/DatePicker";
import InputAvatar from "3Entities/Forms/FormElements/Base/InputPicture/InputPicture";
import { useSelector } from "react-redux";
import moment from "moment";

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
  const date = moment(new Date()).format("DD.MM.YYYY");
  return (
    <div className={s.input}>
      <div className={s.dateNumberGrid}>
        <Input
          value={"123"}
          lable={"Номер документа"}
          lable2={false}
          disabled
        />
        <Input value={date} lable={"Дата документа"} lable2={false} disabled />
      </div>
      <Input value={data.lastName} lable={"Фамилия"} lable2={false} disabled />
      <Input value={data.firstName} lable={"Имя"} lable2={false} disabled />
      <Input
        value={data.middleName}
        lable={"Отчество"}
        lable2={false}
        disabled
      />

      <Controller
        className={s.field}
        control={control}
        name={`${prename}position`}
        render={({ field, fieldState: { error } }) => (
          <Input {...field} lable={"Должность"} lable2={false} errors={error} />
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
