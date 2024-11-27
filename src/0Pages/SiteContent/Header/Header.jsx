import s from "./Header.module.css";
import undefinedAvatar from "1Pictures/Simple/UndefinedAvatar.png";
import headerUserMore from "1Pictures/0Icons/headerUserMore.png";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import { NavLink } from "react-router-dom";
import Logo from "2Generics/Logo/Logo";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAC } from "0Redux/userReducer";
import { clearToken } from "4API/AxiosApi";

const Header = (props) => {
  const { data } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onclickHandler = () => {
    clearToken();
    dispatch(logoutUserAC());
  };
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.logo}>
          <Logo />
        </div>

        <div className={s.rightHeaderBlock}>
          <div className={s.bell}>
            <Icon iconName="bellIcon" />
            <div className={s.bellCircle}>
              <div className={s.bellCircleNumber}>6</div>
            </div>
          </div>

          <div className={s.user}>
            <img
              className={s.userAvatar}
              src={
                data.avatar
                  ? `${process.env.REACT_APP_SERVER_PATH}${data.avatar}`
                  : undefinedAvatar
              }
              alt="avatar"
              onClick={onclickHandler}
            />
            <div className={s.blockNameOfUsers}>
              <div className={s.userName}>
                <NavLink to="/UserPage" className={s.userName}>
                  {data.lastName || "Гость"}
                </NavLink>
              </div>
              <div className={s.userType}>Пользователь</div>
            </div>
            <div className={s.chevronDown}>
              <img src={headerUserMore} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
