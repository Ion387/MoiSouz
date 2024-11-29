import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import s from "./InputTradeUnionHeader.module.css";

import Input from "3Entities/Forms/FormElements/Base/Input/Input";
import DatePicker from "3Entities/Forms/FormElements/Base/DatePicker/DatePicker";
import InputPicture from "3Entities/Forms/FormElements/Base/InputPicture/InputPicture";

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

const InputTradeUnionHeader = ({ prename = "" }) => {
  const { control, watch } = useFormContext();

  return (
    <div className={s.input}>
      <div className={s.nameAvatarGrid}>
        <div className={s.nameTradeUnionInput}>
          <Controller
            className={s.field}
            control={control}
            name={`${prename}lastName`}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                lable={"Наименование"}
                lable2={false}
                placeholder={"Профсоюз"}
                errors={error}
              />
            )}
          />
        </div>
        <div style={{ gridColumn: "3/3" }}>
          <Controller
            className={s.field}
            control={control}
            name={`${prename}avatar`}
            render={({ field, fieldState: { error } }) => (
              <InputPicture {...field} error={error} label="логотип" />
            )}
          />
        </div>
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
              lable={"ОГРН"}
              lable2={false}
              placeholder={"11211231313131"}
              errors={error}
            />
          )}
        />
      </div>
    </div>
  );
};

export default InputTradeUnionHeader;
