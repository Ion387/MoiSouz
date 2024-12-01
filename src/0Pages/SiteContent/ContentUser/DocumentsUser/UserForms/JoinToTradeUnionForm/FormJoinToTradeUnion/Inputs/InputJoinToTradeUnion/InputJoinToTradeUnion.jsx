import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import s from "./InputJoinToTradeUnion.module.css";

import Input from "3Entities/Forms/FormElements/Base/Input/Input";
import Selector from "3Entities/Forms/FormElements/Base/Selector/Selector";
import DatePicker from "3Entities/Forms/FormElements/Base/DatePicker/DatePicker";
import InputAvatar from "3Entities/Forms/FormElements/Base/InputPicture/InputPicture";
import { useSelector } from "react-redux";
import moment from "moment";
import PDFinputBody from "3Entities/Forms/FormElements/Base/InputPDF/InputPDF";
import CheckBox from "3Entities/Forms/FormElements/ReusableInputs/InputCheckBox/CheckBox/CheckBox";

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

let paimentValueSelect = [{ value: 1, label: "1%" }];
for (let i = 1; i < 99; i += 1) {
  paimentValueSelect = [
    ...paimentValueSelect,
    { value: i + 1, label: i + 1 + "%" },
  ];
}

const InputJoinToTradeUnion = ({ prename = "" }) => {
  const { control, watch } = useFormContext();

  const { data } = useSelector((state) => state.user);
  const date = moment(new Date()).format("DD.MM.YYYY");
  return (
    <div className={s.input}>
      <div className={s.dateNumberGrid}>
        <Input
          value={"123"}
          lable={"Номер документа"}
          lable2={false}
          disabled
        />
        <Input value={date} lable={"Дата документа"} lable2={false} disabled />
      </div>
      <Input value={data.lastName} lable={"Фамилия"} lable2={false} disabled />
      <Input value={data.firstName} lable={"Имя"} lable2={false} disabled />
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
          <Input {...field} lable={"Должность"} lable2={false} errors={error} />
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
            optionValue={paimentValueSelect}
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
            <PDFinputBody
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
            <PDFinputBody
              {...field}
              error={error}
              label="Загрузите заявление о согласии с вступительными взносами"
            />
          )}
        />
      </div>
    </div>
  );
};

export default InputJoinToTradeUnion;
