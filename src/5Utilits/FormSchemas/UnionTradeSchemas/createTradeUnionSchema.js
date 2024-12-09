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
  title: yup.string().required("Поле обязате"),
  /*"1989-12-03"*/
  creationDate: yup.string().required("Поле обязател"),
  logo: yup.mixed().required("Укажите Фото"),
  /*"ogrn": "ogrn", */
  ogrn: yup.string().required("Поле обязат"),
  /*"inn": "inn", */
  inn: yup.string().required("Поле обязательно для запо"),
  /*    "kpp": "kpp", */
  kpp: yup.string().required("По"),

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
    street: yup.string().required("Укажите Улица"),
    house: yup.string().required("Укажите Дом/Здание"),
    flat: yup.string(),
  }),
  /*"registrationDate": "1999-12-03" */
  registrationDate: yup.string().required("Пол"),
  /*"okato": "okato"*/
  okato: yup.string().required("Поле обязательно для заполнен"),
  /*"oktmo": "oktmo"*/
  oktmo: yup.string().required("Поле обяз"),
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
  chairmanEmail: yup.string().required("Поле обязательно для заполн"),
  /*"chairmanPhone": "+71234567891", */
  chairmanPhone: yup.string().required("Поле обязате"),
  bank: yup.object().shape({
    bank: yup.string().required("Не заполнено"),
    rs: yup.string().required("Не заполнено"),
    bik: yup.string().required("Не заполнено"),
    ks: yup.string().required("Не заполнено"),
  }),
  /*"email": "mail1@mail1.com", */
  email: yup.string().required("Поле обязательно для заполне"),

  /*"phone": "+71234567891" */
  phone: yup.string().required("Поле обязател"),
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


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
