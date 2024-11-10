import s from "./Navbar.module.css";
import { useLocation } from "react-router-dom";
import NavbarLink from "./NavbarLink/NavbarLink";
import {
  afterDocumentsNavlinkData,
  beforeDocumentsNavlinkData,
  bottomNavlinkData,
  linksInsideDocuments,
} from "6Routing/NavlinkData";
import InsideDocumentsLink from "./InsideDocumentsLink/InsideDocumentsLink";

const Navbar = (props) => {
  const checkIsLinkActive = () => {
    if (props.isUserFormFilled) {
      return (navData) =>
        navData.isActive ? `${s.navLinkButton} ${s.active}` : s.navLinkButton;
    } else {
      return `${s.navLinkButton} ${s.empty}`;
    }
  };
  const notDependsLinkClassName = () => (navData) =>
    navData.isActive ? `${s.navLinkButton} ${s.active}` : s.navLinkButton;

  const navlinkMap = (link) =>
    link.map((i) => (
      <NavbarLink
        key={i.linkName}
        linkName={i.linkName}
        link={
          !i.isLinkChangeWithFillUserForm
            ? i.link
            : props.isUserFormFilled
              ? i.link
              : "#"
        }
        dependsLinkClassName={checkIsLinkActive()}
        notDependsLinkClassName={notDependsLinkClassName()}
        iconName={i.iconName}
        isLinkChangeWithFillUserForm={i.isLinkChangeWithFillUserForm}
      />
    ));
  const location = useLocation();
  const linksInDocuments = linksInsideDocuments.map((i) => (
    <InsideDocumentsLink
      linkName={i.linkName}
      link={i.link}
      className={notDependsLinkClassName()}
      location={location.pathname}
    />
  ));

  const isDocumentsLinksShowing = () => {
    if (
      location.pathname === "/outgoing" ||
      location.pathname === "/incoming" ||
      location.pathname === "/drafts" ||
      location.pathname === "/profileInfo"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const beforeDocNavlinkData = navlinkMap(beforeDocumentsNavlinkData);
  const afterDocNavlinkData = navlinkMap(afterDocumentsNavlinkData);
  const bottomlinkData = navlinkMap(bottomNavlinkData);
  return (
    <div className={s.main}>
      <div className={s.section}>
        {beforeDocNavlinkData}
        {isDocumentsLinksShowing() && (
          <div className={s.documentsInnerLinks}>{linksInDocuments}</div>
        )}
        {afterDocNavlinkData}
        <div className={s.bottomLinkData}>{bottomlinkData}</div>
      </div>
    </div>
  );
};

export default Navbar;
