import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormProfile from "3Entities/Forms/FormProfile/FormProfile";
import {
  submitUserAnketFormTC,
  postAvatarUserTC,
} from "0Redux/userFormsReducer";

const UserAnketForm = (props) => {
  const { data } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const avatar = data.avatar;
    delete data.avatar;
    dispatch(submitUserAnketFormTC(data, navigate));
    dispatch(postAvatarUserTC(avatar));
  };

  return <FormProfile defaultValues={data} onSubmit={onSubmit} />;
};

export default UserAnketForm;
