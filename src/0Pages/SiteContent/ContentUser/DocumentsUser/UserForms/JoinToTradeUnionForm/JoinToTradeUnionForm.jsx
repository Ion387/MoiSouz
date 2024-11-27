import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormProfile from "3Entities/Forms/FormProfile/FormProfile";
import {
  submitUserAnketFormTC,
  postAvatarUserTC,
} from "0Redux/userFormsReducer";
import FormAddToTradeUnion from "3Entities/Forms/FormAddToTradeUnion/FormAddToTradeUnion";

const JoinToTradeUnionForm = (props) => {
  const { data } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const avatar = data.avatar;
    delete data.avatar;
    dispatch(submitUserAnketFormTC(data, navigate));
    dispatch(postAvatarUserTC(avatar));
  };

  return <FormAddToTradeUnion defaultValues={data} onSubmit={onSubmit} />;
};

export default JoinToTradeUnionForm;
