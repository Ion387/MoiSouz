import { Controller, useFormContext } from "react-hook-form";
import s from "./index.module.css";

import CheckBox from "2Generics/Elements/CheckBox";

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
