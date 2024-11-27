import s from "./FormAddToTradeUnion.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "2Generics/Elements/Input/Input";
import * as yup from "yup";
import InputUser, {
  InputUserResolvers,
} from "3Entities/Forms/FormElements/Entity/InputUser/InputUser";
import InputArray, {
  InputArrayResolversAs,
} from "3Entities/Forms/FormElements/Base/InputArray";
import InputAddress, {
  InputAddressResolvers,
} from "3Entities/Forms/FormElements/Entity/InputAddress/InputAddress";
import InputPhone, {
  InputPhoneResolvers,
} from "3Entities/Forms/FormElements/Entity/InputPhone/InputPhone";
import InputChild, {
  InputChildResolvers,
} from "3Entities/Forms/FormElements/Entity/InputChild/InputChild";
import InputCheckBox from "3Entities/Forms/FormElements/Base/InputCheckBox";
import InputSelectorModal from "3Entities/Forms/FormElements/Base/InputSelectorModal";
import Submit from "3Entities/Forms/FormElements/Base/Submit";
import Selector from "2Generics/Elements/Selector/Selector";
import InputAddToTradeUnion from "../FormElements/Entity/InputAddToTradeUnion/InputAddToTradeUnion";

const hobbiesPickArray = [
  { value: "Спорт", label: "Спорт" },
  { value: "Ходьба", label: "Ходьба" },
  { value: "Бег", label: "Бег" },
  { value: "Футбол", label: "Футбол" },
  { value: "Хоккей", label: "Хоккей" },
  { value: "Волейбол", label: "Волейбол" },
  { value: "Плавание", label: "Плавание" },
  { value: "Бадминтон", label: "Бадминтон" },
  { value: "Настольный теннис", label: "Настольный теннис" },
  { value: "Большой теннис", label: "Большой теннис" },
  { value: "Лыжи", label: "Лыжи" },
  { value: "Единоборства", label: "Единоборства" },
  { value: "Баскетбол", label: "Баскетбол" },
  { value: "Велоспорт", label: "Велоспорт" },
  { value: "Спортивное ориентирование", label: "Спортивное ориентирование" },
  { value: "Коньки", label: "Коньки" },
  { value: "Ролики", label: "Ролики" },
];

const FormAddToTradeUnion = ({ defaultValues, onSubmit }) => {
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
        <div className={s.title}>Вступить в профсоюз</div>
        <div className={s.formBlock}>
          <FormProvider {...methods}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <InputAddToTradeUnion />

              <InputCheckBox
                name="approval"
                label="Я соглашаюсь на обработку персональных данных Согласие с политикой обработки персональных данных"
              />

              <Submit errors={errors} value="Вступить" />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default FormAddToTradeUnion;
