import s from "./FormJoinToTradeUnion.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Submit from "3Entities/Forms/FormElements/Base/Submit";
import Button from "2Generics/Elements/Button/Button";
import InputJoinToTradeUnion from "./Inputs/InputJoinToTradeUnion/InputJoinToTradeUnion";
import InputCheckBox from "3Entities/Forms/FormElements/Base/InputCheckBox/InputCheckBox";

const FormJoinToTradeUnion = ({
  defaultValues,
  onSubmit,
  saveHandler,
  printHandler,
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
              {/*               <InputCheckBox
                name="approval"
                label="Я соглашаюсь на обработку персональных данных Согласие с политикой обработки персональных данных"
              /> */}

              <InputCheckBox
                name="approval"
                label="Размер взносов в профсоюз от заработной платы (обязательное, значения 1% и 2%"
              />

              <InputCheckBox
                name="approval"
                label="Я соглашаюсь на обработку персональных данных Согласие с политикой обработки персональных данных"
              />

              <Submit errors={errors} value="Вступить" />
              <div className={s.bottomButtons}>
                <Button
                  value={"Скачать"}
                  onClick={saveHandler}
                  style={{
                    width: "190px",
                  }}
                />
                <Button
                  value={"Распечатать"}
                  onClick={printHandler}
                  style={{
                    width: "190px",
                  }}
                />
              </div>
              {/*               <Button
                value={"Отменить"}
                onClick={cancelHandler}
                style={{
                  width: "190px",
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "solid #000 2px",
                }}
              />

              <Button
                value={"Скачать"}
                onClick={saveHandler}
                style={{
                  width: "190px",
                }}
              />
              <Button
                value={"Распечатать"}
                onClick={printHandler}
                style={{
                  width: "190px",
                }}
              /> */}
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default FormJoinToTradeUnion;
