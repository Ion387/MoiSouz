import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import s from "./InputAddToTradeUnion.module.css";

import Input from "2Generics/Elements/Input/Input";
import Selector from "2Generics/Elements/Selector/Selector";
import DatePicker from "2Generics/Elements/DatePicker/DatePicker";
import InputAvatar from "2Generics/Elements/InputPicture/InputPicture";

const tradeUnionSelect = [
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

const InputAddToTradeUnion = ({ prename = "" }) => {
  const { control, watch } = useFormContext();

  return (
    <div className={s.input}>
      <div className={s.nameAvatarGrid}>
        <Controller
          className={s.field}
          control={control}
          name={`${prename}education`}
          render={({ field, fieldState: { error } }) => (
            <Selector
              {...field}
              lable={"Выберите профсоюз"}
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

export default InputAddToTradeUnion;
