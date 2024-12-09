import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Введите верный формат почты. Почта должна содержать "@" и "."')
    .required("Не заполнено"),
  password: yup
    .string()
    .min(
      5,
      "Пароль должен содержать не менее 8 символов. В нём должны быть заглавные и строчные буквы, цифры, пробелы и специальные символы",
    )
    .required("Password is required please !"),
});
