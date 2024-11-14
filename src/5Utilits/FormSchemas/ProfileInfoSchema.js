import * as yup from "yup";

/* secondName;
firstName;
lastName;
birthdate;
education;
profession: ["Бухгалтер", "Политолог"],
position: ["Бухгалтер", "Водитель"],
postcode;
region;
area;
city;
street;
house;
flat;
phone;
phoneDop;
children: [
        {
            "name": "Вероника",
            "gender": "female",
            "birthdate": "2010-05-12"
        },
        {
            "name": "Андрей",
            "gender": "male",
            "birthdate": "2015-11-06"
}]

hobbies; 
*/

const ruNames = /[а-яА-яёЁ]$/;
const ruNamesFree = /[а-яА-яёЁ,.-]$/;
const numbers = /[0-9]$/;
const phone = /[0-9+-]$/;
const phoneRegExp = /[+7][0-9]{10}$/;

export const profileInfoSchema = yup.object().shape({
  secondName: yup
    .string()
    .matches(ruNames, "Поле заполненно не верно")
    .required("Поле обязательно для заполнения"),
  firstName: yup
    .string()
    .matches(ruNames, "Поле заполненно не верно")
    .required("Поле обязательно для заполнения"),
  lastName: yup
    .string()
    .matches(ruNames, "Поле заполненно не верно")
    .required("Поле обязательно для заполнения"),
  /*   birthdate: yup.string().required("Поле обязательно для заполнения"), */
  education: yup.string().required("Поле обязательно для заполнения"),
  gender: yup.string().required("Поле обязательно для заполнения"),
  profession: yup
    .string()
    .matches(ruNamesFree, "Поле заполненно не верно")
    .required("Поле обязательно для заполнения"),
  position: yup
    .string()
    .matches(ruNamesFree, "Поле заполненно не верно")
    .required("Поле обязательно для заполнения"),
  postcode: yup
    .string()
    .matches(numbers, "Поле заполненно не верно")
    .min(6, "Поле заполненно не верно")
    .max(6, "Поле заполненно не верно")
    .required("Поле обязательно для заполнения"),
  region: yup
    .string()
    .matches(ruNamesFree, "Поле заполненно не верно")
    .required("Поле обязательно для заполнения"),
  area: yup
    .string()
    .matches(ruNamesFree, "Поле заполненно не верно")
    .required("Поле обязательно для заполнения"),
  city: yup
    .string()
    .matches(ruNamesFree, "Поле заполненно не верно")
    .required("Поле обязательно для заполнения"),
  street: yup
    .string()
    .matches(ruNamesFree, "Поле заполненно не верно")
    .required("Поле обязательно для заполнения"),
  house: yup.string().required("Поле обязательно для заполнения"),
  flat: yup.string().required("Поле обязательно для заполнения"),
  phone: yup
    .string()
    .matches(phone, "Поле заполненно не верно")
    .min(8, "Поле заполненно не верно")
    .max(16, "Поле заполненно не верно")
    .required("Поле обязательно для заполнения"),
  phoneDop: yup
    .string()
    .matches(phone, "Поле заполненно не верно")
    .min(8, "Поле заполненно не верно")
    .max(16, "Поле заполненно не верно")
    .required("Поле обязательно для заполнения"),
  childrenName: yup
    .string()
    .matches(ruNames, "Поле заполненно не верно")
    .required("Поле обязательно для заполнения"),
  childrenGender: yup.string().required("Поле обязательно для заполнения"),
  childrenBirthdate: yup.string().required("Поле обязательно для заполнения"),
  /*   hobbies: yup
    .string()
    .matches(ruNames, "Поле заполненно не верно")
    .required("Поле обязательно для заполнения"), */
});
