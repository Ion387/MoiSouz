import { FormProvider, useForm } from "react-hook-form";
import s from "./FormsMaping.module.css";
import { InputUserResolvers } from "../../../0Pages/SiteContent/ContentUser/DocumentsUser/UserForms/UserAnketForm/FormUserAnket/Inputs/InputUser/InputUser";
import { InputArrayResolversAs } from "../FormElements/Base/InputArray";
import { InputAddressResolvers } from "../FormElements/ReusableInputs/InputAddress/InputAddress";
import { InputPhoneResolvers } from "../../../0Pages/SiteContent/ContentUser/DocumentsUser/UserForms/UserAnketForm/FormUserAnket/Inputs/InputPhone/InputPhone";
import { InputChildResolvers } from "../../../0Pages/SiteContent/ContentUser/DocumentsUser/UserForms/UserAnketForm/FormUserAnket/Inputs/InputChild/InputChild";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const FormFormsMaping = ({ defaultValues, onSubmit }) => {
  const schema = yup.object().shape({
    ...InputUserResolvers,
    profession: InputArrayResolversAs(
      yup.string().required("Укажите Профессию"),
    ),
    position: InputArrayResolversAs(yup.string().required("Укажите Должность")),
    address: yup.object().shape(InputAddressResolvers),
    ...InputPhoneResolvers,
    children: InputArrayResolversAs(yup.object().shape(InputChildResolvers)),
    hobbies: yup
      .array()
      .of(yup.string())
      .required("Укажите Увлечения")
      .min(1, "Укажите Увлечения"),
    approval: yup
      .boolean()
      .required("Укажите Согласие")
      .oneOf([true], "Укажите Согласие"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const handleSubmit = () => {};

  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.title}>Анкета профиля</div>

        <div className={s.formBlock}>
          <FormProvider {...methods}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}></form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
export default FormFormsMaping;
