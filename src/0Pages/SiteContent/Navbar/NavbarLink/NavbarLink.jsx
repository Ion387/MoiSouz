import s from "./NavbarLink.module.css";
import { NavLink } from "react-router-dom";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";

const NavbarLink = (props) => {
  return (
    <NavLink
      to={props.link}
      className={
        props.isLinkChangeWithFillUserForm
          ? props.dependsLinkClassName
          : props.notDependsLinkClassName
      }
    >
      <div className={s.navButtonIcon}>
        <Icon iconName={props.iconName} />
      </div>
      <div className={s.navButtonName}>{props.linkName}</div>
    </NavLink>
  );
};

export default NavbarLink;
