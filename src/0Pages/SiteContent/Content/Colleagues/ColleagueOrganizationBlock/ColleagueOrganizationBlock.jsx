import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import s from "./ColleagueOrganizationBlock.module.css";

const ColleagueOrganizationBlock = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.mainFlex}>
          <div className={s.leftText}>
            <div className={s.organizationName}>
              {props.organizationBlock.organization}
            </div>
            <div className={s.numberPeople}>
              <span className={s.number}>
                {props.organizationBlock.manager.length + " "}
              </span>
              <span className={s.people}>
                {props.organizationBlock.manager.length === (2 || 3 || 4)
                  ? "человека"
                  : "человек"}
              </span>
            </div>
          </div>
          <div className={s.rightIcon}>
            <Icon iconName={props.organizationBlock.iconType} />
          </div>
        </div>
        Организация 1
      </div>
    </div>
  );
};
export default ColleagueOrganizationBlock;
