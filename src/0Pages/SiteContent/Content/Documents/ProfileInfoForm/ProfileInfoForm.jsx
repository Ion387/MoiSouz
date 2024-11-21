import s from "./ProfileInfoForm.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormProfile from "3Entities/Forms/FormProfile";
import { onProfileInfoFormTC, postAvatarUserTC } from "0Redux/userReducer";

const ProfileInfoForm = (props) => {
  const { data } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(postAvatarUserTC(data.avatar));
    delete data.avatar;
    dispatch(onProfileInfoFormTC(data, navigate));
  };

  return <FormProfile defaultValues={data} onSubmit={onSubmit} />;
};

export default ProfileInfoForm;
