import s from "./Registration.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { auth, setProfile } from "0Redux/userReducer";
import Button from "2Generics/FormElements/Button/Button";
import Input from "2Generics/FormElements/Input/Input";
import { NavLink } from "react-router-dom";

const Registration = (props) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Введите верный формат почты. Почта должна содержать "@" и "."')
      .required("Введите вашу почту"),
    name: yup.string().matches(/[А-Я]/).required("Заполните красные поля"),
    surname: yup
      .string()
      .matches(/[А-Я]/)
      .required("Поле обязаительно для заполнения"),
    patronymic: yup
      .string()
      .matches(/[А-Я]/)
      .required("Поле обязаительно для заполнения"),
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

  const onSubmit = (data) => {};
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.loginBlock}>
          <div className={s.title}>Регистрация</div>

          <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.formTitles}>Адрес электронной почты:</div>

            {/*            <input
              className={!errors.email ? s.input : `${s.input} ${s.errorInput}`}
              placeholder={"ivanov@mail.ru"}
              {...register("email")}
            /> */}

            <Input
              {...register("email")}
              errors={errors.email}
              placeholder={"ivanov@mail.ru"}
            />

            <div className={s.formTitles}>Имя</div>

            <Input
              {...register("name")}
              errors={errors.name}
              placeholder={"Иван"}
            />

            <div className={s.formTitles}>Фамилия</div>

            <Input
              {...register("surname")}
              errors={errors.surname}
              placeholder={"Иванов"}
            />

            <div className={s.formTitles}>Отчество</div>

            <Input
              {...register("patronymic")}
              errors={errors.patronymic}
              placeholder={"Иванович"}
            />

            <div className={s.flexTitles}>
              <div className={s.formTitles}>Придумайте пароль</div>
            </div>

            <Input
              {...register("password")}
              errors={errors.password}
              placeholder={"password"}
            />

            <div className={s.flexTitles}>
              <div className={s.formTitles}>Повторите пароль</div>
            </div>

            <Input
              {...register("password")}
              errors={errors.password}
              placeholder={"password"}
            />

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
                <div className={s.textUnderSubmit}>Уже есть аккаунт?</div>
                <NavLink to="/" className={s.linkUnderSubmit}>
                  Войти
                </NavLink>
              </div>
              {(errors.email ||
                errors.name ||
                errors.surname ||
                errors.patronymic) && (
                <div className={s.error}>{"Поле заполнено неверно"}</div>
              )}
              {errors.password && (
                <div className={s.error}>{errors.password.message}</div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
