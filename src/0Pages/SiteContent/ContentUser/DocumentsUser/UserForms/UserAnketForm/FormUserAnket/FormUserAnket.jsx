import s from "./FormUserAnket.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "3Entities/Forms/FormElements/Base/Input/Input";
import * as yup from "yup";
import InputUser, { InputUserResolvers } from "./Inputs/InputUser/InputUser";
import InputArray, {
  InputArrayResolversAs,
} from "3Entities/Forms/FormElements/Base/InputArray";
import InputAddress, {
  InputAddressResolvers,
} from "3Entities/Forms/FormElements/ReusableInputs/InputAddress/InputAddress";
import InputPhone, {
  InputPhoneResolvers,
} from "./Inputs/InputPhone/InputPhone";
import InputChild, {
  InputChildResolvers,
} from "./Inputs/InputChild/InputChild";
import InputCheckBox from "3Entities/Forms/FormElements/ReusableInputs/InputCheckBox/InputCheckBox";
import Submit from "3Entities/Forms/FormElements/ReusableInputs/Submit";
import InputSelectorModal from "3Entities/Forms/FormElements/ReusableInputs/InputSelectorModal/InputSelectorModal";
import { userAnketSchema } from "5Utilits/FormSchemas/UserSchemas/UserAnketSchema/userAnketSchema";

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

const FormUserAnket = ({ defaultValues, onSubmit }) => {
  const methods = useForm({
    resolver: yupResolver(userAnketSchema),
    defaultValues,
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
                name="profession"
                label="Специальность по образованию"
                label2="Дополнительная профессия"
                placeholder="Бухгалтер"
                render={({ register, ...props }) => (
                  <Input
                    /*       labelStyle={{ height: "0px" }} */

                    {...props}
                    {...register()}
                  />
                )}
                preadd
              />

              <InputArray
                name="position"
                label="Должность"
                label2="Дополнительная должность"
                placeholder="Главный бухгалтер"
                render={({ register, ...props }) => (
                  <Input type="text" {...props} {...register()} />
                )}
                preadd
              />

              <InputAddress prename="address." lable="Адрес проживания" />

              <InputPhone extra />

              <InputArray
                name="children"
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

export default FormUserAnket;
