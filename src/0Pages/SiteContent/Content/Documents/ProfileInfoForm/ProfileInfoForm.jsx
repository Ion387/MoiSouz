import s from "./ProfileInfoForm.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormProfile from "3Entities/Forms/FormProfile";

const ProfileInfoForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /*
  const onSubmit = (data) => {
    const rigntPickedHobby = choicePickedHobby.map((i) => i && i);
    const rightData = {
      ...data,
      birthdate: birthdate,
      hobbies: rigntPickedHobby,
    };
    dispatch(onProfileInfoFormTC(rightData, navigate));
  };
  */

  const onSubmit = (data) => {
    console.log("SUBMIT", data);
  };

  return <FormProfile onSubmit={onSubmit} />;
};

export default ProfileInfoForm;
