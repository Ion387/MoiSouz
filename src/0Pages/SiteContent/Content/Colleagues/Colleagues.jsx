import { Link } from "react-router-dom";
import ColleagueOrganizationBlock from "./ColleagueOrganizationBlock/ColleagueOrganizationBlock";
import s from "./Colleagues.module.css";
import { connect } from "react-redux";
import ContactCard from "./ContactCard/ContactCard";

const Colleagues = (props) => {
  let documentsList = props.organizationBlock[0].manager.map((i) => (
    <div key={i.id} className={s.documentsListRow}>
      <div className={s.indent}></div>

      <Link to={`/userId/${i.id}`} className={s.tableLinkText}>
        {i.name}
      </Link>

      <div className={s.tableListText}>
        {props.organizationBlock[0].organization}
      </div>
      <div className={s.tableListText}> {i.post}</div>
      <div className={s.tableListText}> {i.contacts}</div>
      <div className={s.tableListText}></div>
    </div>
  ));
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.tableHeader}>
          <div className={s.headerTitle}>Коллеги</div>
        </div>
        <div className={s.collegueOrganizationBlocks}>
          <div className={s.collegueOrgBlock}>
            <ColleagueOrganizationBlock
              organizationBlock={props.organizationBlock[0]}
            />
          </div>
          <div className={s.collegueOrgBlock}>
            <ColleagueOrganizationBlock
              organizationBlock={props.organizationBlock[1]}
            />
          </div>
        </div>
        <div className={s.table}>
          <div className={s.headerGrid}>
            <div className={s.indent}></div>
            <div className={s.tableHeaderText}>ФИО</div>
            <div className={s.tableHeaderText}>ОРГАНИЗАЦИЯ</div>
            <div className={s.tableHeaderText}>ДОЛЖНОСТЬ</div>
            <div className={s.tableHeaderText}>
              ПРЕДПОЧИТАЕМЫЕ СПОСОБЫ СВЯЗИ
            </div>
          </div>
          <div className={s.tableList}>{documentsList}</div>
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

export default connect(mapStateToProps)(Colleagues);
