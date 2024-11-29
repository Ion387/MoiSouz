import UserAnketSubmit from "0Pages/SiteContent/ContentUser/DocumentsUser/UserForms/UserAnketForm/UserAnketSubmit";
import s from "./UserPage.module.css";
import { connect, useDispatch } from "react-redux";
import Button from "3Entities/Forms/FormElements/Base/Button/Button";
import { clearToken } from "4API/AxiosApi";
import { logoutUserAC } from "0Redux/userReducer";

const UserPage = (props) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    clearToken();
    dispatch(logoutUserAC());
  };
  return (
    <div className={s.main}>
      <UserAnketSubmit />
      <div className={s.buttonSpaceWidth}>
        <div className={s.logoutButton}>
          <Button value={"Выйти"} onClick={logoutHandler} white />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
