import * as yup from "yup";

const email = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
const ruNames = /[а-яА-яёЁ]$/;
const ruNamesFree = /[а-яА-яёЁ,.-]$/;
const numbers = /[0-9]$/;
const phone = /[0-9+-]$/;

const phoneRegExp = /[+7][0-9]{10}$/;

/* email  */
export const emailSchema = yup.string().required("Не заполнено");
