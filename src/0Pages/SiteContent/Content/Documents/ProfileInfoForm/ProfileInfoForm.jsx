import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormProfile from "3Entities/Forms/FormProfile";
import { onProfileInfoFormTC, postAvatarUserTC } from "0Redux/userFormsReducer";

const ProfileInfoForm = (props) => {
  const { data } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(postAvatarUserTC(data.avatar));
    const newData = { ...data, ROLES: ["ADIT"] };
    delete data.avatar;
    dispatch(onProfileInfoFormTC(newData, navigate));
  };

  return <FormProfile defaultValues={data} onSubmit={onSubmit} />;
};

export default ProfileInfoForm;
