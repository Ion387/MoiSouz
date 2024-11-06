import s from "./Registration.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "2Generics/FormElements/Button/Button";
import Input from "2Generics/FormElements/Input/Input";
import { Link, useNavigate } from "react-router-dom";

const Registration = (props) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Введите верный формат почты. Почта должна содержать "@" и "."')
      .required("Введите вашу почту"),
    /*     firstName: yup.string().matches(/[А-Я]/).required("Заполните красные поля"), */
    /*     lastName: yup
      .string()
      .matches(/[А-Я]/)
      .required("Поле обязаительно для заполнения"), */
    /*     secondName: yup
      .string()
      .matches(/[А-Я]/)
      .required("Поле обязаительно для заполнения"), */
    password: yup
      .string()
      .min(
        5,
        "Пароль должен содержать не менее 8 символов. В нём должны быть заглавные и строчные буквы, цифры, пробелы и специальные символы"
      )
      .required("Password is required please !"),
    passwordRepeat: yup
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

  const navigate = useNavigate();
  const onSubmit = (data) => {
    props.registrationUserTC(
      data.email,
      data.password,
      data.passwordRepeat,
      /*       data.lastName,
      data.firstName,
      data.secondName, */
      navigate
    );
    /*     navigate("/"); */
  };

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

            {/*  <div className={s.formTitles}>Имя</div>

            <Input
              {...register("firstName")}
              errors={errors.firstName}
              placeholder={"Иван"}
            />

            <div className={s.formTitles}>Фамилия</div>

            <Input
              {...register("lastName")}
              errors={errors.lastName}
              placeholder={"Иванов"}
            />

            <div className={s.formTitles}>Отчество</div>

            <Input
              {...register("secondName")}
              errors={errors.secondName}
              placeholder={"Иванович"}
            /> */}

            <div className={s.flexTitles}>
              <div className={s.formTitles}>Придумайте пароль</div>
            </div>

            <Input
              {...register("password")}
              type={"password"}
              errors={errors.password}
              placeholder={"password"}
            />

            <div className={s.flexTitles}>
              <div className={s.formTitles}>Повторите пароль</div>
            </div>

            <Input
              {...register("passwordRepeat")}
              type={"password"}
              errors={errors.passwordRepeat}
              placeholder={"passwordRepeat"}
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
                <Button value={"Регистрация"} />
              </div>
              <div className={s.underSubmit}>
                <div className={s.textUnderSubmit}>Уже есть аккаунт?</div>
                <Link to="/" className={s.linkUnderSubmit}>
                  Войти
                </Link>
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
