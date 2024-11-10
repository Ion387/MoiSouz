import s from "./InsideDocumentsLink.module.css";
import { NavLink } from "react-router-dom";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";

const InsideDocumentsLink = (props) => {
  const isActiveLink = () => {
    if (
      props.link === props.location ||
      (props.location === "/profileInfo") & (props.link === "/incoming")
    ) {
      return (
        <div className={s.icon}>
          <Icon iconName="circleNavbarIcon" />
        </div>
      );
    } else return <div className={s.icon}></div>;
  };
  return (
    <NavLink to={props.link} className={s.navLink}>
      <div className={s.navButtonIcon}>{isActiveLink()}</div>
      <div className={s.navButtonName}>{props.linkName}</div>
    </NavLink>
  );
};

export default InsideDocumentsLink;
