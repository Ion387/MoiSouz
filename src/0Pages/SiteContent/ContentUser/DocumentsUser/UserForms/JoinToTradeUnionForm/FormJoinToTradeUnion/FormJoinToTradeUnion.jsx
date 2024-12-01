import s from "./FormJoinToTradeUnion.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "3Entities/Forms/FormElements/Base/Button/Button";
import InputJoinToTradeUnion from "./Inputs/InputJoinToTradeUnion/InputJoinToTradeUnion";
import InputCheckBox from "3Entities/Forms/FormElements/ReusableInputs/InputCheckBox/InputCheckBox";

const FormJoinToTradeUnion = ({
  defaultValues,
  onSubmit,
  saveHandler,
  printHandler,
  setIsShowPrintedForm,
}) => {
  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        hobbies: yup
          .array()
          .of(yup.string())
          .required("Укажите Увлечения")
          .min(1, "Укажите Увлечения"),
        /*         approval: yup
          .boolean()
          .required("Укажите Согласие")
          .oneOf([true], "Укажите Согласие"), */
      }),
    ),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.title}>Форма заявления на вступление в профсоюз</div>
        <div className={s.formBlock}>
          <FormProvider {...methods}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <InputJoinToTradeUnion />
              {/* 
              <InputCheckBox
                name="approval"
                label="Размер взносов в профсоюз от заработной платы (обязательное, значения 1% и 2%)"
              />

              <InputCheckBox
                name="approval"
                label="Я соглашаюсь на обработку персональных данных Согласие с политикой обработки персональных данных"
              /> */}
              <div className={s.buttons}>
                <Button
                  value={"Отменить"}
                  style={{
                    width: "168px",
                  }}
                  white
                />
                <Button
                  value={"Сохранить в черновики"}
                  style={{
                    width: "225px",
                  }}
                />

                <Button
                  value={"Распечатать"}
                  style={{
                    width: "225px",
                  }}
                  onClick={() => setIsShowPrintedForm(true)}
                />

                <Button
                  value={"Отправить"}
                  white
                  style={{
                    width: "168px",
                  }}
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default FormJoinToTradeUnion;
