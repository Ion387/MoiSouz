import s from "./FormJoinToTradeUnion.module.css";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "3Entities/Forms/FormElements/Base/Button/Button";
/* import InputJoinToTradeUnion from "./Inputs/InputJoinToTradeUnion/InputJoinToTradeUnion"; */
import moment from "moment";
import { useSelector } from "react-redux";
import Input from "3Entities/Forms/FormElements/Base/Input/Input";
import Selector from "3Entities/Forms/FormElements/Base/Selector/Selector";
import DatePicker from "3Entities/Forms/FormElements/Base/DatePicker/DatePicker";
import CheckBox from "3Entities/Forms/FormElements/ReusableInputs/InputCheckBox/CheckBox/CheckBox";
import InputPDF from "3Entities/Forms/FormElements/Base/InputPDF/InputPDF";

const tradeUnionSelect = [
  {
    value: "profsouz0",
    label:
      "Профсоюзная организация аппарата Московской областной организации профсоюза работников здравохранения РФ",
  },

  { value: "profsouz1", label: "Профсоюз работников полиции" },
  { value: "profsouz2", label: "Профсоюз металлургов" },
  { value: "profsouz3", label: "Профсоюз медицинских работников" },
];

let paymentValueSelect = [{ value: 1, label: "1%" }];
for (let i = 1; i < 99; i += 1) {
  paymentValueSelect = [
    ...paymentValueSelect,
    { value: i + 1, label: i + 1 + "%" },
  ];
}

const FormJoinToTradeUnion = ({
  defaultValues,
  onSubmit,
  saveHandler,
  printHandler,
  setIsShowPrintedForm,
  prename = "",
}) => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        hobbies: yup
          .array()
          .of(yup.string())
          .required("Укажите Увлечения")
          .min(1, "Укажите Увлечения"),
      }),
    ),
    defaultValues,
  });

  const { data } = useSelector((state) => state.user);
  const date = moment(new Date()).format("DD.MM.YYYY");

  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.title}>Форма заявления на вступление в профсоюз</div>
        <div className={s.formBlock}>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            {/*      <InputJoinToTradeUnion /> */}
            <div className={s.input}>
              <div className={s.dateNumberGrid}>
                <Input
                  value={"123"}
                  lable={"Номер документа"}
                  lable2={false}
                  disabled
                />
                <Input
                  value={date}
                  lable={"Дата документа"}
                  lable2={false}
                  disabled
                />
              </div>
              <Input
                value={data.lastName}
                lable={"Фамилия"}
                lable2={false}
                disabled
              />
              <Input
                value={data.firstName}
                lable={"Имя"}
                lable2={false}
                disabled
              />
              <Input
                value={data.middleName}
                lable={"Отчество"}
                lable2={false}
                disabled
              />

              <Controller
                className={s.field}
                control={control}
                name={`${prename}position`}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...field}
                    lable={"Должность"}
                    lable2={false}
                    errors={error}
                  />
                )}
              />

              <div className={s.dateJoinUTNameGrid}>
                <Controller
                  control={control}
                  name={`${prename}joindate`}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      lable="Дата вступления"
                      placeholder="20.12.2024"
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      errors={error}
                    />
                  )}
                />

                <Controller
                  className={s.field}
                  control={control}
                  name={`${prename}tradeUnionName`}
                  render={({ field, fieldState: { error } }) => (
                    <Selector
                      {...field}
                      lable={"Выберите профсоюз из списка"}
                      optionValue={tradeUnionSelect}
                      errors={error}
                      style={
                        (watch(`${prename}tradeUnionName`) || "").trim()
                          ? {}
                          : { color: "rgb(166, 166, 166)" }
                      }
                    />
                  )}
                />
              </div>

              <Controller
                className={s.field}
                control={control}
                name={`${prename}paimentValue`}
                render={({ field, fieldState: { error } }) => (
                  <Selector
                    {...field}
                    lable={"Размер взносов в профсоюз от заработной платы"}
                    optionValue={paymentValueSelect}
                    placeholder={"Высшее"}
                    errors={error}
                    style={
                      (watch(`${prename}paimentValue`) || "").trim()
                        ? {}
                        : { color: "rgb(166, 166, 166)" }
                    }
                  />
                )}
              />

              <div className={s.input}>
                <Controller
                  control={control}
                  name={`${prename}dataProcessAgree`}
                  render={({ field, fieldState: { error } }) => (
                    <CheckBox
                      {...field}
                      lableStyle={{ maxWidth: "582px" }}
                      label={
                        "Я соглашаюсь на обработку персональных данных Согласие с политикой обработки персональных данных"
                      }
                      errors={error}
                    />
                  )}
                />
              </div>

              <div className={s.inputPdf}>
                <Controller
                  className={s.field}
                  control={control}
                  name={`${prename}PDFjoinTradeUnion`}
                  render={({ field, fieldState: { error } }) => (
                    <InputPDF
                      {...field}
                      error={error}
                      label="Загрузите заявление на вступление"
                    />
                  )}
                />
              </div>
              <div className={s.inputPdf}>
                <Controller
                  className={s.field}
                  control={control}
                  name={`${prename}PDFacceptPayment`}
                  render={({ field, fieldState: { error } }) => (
                    <InputPDF
                      {...field}
                      error={error}
                      label="Загрузите заявление о согласии с вступительными взносами"
                    />
                  )}
                />
              </div>
            </div>

            <div className={s.buttons}>
              <Button
                value={"Отменить"}
                style={{
                  width: "168px",
                }}
                white
              />
              <Button
                value={"Сохранить в черновики"}
                style={{
                  width: "225px",
                }}
              />

              <Button
                value={"Распечатать"}
                style={{
                  width: "225px",
                }}
                onClick={() => setIsShowPrintedForm(true)}
              />

              <Button
                value={"Отправить"}
                white
                style={{
                  width: "168px",
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormJoinToTradeUnion;
