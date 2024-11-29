import { Controller, useFormContext } from "react-hook-form";
import s from "./InputCheckBox.module.css";

import CheckBox from "3Entities/Forms/FormElements/ReusableInputs/InputCheckBox/CheckBox/CheckBox";

const InputCheckBox = ({ name = "", prename = "", label }) => {
  const { control } = useFormContext();

  return (
    <div className={s.input}>
      <Controller
        control={control}
        name={`${prename}${name}`}
        render={({ field, fieldState: { error } }) => (
          <CheckBox {...field} label={label} errors={error} />
        )}
      />
    </div>
  );
};

export default InputCheckBox;
