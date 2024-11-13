import s from "./ProfileInfoForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "2Generics/FormElements/Button/Button";
import Input from "2Generics/FormElements/Input/Input";
import { useNavigate } from "react-router-dom";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import { useEffect, useState } from "react";
import { profileInfoSchema } from "5Utilits/FormSchemas/ProfileInfoSchema";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { onProfileInfoFormTC } from "0Redux/userReducer";
import { MyCalendar } from "3Entities/Calendar/Calendar";

const ProfileInfoForm = (props) => {
  /*   const [professionQuantity, setProfessionQuantity] = useState(1);

  const [childrenQuantity, setChildrenQuantity] = useState(1);

  const onClickaditionalProfession = () => {
    setAditionalProfessionQuantity(aditionalProfessionQuantity - 1);
  }; */

  const [birthdate, setBirthDate] = useState("");
  const [isCalendarPicked, setIsCalendarPicked] = useState(false);
  const [aditionalProfessionQuantity, setAditionalProfessionQuantity] =
    useState(1);

  useEffect(() => {
    setIsCalendarPicked("false");
  }, [birthdate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(profileInfoSchema) });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    /*     const datta = {
      secondName: "Antonov",
      firstName: "Anton",
      lastName: "Antonovich",
      gender: "male",
      birthdate: "1989-12-03",
      education: "Высшее",
      profession: "Бухгалтер",
      position: "Бухгалтер",
      postcode: "143400",
      region: "data.region",
      area: "Красногорский район",
      city: "Красногорск",
      street: "Комсомольская",
      house: "6 корпус 1",
      flat: "289",
      phone: "+71234567890",
      phoneDop: "+71234567890",
      childrenName: "Вероника",
      childrenGender: "female",
      childrenBirthdate: "2010-05-12",
      hobbies: "Ролики",
    }; */
    dispatch(onProfileInfoFormTC(data, navigate));
  };

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
              errors={errors.secondName}
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
              errors={errors.lastName}
              placeholder={"Иванович"}
            />
            <div className={s.gridBirthDataEducation}>
              <div onClick={() => setIsCalendarPicked("true")}>
                <Input
                  {...register("birthdate")}
                  lable={"Дата рождения"}
                  lable2={false}
                  style={{ width: "100%" }}
                  /*  errors={errors.secondName} */
                  placeholder={"1980-05-08"}
                  /*  errors={errors.birthdate} */
                  value={birthdate}
                />
              </div>

              {isCalendarPicked === "true" && (
                <MyCalendar
                  setIsCalendarPicked={setIsCalendarPicked}
                  setDate={setBirthDate}
                  isCalendarPicked={isCalendarPicked}
                />
              )}

              <Input
                {...register("education")}
                lable={"Образование"}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.education}
                placeholder={"Высшее"}
              />
            </div>
            <Input
              {...register("profession")}
              lable={"Основная профессия"}
              lable2={<Icon iconName={"signUpIcon"} />}
              style={{ width: "100%" }}
              errors={errors.profession}
              placeholder={"Бухгалтер"}
            />
            <Input
              {...register("position")}
              lable={"Должность"}
              lable2={<Icon iconName={"signUpIcon"} />}
              style={{ width: "100%" }}
              errors={errors.position}
              placeholder={"Бухгалтер"}
            />
            <div className={s.gridAdressIndexAdressRegion}>
              <Input
                {...register("postcode")}
                lable={"Адрес проживания"}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.postcode}
                placeholder={"Индекс"}
              />
              <Input
                {...register("region")}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.region}
                placeholder={"Регион"}
              />
            </div>
            <div className={s.gridAdressMunicipalityAdressCity}>
              <Input
                {...register("area")}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.area}
                placeholder={"Муниципальное образование"}
                lableStyle={{ height: "0px" }}
              />
              <Input
                {...register("city")}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.city}
                placeholder={"Населенный пункт"}
                lableStyle={{ height: "0px" }}
              />
            </div>
            <div className={s.gridStreetHouseFlat}>
              <Input
                {...register("street")}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.street}
                placeholder={"Улица"}
                lableStyle={{ height: "0px" }}
              />
              <Input
                {...register("house")}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.house}
                placeholder={"Дом/Здание"}
                lableStyle={{ height: "0px" }}
              />
              <Input
                {...register("flat")}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.flat}
                placeholder={"Квартира"}
                lableStyle={{ height: "0px" }}
              />
            </div>
            <div className={s.gridTelAditionTel}>
              <Input
                {...register("phone")}
                lable={"Номер телефона"}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.phone}
                placeholder={"+7 999 999 88 70"}
              />

              <Input
                {...register("phoneDop")}
                lable={"Доп. номер"}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.phoneDop}
                placeholder={"+7 999 999 88 70"}
              />
            </div>
            <div className={s.childrenRelative}>
              <div className={s.childrenLableFlex}>
                <div className={s.lableChildren}>Дети</div>

                <Icon iconName={"signUpIcon"} />
              </div>
            </div>
            <div className={s.gridChildrens}>
              <Input
                {...register("childrenName")}
                style={{ width: "100%" }}
                errors={errors.childrenName}
                placeholder={"Имя"}
                lableStyle={{ height: "0px" }}
              />

              <Input
                {...register("childrenGender")}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.childrenGender}
                placeholder={"Пол"}
                lableStyle={{ height: "0px" }}
              />

              <Input
                {...register("childrenBirthdate")}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.childrenBirthdate}
                placeholder={"Дата рождения"}
                lableStyle={{ height: "0px" }}
              />
            </div>
            <Input
              {...register("hobbies")}
              lable={"Увлечения"}
              lable2={false}
              style={{ width: "100%" }}
              errors={errors.hobbies}
              placeholder={"Выберите из списка"}
            />
            <div className={s.checkboxBlock}>
              <input
                className={s.checkbox}
                type={"checkbox"}
                {...register("rememberMe")}
              />{" "}
              <div className={s.checkboxText}>
                Я соглашаюсь на обработку персональных данных Согласие с
                политикой обработки персональных данных
              </div>
            </div>
            <div className={s.submitBlock}>
              <div className={s.gridButton}>
                <Button value={"Отменить"} style={{ width: "180px" }} />
                <Button value={"Сохранить"} style={{ width: "180px" }} />
              </div>

              {(errors.email ||
                errors.name ||
                errors.surname ||
                errors.patronymic) && (
                <div className={s.error}>{errors.email.message}</div>
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
