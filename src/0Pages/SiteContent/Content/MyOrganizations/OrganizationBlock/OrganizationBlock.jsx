import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import s from "./OrganizationBlock.module.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const OrganizationBlock = () => {
  const { organizationBlock } = useSelector((state) => state.organization);

  return (
    <div className={s.main}>
      <NavLink to="/organization" className={s.link}>
        <div className={s.section}>
          <div className={s.headerFlex}>
            <div className={s.title}>{organizationBlock.organization}</div>
            <div className={s.icon}>
              <Icon iconName={organizationBlock.iconType} />
            </div>
          </div>
          <div className={s.body}>
            <div className={s.bodyLine}>
              <div>
                <span className={s.bodyTitle}>Председатель: </span>
                <span className={s.bodyText}>{organizationBlock.chairman}</span>
              </div>
              <div>
                <span className={s.bodyTitle}>Зам.председателя: </span>
                <span className={s.bodyText}>
                  {organizationBlock.viceChairman}
                </span>
              </div>
            </div>
            <div className={s.bodyLine}>
              <span className={s.bodyTitle}>ПрофкомСовет: </span>
              <span className={s.bodyText}>{organizationBlock.soviet}</span>
            </div>
            <div className={s.bodyLine}>
              <span className={s.bodyTitle}>КРК: </span>
              <span className={s.bodyText}>{organizationBlock.KRK}</span>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

/* const mapStateToProps = (state) => {
  return {
    organization: state.organization,
  };
};
 */
export default OrganizationBlock;
