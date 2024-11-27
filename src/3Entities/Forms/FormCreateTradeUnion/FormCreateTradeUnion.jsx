import s from "./FormCreateTradeUnion.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputUserResolvers } from "3Entities/Forms/FormElements/Entity/InputUser/InputUser";
import { InputArrayResolversAs } from "3Entities/Forms/FormElements/Base/InputArray";
import { InputAddressResolvers } from "3Entities/Forms/FormElements/Entity/InputAddress/InputAddress";
import { InputPhoneResolvers } from "3Entities/Forms/FormElements/Entity/InputPhone/InputPhone";
import { InputChildResolvers } from "3Entities/Forms/FormElements/Entity/InputChild/InputChild";
import InputCheckBox from "3Entities/Forms/FormElements/Base/InputCheckBox";
import Submit from "3Entities/Forms/FormElements/Base/Submit";
import InputTradeUnionHeader from "../FormElements/Entity/InputTradeUnionHeader/InputTradeUnionHeader";
import InputTradeUnionBody from "../FormElements/Entity/InputTradeUnionBody/InputTradeUnionBody";

const FormCreateTradeUnion = ({ defaultValues, onSubmit }) => {
  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        ...InputUserResolvers,
        profession: InputArrayResolversAs(
          yup.string().required("Укажите Профессию"),
        ),
        position: InputArrayResolversAs(
          yup.string().required("Укажите Должность"),
        ),
        address: yup.object().shape(InputAddressResolvers),
        ...InputPhoneResolvers,
        children: InputArrayResolversAs(
          yup.object().shape(InputChildResolvers),
        ),
        hobbies: yup
          .array()
          .of(yup.string())
          .required("Укажите Увлечения")
          .min(1, "Укажите Увлечения"),
        approval: yup
          .boolean()
          .required("Укажите Согласие")
          .oneOf([true], "Укажите Согласие"),
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
        <div className={s.title}>Регистрация профсоюза</div>

        <div className={s.formBlock}>
          <FormProvider {...methods}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <InputTradeUnionHeader />
              <InputTradeUnionBody />

              <InputCheckBox
                name="approval"
                label="Я соглашаюсь на обработку персональных данных Согласие с политикой обработки персональных данных"
              />

              <Submit errors={errors} />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default FormCreateTradeUnion;
