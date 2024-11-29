import s from "./Header.module.css";
import undefinedAvatar from "1Pictures/Simple/UndefinedAvatar.png";
import headerUserMore from "1Pictures/0Icons/headerUserMore.png";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import { NavLink } from "react-router-dom";
import Logo from "2Generics/Logo/Logo";
import { useSelector } from "react-redux";

const Header = (props) => {
  const { data } = useSelector((state) => state.user);

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

          <NavLink className={s.user} to="/userPage">
            <img
              className={s.userAvatar}
              src={
                data.avatar
                  ? `${process.env.REACT_APP_SERVER_PATH}${data.avatar}`
                  : undefinedAvatar
              }
              alt="avatar"
            />
            <div className={s.blockNameOfUsers}>
              <div className={s.userName}> {data.lastName || "Гость"}</div>
              <div className={s.userType}>Пользователь</div>
            </div>

            <div className={s.chevronDown}>
              <img src={headerUserMore} />
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
