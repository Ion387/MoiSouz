import MyInput from "2Generics/FormElements/Input/Input";
import s from "./InputAdder.module.css";
import Input from "2Generics/FormElements/Input/Input";

const InputAdder = (props) => {
  let inputList = null;
  for (let n = 0; n <= props.number; n++) {
    inputList =
      inputList +
      (
        <Input
          {...props.register("aditionalProfession")}
          style={{ width: "100%" }}
          placeholder={"Главный бухгалтер"}
        />
      );
  }

  return { inputList };
};
export default InputAdder;
