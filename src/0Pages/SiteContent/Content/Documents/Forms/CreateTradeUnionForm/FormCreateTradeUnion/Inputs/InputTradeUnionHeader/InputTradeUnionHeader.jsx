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

/* title:
  creationDate: 
  logo: 
  ogrn:  */
const InputTradeUnionHeader = ({ prename = "" }) => {
  const { control, watch } = useFormContext();

  return (
    <div className={s.input}>
      <div className={s.nameAvatarGrid}>
        <div className={s.nameTradeUnionInput}>
          <Controller
            className={s.field}
            control={control}
            name={`${prename}title`}
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
            name={`${prename}logo`}
            render={({ field, fieldState: { error } }) => (
              <InputPicture {...field} error={error} label="логотип" />
            )}
          />
        </div>
        <Controller
          control={control}
          name={`${prename}creationDate`}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              lable="Дата образования по протоколу"
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
          name={`${prename}ogrn`}
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
