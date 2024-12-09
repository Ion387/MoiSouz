import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Введите верный формат почты. Почта должна содержать "@" и "."')
    .required("Введите вашу почту"),
  password: yup
    .string()
    .min(5, "Пароль должен содержать не менее 5 символов.")
    .required("Укажите пароль"),
  passwordRepeat: yup
    .string()
    .min(5, "Пароль должен содержать не менее 5 символов.")
    .required("Укажите пароль"),
});
