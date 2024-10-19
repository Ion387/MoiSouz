import s from "./LoginPage.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { auth, setProfile } from "0Redux/userReducer";
import Button from "Components/0Generics/Veil/FormElements/Button/Button";
import Input from "Components/0Generics/Veil/FormElements/Input/Input";

const LoginPage = (props) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Введите верный формат почты. Почта должна содержать "@" и "."')
      .required("Email is required please !"),
    password: yup
      .string()
      .min(
        5,
        "Пароль должен содержать не менее 8 символов. В нём должны быть заглавные и строчные буквы, цифры, пробелы и специальные символы"
      )
      .required("Password is required please !"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    props.authThunkUserTC(data.email, data.password);
  };
  let myTest = register("email");
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.loginBlock}>
          <div className={s.title}>Вход</div>

          <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.formTitles}>Адрес электронной почты:</div>
            {/*            <Input placeholder={"ivanov@mail.ru"} {...myTest} />
             */}
            <input
              className={s.input}
              placeholder={"ivanov@mail.ru"}
              {...register("email")}
            />

            <div className={s.flexTitles}>
              <div className={s.formTitles}>Пароль</div>
              <div className={s.formTitles}>Забыли пароль?</div>
            </div>

            <input
              className={s.input}
              type="password"
              placeholder={"password"}
              {...register("password")}
            />
            <div className={s.checkboxBlock}>
              <input
                className={s.checkbox}
                type={"checkbox"}
                {...register("rememberMe")}
              />{" "}
              <div className={s.checkboxText}>Запомнить пароль</div>
            </div>
            {/*   {errors.email && <span>почта</span>} */}

            <div className={s.submitBlock}>
              <div className={s.submit}>
                <Button value={"Войти"} />
              </div>

              <div className={s.underSubmit}>
                <div className={s.textUnderSubmit}>Ещё нет аккаунта?</div>
                <a href="#" className={s.linkUnderSubmit}>
                  Регистрация
                </a>
              </div>
              {errors.password && (
                <div className={s.error}>{errors.password.message}</div>
              )}
              {errors.email && (
                <div className={s.error}>{errors.email.message}</div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
