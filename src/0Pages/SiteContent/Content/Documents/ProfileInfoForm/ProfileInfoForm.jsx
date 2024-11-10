import s from "./ProfileInfoForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "2Generics/FormElements/Button/Button";
import Input from "2Generics/FormElements/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";

const ProfileInfoForm = (props) => {
  const formInfo = [
    {
      register: "secondName",
      lable: "Фамилия" /* , errors:'Иванов' */,
      placeholder: "Иванов",
    },
  ];

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Введите верный формат почты. Почта должна содержать "@" и "."')
      .required("Введите вашу почту"),
    firstName: yup.string().matches(/[А-Я]/).required("Заполните красные поля"),
    lastName: yup
      .string()
      .matches(/[А-Я]/)
      .required("Поле обязаительно для заполнения"),
    secondName: yup
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

  /*  
//try to make InputFormList

const input = (registerInput, lableInput, placeholderInput) => {
    return (
      <Input
        {...register(registerInput)}
        lable={lableInput}
        placeholder={placeholderInput}
        style={{ width: "100%" }}
      />
    );
  };

  const formList = formInfo.map((i) => {
    <>
      input(i.register, i.lable, i.placeholder)
      {i.firstButtonInline && (
        <div style={{ display: "inline" }}>
          input(i.register,i.lable,i.errors,i.placeholder)
        </div>
      )}
      {i.seccondButtonInline && (
        <div style={{ marginLeft: "20px" }}>
          input(i.register,i.lable,i.errors,i.placeholder)
        </div>
      )}
    </>;
  }); */

  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.title}>Анкета профиля</div>
        <div className={s.formBlock}>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("secondName")}
              lable={"Фамилия"}
              lable2={false}
              style={{ width: "100%" }}
              errors={errors.email}
              placeholder={"Иванов"}
            />

            <Input
              {...register("firstName")}
              lable={"Имя"}
              lable2={false}
              style={{ width: "100%" }}
              errors={errors.firstName}
              placeholder={"Иван"}
            />

            <Input
              {...register("lastName")}
              lable={"Отчество"}
              lable2={false}
              style={{ width: "100%" }}
              errors={errors.secondName}
              placeholder={"Иванович"}
            />

            <div className={s.gridBirthDataEducation}>
              <Input
                {...register("birthData")}
                lable={"Дата рождения"}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.secondName}
                placeholder={"19.08.1980"}
              />

              <Input
                {...register("education")}
                lable={"Образование"}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.secondName}
                placeholder={"Высшее"}
              />
            </div>

            <Input
              {...register("profession")}
              lable={"Основная профессия"}
              lable2={<Icon iconName={"signUpIcon"} />}
              style={{ width: "100%" }}
              errors={errors.secondName}
              placeholder={"Бухгалтер"}
            />

            <Input
              {...register("aditionalProfession")}
              lable={"Дополнительная профессия"}
              lable2={<Icon iconName={"signDownIcon"} />}
              style={{ width: "100%" }}
              errors={errors.secondName}
              placeholder={"Главный бухгалтер"}
            />

            <Input
              {...register("post")}
              lable={"Должность"}
              lable2={<Icon iconName={"signUpIcon"} />}
              style={{ width: "100%" }}
              errors={errors.secondName}
              placeholder={"Бухгалтер"}
            />
            <div className={s.gridAdressIndexAdressRegion}>
              <Input
                {...register("adressIndex")}
                lable={"Адрес проживания"}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.secondName}
                placeholder={"Индекс"}
              />
              <Input
                {...register("adressRegion")}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.secondName}
                placeholder={"Регион"}
              />
            </div>

            <div className={s.gridAdressMunicipalityAdressCity}>
              <Input
                {...register("adressMunicipality")}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.secondName}
                placeholder={"Муниципальное образование"}
                lableStyle={{ height: "0px" }}
              />
              <Input
                {...register("adressCity")}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.secondName}
                placeholder={"Населенный пункт"}
                lableStyle={{ height: "0px" }}
              />
            </div>

            <div className={s.gridStreetHouseFlat}>
              <Input
                {...register("adressStreet")}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.secondName}
                placeholder={"Улица"}
                lableStyle={{ height: "0px" }}
              />
              <Input
                {...register("adressHouse")}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.secondName}
                placeholder={"Дом/Здание"}
                lableStyle={{ height: "0px" }}
              />
              <Input
                {...register("adressFlat")}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.secondName}
                placeholder={"Квартира"}
                lableStyle={{ height: "0px" }}
              />
            </div>

            <div className={s.gridTelAditionTel}>
              <Input
                {...register("telNumber")}
                lable={"Номер телефона"}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.secondName}
                placeholder={"+7 999 999 88 70"}
              />

              <Input
                {...register("aditionalTelNumber")}
                lable={"Доп. номер"}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.secondName}
                placeholder={"+7 999 999 88 70"}
              />
            </div>
            <div className={s.childrenLableFlex}>
              <div className={s.lableChildren}>Дети</div>
              <Icon iconName={"signUpIcon"} />
            </div>

            <div className={s.gridChildrens}>
              <Input
                {...register("childrensName")}
                style={{ width: "100%" }}
                errors={errors.secondName}
                placeholder={"Имя"}
                lableStyle={{ height: "0px" }}
              />
              <Input
                {...register("childrensSex")}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.secondName}
                placeholder={"Пол"}
                lableStyle={{ height: "0px" }}
              />
              <Input
                {...register("childrensBirthData")}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.secondName}
                placeholder={"Дата рождения"}
                lableStyle={{ height: "0px" }}
              />
            </div>

            <Input
              {...register("hobby")}
              lable={"Увлечения"}
              lable2={false}
              style={{ width: "100%" }}
              errors={errors.secondName}
              placeholder={"Выберите из списка"}
            />

            <div className={s.checkboxBlock}>
              <input
                className={s.checkbox}
                type={"checkbox"}
                {...register("rememberMe")}
              />{" "}
              <div className={s.checkboxText}>Запомнить</div>
            </div>

            <div className={s.submitBlock}>
              <div className={s.gridButton}>
                <div className={s.submit}>
                  <Button value={"Отменить"} style={{ width: "180px" }} />
                </div>
                <div className={s.submit}>
                  <Button value={"Сохранить"} style={{ width: "180px" }} />
                </div>
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

export default ProfileInfoForm;
