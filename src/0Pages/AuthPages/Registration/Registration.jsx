import s from "./Registration.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "3Entities/Forms/FormElements/Base/Button/Button";
import Input from "3Entities/Forms/FormElements/Base/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "2Generics/Loader/Loader";
import { registrationUserTC } from "0Redux/userReducer";
import { registrationSchema } from "5Utilits/FormSchemas/GeneralShemas/registrationSchema";

const Registration = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.loading);
  const schema = registrationSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(
      registrationUserTC(
        data.email,
        data.password,
        data.passwordRepeat,
        navigate,
      ),
    );
  };

  return (
    <div className={s.main}>
      <div className={s.loginBlock}>
        <div className={s.title}>Регистрация</div>

        <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <Input
            lable={"Адрес электронной почты:"}
            {...register("email")}
            errors={errors.email}
            placeholder={"ivanov@mail.ru"}
            disabled={isLoading}
          />

          <Input
            {...register("password")}
            lable={"Придумайте пароль"}
            type={"password"}
            errors={errors.password}
            placeholder={"password"}
            disabled={isLoading}
          />

          <Input
            {...register("passwordRepeat")}
            lable={"Повторите пароль"}
            type={"password"}
            errors={errors.passwordRepeat}
            placeholder={"passwordRepeat"}
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
                  value={"Регистрация"}
                  disabled={isLoading}
                  type="submit"
                  style={{ width: "90%" }}
                />
              )}
              <Loader visible={isLoading} />
            </div>
            <div className={s.underSubmit}>
              <div className={s.textUnderSubmit}>Уже есть аккаунт?</div>
              <Link
                to={isLoading === false && "/signin"}
                className={s.linkUnderSubmit}
              >
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
            {error && <div className={s.error}>{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
