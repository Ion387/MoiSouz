import s from "./My_organizations.module.css";
import { connect } from "react-redux";
import OrganizationBlock from "./OrganizationBlock/OrganizationBlock";

const My_organizations = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.tableHeader}>
          <div className={s.headerTitle}>Мои организации</div>
        </div>
        <div className={s.organizationBlocksGrid}>
          <OrganizationBlock organizationBlock={props.organizationBlock[0]} />
          <OrganizationBlock organizationBlock={props.organizationBlock[1]} />
          <OrganizationBlock organizationBlock={props.organizationBlock[2]} />
          <OrganizationBlock organizationBlock={props.organizationBlock[3]} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    organizationBlock: state.organization.organizationBlock,
  };
};

export default connect(mapStateToProps)(My_organizations);
