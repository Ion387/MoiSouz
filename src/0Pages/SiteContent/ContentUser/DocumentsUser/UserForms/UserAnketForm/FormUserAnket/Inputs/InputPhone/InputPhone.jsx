import * as yup from "yup";
import { Controller, useFormContext } from "react-hook-form";
import s from "./InputPhone.module.css";

import Input from "3Entities/Forms/FormElements/Base/Input/Input";

export const InputPhoneResolvers = {
  phone: yup.string().required("Укажите Номер телефона"),
  phoneDop: yup.string(),
};

const InputPhone = ({ prename = "", extra = false }) => {
  const { control } = useFormContext();

  return (
    <div className={s.input}>
      <div className={s.gridTelAditionTel}>
        <Controller
          className={s.tel}
          control={control}
          name={`${prename}phone`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable="Номер телефона"
              placeholder="+7 999 999 88 70"
              errors={error}
            />
          )}
        />

        {extra && (
          <Controller
            className={s.tel}
            control={control}
            name={`${prename}phoneDop`}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                lable="Доп. номер"
                placeholder="+7 999 999 88 70"
                errors={error}
              />
            )}
          />
        )}
      </div>
    </div>
  );
};

export default InputPhone;
