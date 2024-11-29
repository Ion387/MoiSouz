import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import s from "./InputUser.module.css";

import Input from "3Entities/Forms/FormElements/Base/Input/Input";
import Selector from "3Entities/Forms/FormElements/Base/Selector/Selector";
import DatePicker from "3Entities/Forms/FormElements/Base/DatePicker/DatePicker";
import InputAvatar from "3Entities/Forms/FormElements/Base/InputPicture/InputPicture";

const InputUser = ({ prename = "" }) => {
  const { control, watch } = useFormContext();

  return (
    <>
      <Controller
        className={s.field}
        control={control}
        name={`${prename}avatar`}
        render={({ field, fieldState: { error } }) => (
          <InputAvatar {...field} error={error} label="фото" />
        )}
      />
    </>
  );
};

export default InputUser;
