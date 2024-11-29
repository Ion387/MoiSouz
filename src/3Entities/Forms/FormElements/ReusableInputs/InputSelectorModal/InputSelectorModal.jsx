import { Controller, useFormContext } from "react-hook-form";
import s from "./InputSelectorModal.module.css";

import SelectorModal from "3Entities/Forms/FormElements/ReusableInputs/InputSelectorModal/SelectorModal/SelectorModal";

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
