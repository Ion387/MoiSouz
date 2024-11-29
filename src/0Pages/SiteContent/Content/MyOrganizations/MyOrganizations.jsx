import { useSelector } from "react-redux";
import s from "./MyOrganizations.module.css";
import OrganizationBlock from "./OrganizationBlock/OrganizationBlock";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";

const My_organizations = () => {

      const{organizationBlock}=useSelector(state=>state.organization)
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.tableHeader}>
          <div className={s.headerTitle}>Мои организации</div>
        </div>
        <div className={s.organizationBlocksGrid}>
          <OrganizationBlock organizationBlock={organizationBlock[0]} />
          <OrganizationBlock organizationBlock={organizationBlock[1]} />
          <OrganizationBlock organizationBlock={organizationBlock[2]} />
          <OrganizationBlock organizationBlock={organizationBlock[3]} />
        </div>
        <div className={s.blueArrow1}>
          <Icon iconName="blueArrowIcon" />
        </div>
        <div className={s.blueArrow2}>
          <Icon iconName="blueArrowIcon" />
        </div>
      </div>
    </div>
  );
};

/* const mapStateToProps = (state) => {
  return {
    organizationBlock: state.organization.organizationBlock,
  };
}; */

export default My_organizations;
