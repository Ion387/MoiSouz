import React, { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import * as yup from "yup";
import s from "./index.module.css";

import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";

export const InputArrayResolversAs = (resolve) => yup.array().of(resolve);

const InputArray = ({
  name,
  placeholder,
  style,
  label,
  label2,
  render,
  preadd,
}) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormProvider)
      name, // unique name for your Field Array
    },
  );
  useEffect(() => {
    if (fields.length > 0) return;
    if (preadd == true) append();
  }, []);

  return (
    <div className={s.inputForm}>
      <div className={s.flexLables}>
        <lable for={name} className={s.formLables}>
          {label}
        </lable>
        <lable for={name} className={s.formLables}>
          <div
            className={s.addReduceIcon}
            onClick={() => {
              append();
            }}
          >
            <Icon iconName={"addInputIcon"} />
          </div>
        </lable>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className={s.inputBlock}>
          {(preadd != true || index > 0) && (
            <div className={s.flexLables}>
              <lable for={name} className={s.formLables}>
                {label2}
              </lable>
              <lable for={name} className={s.formLables}>
                <div
                  className={s.reduceIcon}
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <Icon iconName={"reduceInputIcon"} />
                </div>
              </lable>
            </div>
          )}

          {render({
            className:
              errors[name] && errors[name][index]
                ? `${s.input} ${s.errorInput}`
                : s.input,
            placeholder,
            formStyle: { marginTop: "5px" },
            style: { marginTop: "0px" },
            lableStyle: { height: "0px" },
            errors: errors[name] && errors[name][index],
            register: () => register(`${name}.${index}`),
          })}
        </div>
      ))}
    </div>
  );
};

export default React.forwardRef(InputArray);
