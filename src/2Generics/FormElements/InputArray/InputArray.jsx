import React, { useEffect } from "react";
import s from "./InputArray.module.css";
import Input from "../Input/Input";
import { profileInfoSchema } from "5Utilits/FormSchemas/ProfileInfoSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";

const MyInputArray = (
  {
    onChange,
    onBlur,
    name,
    placeholder,
    errors,
    type,
    style,
    lable,
    lable2,
    lableStyle,
    value,
  },
  ref
) => {
  const { register, handleSubmit, control, reset } = useForm({
    resolver: yupResolver(profileInfoSchema),
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormProvider)
      name: "test", // unique name for your Field Array
    }
  );
  useEffect(() => {
    append(0);
  }, []);
  return (
    <div className={s.inputForm}>
      <div className={s.flexLables}>
        <lable for={name} className={s.formLables}>
          {lable}
        </lable>
        <lable for={name} className={s.formLables}>
          <div
            className={s.addReduceIcon}
            onClick={() => {
              append(1);
            }}
          >
            <Icon iconName={"addInputIcon"} />
          </div>
        </lable>
      </div>

      {fields.map((field, index) => (
        <div className={s.inputBlock}>
          {index > 0 && (
            <div className={s.flexLables}>
              <lable for={name} className={s.formLables}>
                {lable2}
              </lable>
              <lable for={name} className={s.formLables}>
                <div
                  className={s.addReduceIcon}
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <Icon iconName={"reduceInputIcon"} />
                </div>
              </lable>
            </div>
          )}

          <Input
            type={type || "text"}
            className={!errors ? s.input : `${s.input} ${s.errorInput}`}
            placeholder={placeholder}
            onChange={onChange}
            /*     onBlur={onBlur} */
            name={name}
            id={name}
            ref={ref}
            style={style}
            value={value}
            lableStyle={{ height: "0px" }}
            errors={errors}
          />
        </div>
      ))}
    </div>
  );
};

const InputArray = React.forwardRef(MyInputArray);
export default InputArray;
