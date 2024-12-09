import * as yup from "yup";

const ruNames = /[а-яА-яёЁ]$/;
const ruNamesFree = /[а-яА-яёЁ,.-]$/;
const numbers = /[0-9]$/;
const phone = /[0-9+-]$/;
const phoneRegExp = /[+7][0-9]{10}$/;

export const createTradeUnionSchema = yup.object().shape({
  /*   secondName: yup
    .string()
    .matches(ruNames, "Поле заполненно не верно")
    .required("Поле обязательно для заполнения"),
 */
  /*"Название компании", */
  title: yup.string().required("Не заполнено"),
  /*"1989-12-03"*/
  creationDate: yup.string().required("Не заполнено"),
  logo: yup.mixed().required("Не заполнено"),
  /*"ogrn": "ogrn", */
  ogrn: yup.string().required("Не заполнено"),
  /*"inn": "inn", */
  inn: yup.string().required("Не заполнено"),
  /*    "kpp": "kpp", */
  kpp: yup.string().required("Не заполнено"),

  /*"address":{
        "postcode": "143400",
        "region": "Московская область",
        "area": "Красногорский район",
        "city": "Красногорск",
        "street": "Комсомольская",
        "house": "6 корпус 1",
        "flat": "289"
    }, 
    */
  address: yup.object().shape({
    postcode: yup.string().required("Укажите Индекс"),
    region: yup.string().required("Укажите Регион"),
    area: yup.string().required("Укажите Муниципальное образование"),
    city: yup.string().required("Укажите Населенный пункт"),
    street: yup.string().required("Укажите Улицу"),
    house: yup.string().required("Укажите Дом/Здание"),
    flat: yup.string(),
  }),
  /*"registrationDate": "1999-12-03" */
  registrationDate: yup.string().required("Не заполнено"),
  /*"okato": "okato"*/
  okato: yup.string().required("Не заполнено"),
  /*"oktmo": "oktmo"*/
  oktmo: yup.string().required("Не заполнено"),
  /*    "chairman": {
        "lastName": "Павлов",
        "firstName": "Павел",
        "middleName": "Павлович",
        "inn": "12345678"*/
  chairman: yup.object().shape({
    lastName: yup.string().required("Не заполнено"),
    firstName: yup.string().required("Не заполнено"),
    middleName: yup.string().required("Не заполнено"),
    inn: yup.string().required("Не заполнено"),
  }),
  /*"chairmanEmail": "mail@mail.com", */
  chairmanEmail: yup.string().required("Не заполнено"),
  /*"chairmanPhone": "+71234567891", */
  chairmanPhone: yup.string().required("Не заполнено"),
  bank: yup.object().shape({
    bank: yup.string().required("Не заполнено"),
    rs: yup.string().required("Не заполнено"),
    bik: yup.string().required("Не заполнено"),
    ks: yup.string().required("Не заполнено"),
  }),
  /*"email": "mail1@mail1.com", */
  email: yup.string().required("Не заполнено"),

  /*"phone": "+71234567891" */
  phone: yup.string().required("Не заполнено"),
});

/* 
 title:
  creationDate: 
  logo: 
  ogrn: 
  inn: 
  kpp: 

  address: { yup.object().shape({
    postcode: 
    region: 
    area: 
    city: 
    street: 
    house: 
    flat: }
  registrationDate:

  okato:
  oktmo: 

  chairman:{
    lastName: 
    firstName: 
    middleName: 
    inn: }
  chairmanEmail
  chairmanPhone
  bank: {
    bank: 
    rs: ,
    bik:
    ks:}
 
  email
  phone */

/* 
  JSON
{
    "title": "Название компании",
    "creationDate": "1989-12-03",
    "ogrn": "ogrn",
    "inn": "inn",
    "kpp": "kpp",
    "address":{
        "postcode": "143400",
        "region": "Московская область",
        "area": "Красногорский район",
        "city": "Красногорск",
        "street": "Комсомольская",
        "house": "6 корпус 1",
        "flat": "289"
    },
    "registrationDate": "1999-12-03",
    "okato": "okato",
    "oktmo": "oktmo",
    "chairman": {
        "lastName": "Павлов",
        "firstName": "Павел",
        "middleName": "Павлович",
        "inn": "12345678"
    },
    "chairmanEmail": "mail@mail.com",
    "chairmanPhone": "+71234567891",
    "bank":{
        "bank": "Название банка",
        "rs": "2313132132",
        "bik": "6354684684684",
        "ks": "6546464654"
    },
    "email": "mail1@mail1.com",
    "phone": "+71234567891" */
