import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import s from "./OrganizationBlock.module.css";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const OrganizationBlock = (props) => {
  /* organization: "Организация 1",
      chairman: "Иванов Иван Васильевич",
      viceChairman: "Васильев Потап Васильевич",
      soviet: "Васильев Потап Васильевич, Иванов Иван Васильевич",
      KRK: "Васильев Потап Васильевич, Иванов Иван Васильевич",
      iconType: "", */

  return (
    <div className={s.main}>
      <NavLink to="/organization" className={s.link}>
        <div className={s.section}>
          <div className={s.headerFlex}>
            <div className={s.title}>
              {props.organizationBlock.organization}
            </div>
            <div className={s.icon}>
              <Icon iconName={props.organizationBlock.iconType} />
            </div>
          </div>
          <div className={s.body}>
            <div className={s.bodyLine}>
              <div>
                <span className={s.bodyTitle}>Председатель: </span>
                <span className={s.bodyText}>
                  {props.organizationBlock.chairman}
                </span>
              </div>
              <div>
                <span className={s.bodyTitle}>Зам.председателя: </span>
                <span className={s.bodyText}>
                  {props.organizationBlock.viceChairman}
                </span>
              </div>
            </div>
            <div className={s.bodyLine}>
              <span className={s.bodyTitle}>ПрофкомСовет: </span>
              <span className={s.bodyText}>
                {props.organizationBlock.soviet}
              </span>
            </div>
            <div className={s.bodyLine}>
              <span className={s.bodyTitle}>КРК: </span>
              <span className={s.bodyText}>{props.organizationBlock.KRK}</span>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    organization: state.organization,
  };
};

export default connect(mapStateToProps)(OrganizationBlock);
