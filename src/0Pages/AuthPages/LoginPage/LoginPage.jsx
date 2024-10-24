import s from "./LoginPage.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { auth, setProfile } from "0Redux/userReducer";
import Button from "2Generics/FormElements/Button/Button";
import Input from "2Generics/FormElements/Input/Input";
import { NavLink, useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  console.log(props.authUserTC);
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

  const { onChange, onBlur, name, ref } = register("email");
  const navigate = useNavigate();
  const onSubmit = (data) => {
    props.authUserTC(data.email, data.password, navigate);
  };
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.loginBlock}>
          <div className={s.title}>Вход</div>

          <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.formTitles}>Адрес электронной почты:</div>
            <Input
              {...register("email")}
              errors={errors.email}
              placeholder={"ivanov@mail.ru"}
            />

            <div className={s.flexTitles}>
              <div className={s.formTitles}>Пароль</div>
              <div className={s.formTitles}>Забыли пароль?</div>
            </div>

            <Input
              {...register("password")}
              type={"password"}
              errors={errors.password}
              placeholder={"password"}
            />

            {/*             <input
              className={
                !errors.password ? s.input : `${s.input} ${s.errorInput}`
              }
              type="password"
              placeholder={"password"}
              {...register("password")}
            /> */}

            <div className={s.checkboxBlock}>
              <input
                className={s.checkbox}
                type={"checkbox"}
                {...register("rememberMe")}
              />{" "}
              <div className={s.checkboxText}>Запомнить пароль</div>
            </div>
            <div className={s.submitBlock}>
              <div className={s.submit}>
                <Button value={"Войти"} />
              </div>

              <div className={s.underSubmit}>
                <div className={s.textUnderSubmit}>Ещё нет аккаунта?</div>
                <NavLink to="/registration" className={s.linkUnderSubmit}>
                  Регистрация
                </NavLink>
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
