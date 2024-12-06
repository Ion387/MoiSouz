import s from "./UserAnketSubmit.module.css";
import banner from "1Pictures/Work/Featured Product.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  submitUserAnketFormTC,
  postAvatarUserTC,
} from "0Redux/userFormsReducer";
import FormUserAnket from "0Pages/SiteContent/ContentUser/DocumentsUser/UserForms/UserAnketForm/FormUserAnket/FormUserAnket";

const UserAnketSubmit = (props) => {
  const { data } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const avatar = data.avatar;
    delete data.avatar;
    dispatch(submitUserAnketFormTC(data, navigate));
    dispatch(postAvatarUserTC(avatar));
  };

  return (
    <div className={s.anketSubmit}>
      <FormUserAnket defaultValues={data} onSubmit={onSubmit} />

      <img src={banner} alt="banner" className={s.banner} />
    </div>
  );
};

export default UserAnketSubmit;
