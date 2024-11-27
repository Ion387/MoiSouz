import { Controller, useFormContext } from "react-hook-form";
import s from "./index.module.css";

import SelectorModal from "2Generics/Elements/SelectorModal/SelectorModal";

const InputSelectorModal = ({
  name = "",
  prename = "",
  label,
  placeholder,
  data = [],
}) => {
  const { control } = useFormContext();

  return (
    <div className={s.input}>
      <Controller
        control={control}
        name={`${prename}${name}`}
        render={({ field, fieldState: { error } }) => (
          <SelectorModal
            label={label}
            placeholder={placeholder}
            data={data}
            {...field}
            errors={error}
          />
        )}
      />
    </div>
  );
};

export default InputSelectorModal;
