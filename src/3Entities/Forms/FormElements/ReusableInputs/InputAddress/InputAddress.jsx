import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import s from "./InputAddress.module.css";

import Input from "3Entities/Forms/FormElements/Base/Input/Input";

export const InputAddressResolvers = {
  postcode: yup.string().required("Укажите Индекс"),
  region: yup.string().required("Укажите Регион"),
  area: yup.string().required("Укажите Муниципальное образование"),
  city: yup.string().required("Укажите Населенный пункт"),
  street: yup.string().required("Укажите Улица"),
  house: yup.string().required("Укажите Дом/Здание"),
  flat: yup.string(),
};

const InputAddress = ({ prename = "" }) => {
  const { control } = useFormContext();

  return (
    <div className={s.input}>
      <div className={s.gridAdressIndexAdressRegion}>
        <Controller
          className={s.field}
          control={control}
          name={`${prename}postcode`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lable="Адрес проживания"
              placeholder="Индекс"
              errors={error}
            />
          )}
        />

        <Controller
          className={s.field}
          control={control}
          name={`${prename}region`}
          render={({ field, fieldState: { error } }) => (
            <Input {...field} placeholder="Регион" errors={error} />
          )}
        />
      </div>
      <div className={s.gridAdressMunicipalityAdressCity}>
        <Controller
          className={s.field}
          control={control}
          name={`${prename}area`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lableStyle={{ height: "0px" }}
              placeholder="Муниципальное образование"
              errors={error}
            />
          )}
        />

        <Controller
          className={s.field}
          control={control}
          name={`${prename}city`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lableStyle={{ height: "0px" }}
              placeholder="Населенный пункт"
              errors={error}
            />
          )}
        />
      </div>
      <div className={s.gridStreetHouseFlat}>
        <Controller
          className={s.field}
          control={control}
          name={`${prename}street`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lableStyle={{ height: "0px" }}
              placeholder="Улица"
              errors={error}
            />
          )}
        />

        <Controller
          className={s.field}
          control={control}
          name={`${prename}house`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lableStyle={{ height: "0px" }}
              placeholder="Дом/Здание"
              errors={error}
            />
          )}
        />

        <Controller
          className={s.field}
          control={control}
          name={`${prename}flat`}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              lableStyle={{ height: "0px" }}
              placeholder="Квартира"
              errors={error}
            />
          )}
        />
      </div>
    </div>
  );
};

export default InputAddress;
