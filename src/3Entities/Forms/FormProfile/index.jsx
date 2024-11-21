import s from "./index.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "2Generics/Elements/Input/Input";
import * as yup from "yup";
import InputUser, {
  InputUserResolvers,
} from "3Entities/FormElements/Entity/InputUser";
import InputArray, {
  InputArrayResolversAs,
} from "3Entities/FormElements/Base/InputArray";
import InputAddress, {
  InputAddressResolvers,
} from "3Entities/FormElements/Entity/InputAddress";
import InputPhone, {
  InputPhoneResolvers,
} from "3Entities/FormElements/Entity/InputPhone";
import InputChild, {
  InputChildResolvers,
} from "3Entities/FormElements/Entity/InputChild";
import InputCheckBox from "3Entities/FormElements/Base/InputCheckBox";
import InputSelectorModal from "3Entities/FormElements/Base/InputSelectorModal";
import Submit from "3Entities/FormElements/Base/Submit";

const hobbiesPickArray = [
  "Спорт",
  "Ходьба",
  "Бег",
  "Футбол",
  "Хоккей",
  "Волейбол",
  "Плавание",
  "Бадминтон",
  "Настольный теннис",
  "Большой теннис",
  "Лыжи",
  "Единоборства",
  "Баскетбол",
  "Велоспорт",
  "Спортивное ориентирование",
  "Коньки",
  "Ролики",
];

const Form = ({ onSubmit }) => {
  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        ...InputUserResolvers,
        professions: InputArrayResolversAs(
          yup.string().required("Укажите Профессию"),
        ),
        positions: InputArrayResolversAs(
          yup.string().required("Укажите Должность"),
        ),
        ...InputAddressResolvers,
        ...InputPhoneResolvers,
        childs: InputArrayResolversAs(yup.object().shape(InputChildResolvers)),
        hobbies: yup
          .array()
          .of(yup.string())
          .required("Укажите Увлечения")
          .min(1, "Укажите Увлечения"),
        approval: yup.boolean().required("Укажите Согласие").oneOf([true]),
      }),
    ),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.title}>Анкета профиля</div>

        <div className={s.formBlock}>
          <FormProvider {...methods}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <InputUser />

              <InputArray
                name="professions"
                label="Основная профессия"
                label2="Дополнительная профессия"
                placeholder="Бухгалтер"
                render={({ register, ...props }) => (
                  <Input type="text" {...props} {...register()} />
                )}
                preadd
              />

              <InputArray
                name="positions"
                label="Должность"
                label2="Дополнительная должность"
                placeholder="Главный бухгалтер"
                render={({ register, ...props }) => (
                  <Input type="text" {...props} {...register()} />
                )}
                preadd
              />

              <InputAddress />

              <InputPhone extra />

              <InputArray
                name="childs"
                label="Дети"
                render={({ register, ...props }) => (
                  <InputChild {...props} prename={`${register().name}.`} />
                )}
              />

              <InputSelectorModal
                name="hobbies"
                label="Увлечения"
                placeholder="Выберите из списка"
                data={hobbiesPickArray}
              />

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

export default Form;
