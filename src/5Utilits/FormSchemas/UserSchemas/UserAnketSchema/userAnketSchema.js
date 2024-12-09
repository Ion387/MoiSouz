import { InputArrayResolversAs } from "3Entities/Forms/FormElements/Base/InputArray";
import * as yup from "yup";

export const userAnketSchema = yup.object().shape({
  lastName: yup
    .string()
    .matches(/[а-яА-яёЁ]$/, "Заполнено не верно")
    .required("Не заполнено"),
  firstName: yup
    .string()
    .matches(/[а-яА-яёЁ]$/, "Заполнено не верно")
    .required("Не заполнено"),
  middleName: yup
    .string()
    .matches(/[а-яА-яёЁ]$/, "Заполнено не верно")
    .required("Не заполнено"),
  birthdate: yup.string().required("Укажите Дату рождения"),
  education: yup.string().required("Укажите Образование"),
  gender: yup.string().required("Не заполнено"),
  avatar: yup.mixed().required("Не заполнено"),
  profession: InputArrayResolversAs(yup.string().required("Не заполнено")),
  position: InputArrayResolversAs(yup.string().required("Не заполнено")),
  address: yup.object().shape({
    postcode: yup.string().required("Не заполнено"),
    region: yup.string().required("Не заполнено"),
    area: yup.string().required("Не заполнено"),
    city: yup.string().required("Не заполнено"),
    street: yup.string().required("Не заполнено"),
    house: yup.string().required("Не заполнено"),
    flat: yup.string(),
  }),
  phone: yup.string().required("Не заполнено"),
  phoneDop: yup.string(),
  children: InputArrayResolversAs(
    yup.object().shape({
      childrenName: yup
        .string()
        .matches(/[а-яА-яёЁ]$/, "Заполнено не верно")
        .required("Не заполнено"),
      childrenGender: yup.string().required("Не заполнено"),
      childrenBirthdate: yup.string().required("Не заполнено"),
    }),
  ),
  hobbies: yup
    .array()
    .of(yup.string())
    .required("Не заполнено")
    .min(1, "Не заполнено"),
  approval: yup
    .boolean()
    .required("Укажите Согласие")
    .oneOf([true], "Укажите Согласие"),
});
