import s from "./ProfileInfoForm.module.css";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "2Generics/FormElements/Button/Button";
import Input from "2Generics/FormElements/Input/Input";
import { useNavigate } from "react-router-dom";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import { useEffect, useState } from "react";
import { profileInfoSchema } from "5Utilits/FormSchemas/ProfileInfoSchema";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { onProfileInfoFormTC, postAvatarUserTC } from "0Redux/userReducer";
import ModalChoicePicker from "3Entities/ModalChoicePicker/ModalChoicePicker";
import Selector from "2Generics/FormElements/Selector/Selector";
import DatePicker from "2Generics/FormElements/DatePicker/DatePicker";
import InputArray from "2Generics/FormElements/InputArray/InputArray";
import InputArray3 from "2Generics/FormElements/InputArray3/InputArray3";

const ProfileInfoForm = (props) => {
  const educationSelect = [
    "Высшее",
    "Среднее профессиональное",
    "Среднее общее образование",
    "Основное общее образование",
  ];

  const childrenGenderSelect = ["Мужской", "Женский"];

  const genderSelect = ["Мужской", "Женский"];

  const hobbiesPickArray = [
    "Спорт",
    "Ходьба",
    "Бег",
    "Футбол",
    "Хоккей",
    "Волейбол",
    "Плавание",
    "Бадминтон",
    "Настольный теннис",
    "Большой теннис",
    "Лыжи",
    "Единоборства",
    "Баскетбол",
    "Велоспорт",
    "Спортивное ориентирование",
    "Коньки",
    "Ролики",
  ];
  const [choicePickedHobby, setChoicePickedHobby] = useState(
    hobbiesPickArray.map((i) => null)
  );
  //avatar
  const [avatarPreview, setAvatarPreview] = useState(null);
  //selects
  const [isEducationClicked, setIsEducationClicked] = useState(false);
  const [isGenderClicked, setIsGenderClicked] = useState(false);
  const [isChildrenGenderClicked, setIsChildrenGenderClicked] = useState([]);
  //calendar
  const [isBirthdayCalendarOpen, setIsBirthdayCalendarOpen] = useState(false);
  const [birthdate, setBirthdate] = useState("");
  const [childrenBirthdate, setChildrenBirthdate] = useState([""]);
  const [isChildrenCalendarOpen, setIsChildrenCalendarOpen] = useState([false]);
  //modal
  const [isChoiceHobbyPicked, setIsChoiceHobbyPicked] = useState(false);
  const [isHobbiesSubmited, setIsHobbiesSubmited] = useState(false);
  const [hobbyPickedShow, setHobbyPickedShow] = useState();

  useEffect(() => {
    setIsChoiceHobbyPicked(false);
    setHobbyPickedShow(() => {
      let hobbiesShow = "";
      for (let i = 0; i <= choicePickedHobby.length; i += 1) {
        if (choicePickedHobby[i]) {
          hobbiesShow = hobbiesShow + choicePickedHobby[i] + ", ";
        }
      }
      hobbiesShow = hobbiesShow.slice(0, -2);
      return hobbiesShow;
    });
  }, [isHobbiesSubmited]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(profileInfoSchema) });

  //Prevyu image
  const previewAvatarHandler = (e) => {
    const file = e.target.files[0];
    console.log(file);

    const urlImage = URL.createObjectURL(file);
    const formData = new FormData();
    formData.append("avatar", file);
    setAvatarPreview(urlImage);
    dispatch(postAvatarUserTC(formData));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const rigntPickedHobby = choicePickedHobby.map((i) => i && i);
    const rightData = {
      ...data,
      birthdate: birthdate,
      hobbies: rigntPickedHobby,
    };
    dispatch(onProfileInfoFormTC(rightData, navigate));
  };
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.title}>Анкета профиля</div>

        <div className={s.formBlock}>
          {/*   test */}

          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.nameAvatarGrid}>
              <Input
                {...register("secondName")}
                lable={"Фамилия"}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.secondName}
                placeholder={"Иванов"}
              />

              <label className={s.inputAvatarBlock}>
                <input
                  onChange={previewAvatarHandler}
                  className={s.inputAvatar}
                  id="image-file"
                  type="file"
                  /*   {...register("userAvatar")}  */
                />
                {avatarPreview ? (
                  <div className={s.avaterPreview}>
                    <img src={avatarPreview} className={s.avaterPreview} />
                  </div>
                ) : (
                  <div className={s.inputLableBlock}>
                    <div className={s.inputAvatarText}>
                      Добавить
                      <br />
                      фото
                    </div>
                    <div className={s.addAvatarIcon}>
                      <Icon iconName="addSomethingIcon" />
                    </div>
                  </div>
                )}
              </label>

              <Input
                {...register("firstName")}
                lable={"Имя"}
                lable2={false}
                style={{ width: "100%" }}
                errors={errors.firstName}
                placeholder={"Иван"}
              />
            </div>
            <Input
              {...register("lastName")}
              lable={"Отчество"}
              lable2={false}
              style={{ width: "100%" }}
              errors={errors.lastName}
              placeholder={"Иванович"}
            />
            <div className={s.gridBirthDataEducationGender}>
              <DatePicker
                setIsCalendarOpen={setIsBirthdayCalendarOpen}
                setDate={setBirthdate}
                {...register("birthdate")}
                lable={"Дата рождения"}
                placeholder={"1980-05-08"}
                value={birthdate}
                isCalendarOpen={isBirthdayCalendarOpen}
              />

              <div onClick={() => setIsEducationClicked(true)}>
                <Selector
                  {...register("education")}
                  optionValue={educationSelect}
                  placeholder={"Высшее"}
                  errors={errors.education}
                  lable={"Образование"}
                  style={
                    !isEducationClicked ? { color: "rgb(166, 166, 166)" } : {}
                  }
                />
              </div>

              <div onClick={() => setIsGenderClicked(true)}>
                <Selector
                  {...register("gender")}
                  optionValue={genderSelect}
                  errors={errors.gender}
                  placeholder={"Мужской"}
                  lable={"Пол"}
                  style={
                    !isGenderClicked ? { color: "rgb(166, 166, 166)" } : {}
                  }
                />
              </div>
            </div>

            <InputArray
              {...register("profession")}
              lable={"Основная профессия"}
              lable2={"Дополнительная профессия"}
              errors={errors.profession}
              placeholder={"Бухгалтер"}
            />

            <InputArray
              {...register("position")}
              lable={"Должность"}
              lable2={"Дополнительная должность"}
              errors={errors.position}
              placeholder={"Главный бухгалтер"}
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

            <InputArray3
              {...register("childrenName")}
              {...register("childrenGender")}
              {...register("childrenBirthdate")}
              style={{ width: "100%" }}
              /*  errors={errors.childrenName} */
              placeholder={"Имя"}
              lable={"Дети"}
              setIsChildrenGenderClicked={setIsChildrenGenderClicked}
              childrenGenderSelect={childrenGenderSelect}
              isChildrenGenderClicked={isChildrenGenderClicked}
              childrenBirthdate={childrenBirthdate}
              isChildrenCalendarOpen={isChildrenCalendarOpen}
              setIsChildrenCalendarOpen={setIsChildrenCalendarOpen}
              setChildrenBirthdate={setChildrenBirthdate}
            />

            {/*           <div className={s.childrenRelative}>
              <div className={s.childrenLableFlex}>
                <div className={s.lableChildren}>Дети</div>

                <Icon iconName={"addInputIcon"} />
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
              <div onClick={() => setIsChildrenGenderClicked(true)}>
                <Selector
                  {...register("childrenGender")}
                  optionValue={childrenGenderSelect}
                  placeholder={"Пол"}
                  errors={errors.childrenGender}
                  lableStyle={{ height: "0px" }}
                  style={
                    !isChildrenGenderClicked
                      ? { color: "rgb(166, 166, 166)" }
                      : {}
                  }
                />
              </div>
              <DatePicker
                value={childrenBirthdate}
                isCalendarOpen={isChildrenCalendarOpen}
                setIsCalendarOpen={setIsChildrenCalendarOpen}
                setDate={setChildrenBirthdate}
                {...register("childrenBirthdate")}
                placeholder={"Дата рождения"}
                lableStyle={{ height: "0px" }}
              />
            </div> */}

            <div
              className={s.choiceHobbies}
              onClick={() => setIsChoiceHobbyPicked(true)}
            >
              <Input
                {...register("hobbies")}
                lable={"Увлечения"}
                lable2={false}
                value={hobbyPickedShow}
                style={{ width: "100%", cursor: "pointer" }}
                errors={errors.hobbies}
                placeholder={"Выберите из списка"}
              />
              {isChoiceHobbyPicked && (
                <ModalChoicePicker
                  lableArray={hobbiesPickArray}
                  choice={choicePickedHobby}
                  setChoice={setChoicePickedHobby}
                  submit={setIsHobbiesSubmited}
                  cancel={setIsHobbiesSubmited}
                />
              )}
            </div>

            <div className={s.checkboxBlock}>
              <input
                className={s.checkbox}
                type={"checkbox"}
                {...register("rememberMe")}
              />
              <div className={s.checkboxText}>
                Я соглашаюсь на обработку персональных данных Согласие с
                политикой обработки персональных данных
              </div>
            </div>
            <div className={s.submitBlock}>
              <div className={s.gridButton}>
                <Button
                  setIsChoiceHobbyPicked
                  value={"Отменить"}
                  style={{ width: "180px" }}
                  type={"button"}
                />
                <Button
                  value={"Сохранить"}
                  style={{ width: "180px" }}
                  type={"submit"}
                />
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
