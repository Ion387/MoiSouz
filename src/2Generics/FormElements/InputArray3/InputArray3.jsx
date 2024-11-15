import React, { useEffect } from "react";
import s from "./InputArray3.module.css";
import Input from "../Input/Input";
import { profileInfoSchema } from "5Utilits/FormSchemas/ProfileInfoSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import DatePicker from "2Generics/FormElements/DatePicker/DatePicker";
import Selector from "2Generics/FormElements/Selector/Selector";

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
    setIsChildrenGenderClicked,
    childrenGenderSelect,
    isChildrenGenderClicked,
    childrenBirthdate,
    isChildrenCalendarOpen,
    setIsChildrenCalendarOpen,
    setChildrenBirthdate,
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
  /*   useEffect(() => {
    append(0);
  }, []); */
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
          <div className={s.flexLablesReduce}>
            <lable for={name} className={s.formLables}></lable>
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

          <div className={s.gridChildrens}>
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

            <div onClick={() => setIsChildrenGenderClicked(true)}>
              <Selector
                {...register("childrenGender")}
                optionValue={childrenGenderSelect}
                placeholder={"Пол"}
                /*     lable={"Образование"} */
                /*        errors={errors.childrenGender} */
                lableStyle={{ height: "0px" }}
                style={
                  !isChildrenGenderClicked
                    ? { color: "rgb(166, 166, 166)" }
                    : {}
                }
              />
            </div>

            <DatePicker
              value={childrenBirthdate}
              isCalendarOpen={isChildrenCalendarOpen}
              setIsCalendarOpen={setIsChildrenCalendarOpen}
              setDate={setChildrenBirthdate}
              {...register("childrenBirthdate")}
              placeholder={"Дата рождения"}
              lableStyle={{ height: "0px" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const InputArray3 = React.forwardRef(MyInputArray);
export default InputArray3;
