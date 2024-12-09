import s from "./LoginPage.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "3Entities/Forms/FormElements/Base/Button/Button";
import Input from "3Entities/Forms/FormElements/Base/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "2Generics/Loader/Loader";
import { authUserTC } from "0Redux/userReducer";
import { loginSchema } from "5Utilits/FormSchemas/GeneralShemas/loginSchema";

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.loading);
  const schema = loginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log("223123");
    await dispatch(authUserTC(data.email, data.password, navigate));
  };

  return (
    <div className={s.main}>
      <div className={s.loginBlock}>
        <div className={s.title}>Вход</div>

        <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
          {/*             <div className={s.formTitles}>Адрес электронной почты:</div> */}
          <Input
            {...register("email")}
            lable={"Адрес электронной почты:"}
            errors={errors.email}
            placeholder={"ivanov@mail.ru"}
            disabled={isLoading}
          />

          <Input
            {...register("password")}
            lable={"Пароль"}
            lable2={"Забыли пароль?"}
            type={"password"}
            errors={errors.password}
            placeholder={"password"}
            disabled={isLoading}
          />

          <div className={s.checkboxBlock}>
            <input
              className={s.checkbox}
              type={"checkbox"}
              disabled={isLoading}
              {...register("rememberMe")}
            />{" "}
            <div className={s.checkboxText}>Запомнить пароль</div>
          </div>
          <div className={s.submitBlock}>
            <div className={s.submit}>
              {isLoading !== true && (
                <Button
                  value={"Войти"}
                  type={"submit"}
                  disabled={isLoading}
                  style={{ width: "90%" }}
                />
              )}
              <Loader visible={isLoading} />
            </div>

            <div className={s.underSubmit}>
              <div className={s.textUnderSubmit}>Ещё нет аккаунта?</div>
              <Link
                to={isLoading === false && "/registration"}
                className={s.linkUnderSubmit}
              >
                Регистрация
              </Link>
            </div>
            {/*             {errors.password && (
              <div className={s.error}>{errors.password.message}</div>
            )}
            {errors.email && (
              <div className={s.error}>{errors.email.message}</div>
            )} */}
            {error && <div className={s.error}>{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
