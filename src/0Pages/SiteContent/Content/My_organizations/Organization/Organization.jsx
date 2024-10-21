import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import s from "./Organization.module.css";
import { connect } from "react-redux";
import ColorFlag from "2Generics/TableElements/ColorFlag/ColorFlag";

const Organization = (props) => {
  console.log(props.organizationBlock[0].manager[0]);
  let documentsList = props.organizationBlock[0].manager.map((i) => (
    <div key={i.id} className={s.documentsListRow}>
      <div className={s.indent}></div>
      <div className={s.tableListText}> {i.name}</div>
      <div className={s.tableListText}>{i.post}</div>
      <div className={s.tableListText}> {i.startAuthorityData}</div>
      <div className={s.tableListText}> {i.endAuthorityData}</div>
      <div className={s.tableListText}> {i.basedDocument}</div>
      <div className={s.tableListText}>
        {" "}
        <ColorFlag
          status={i.status}
          text={{
            green: "Действующий",
            yellow: "Заканчивающийся",
            red: "Окончился срок",
          }}
        />
      </div>
    </div>
  ));

  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.tableHeader}>
          <div className={s.headerTitle}>Карточка организации 1</div>
        </div>
        {/*       Реквизиты */}
        <div className={s.requisitesBlock}>
          Реквизиты
          <div className={s.requisiteFlex1}>
            <div className={s.requisiteFlex2}>
              {/*       Реквизиты левый блок*/}
              <div className={s.requisiteLeftBlock}>
                <div>
                  <span className={s.requisiteTitle}>
                    Уникальный номер в системе:
                  </span>
                  <span className={s.requisiteText}>
                    {props.organizationBlock[0].UnicalId}
                  </span>
                </div>
                <div>
                  <span className={s.requisiteTitle}>ИНН/КПП: </span>
                  <span className={s.requisiteText}>
                    {props.organizationBlock[0].INN +
                      "/" +
                      props.organizationBlock[0].KPP}
                  </span>
                </div>
                <div>
                  <span className={s.requisiteTitle}>ОГРН: </span>
                  <span className={s.requisiteText}>
                    {props.organizationBlock[0].OGRN}
                  </span>
                </div>
                <div>
                  <span className={s.requisiteTitle}>Адрес: </span>
                  <span className={s.requisiteText}>
                    {props.organizationBlock[0].adress}
                  </span>
                </div>
              </div>
              {/*       Реквизиты правый блок*/}
              <div className={s.requisiteRightBlock}>
                <div>
                  <span className={s.requisiteTitle}>
                    Банковские реквизиты:
                  </span>
                  <span className={s.requisiteText}></span>
                </div>
                <div>
                  <span className={s.requisiteTitle}>Банк: </span>
                  <span className={s.requisiteText}>
                    {props.organizationBlock[0].bank}
                  </span>
                </div>
                <div>
                  <span className={s.requisiteTitle}>БИК: </span>
                  <span className={s.requisiteText}>
                    {props.organizationBlock[0].BIK}
                  </span>
                </div>
                <div>
                  <span className={s.requisiteTitle}>Р/с: </span>
                  <span className={s.requisiteText}>
                    {props.organizationBlock[0].rs}
                  </span>
                </div>
              </div>
            </div>
            <div className={s.icon}>
              <Icon iconName="TriangleOrgIcon" />
            </div>
          </div>
        </div>

        <div className={s.table}>
          <div className={s.headerGrid}>
            <div className={s.indent}></div>
            <div className={s.tableHeaderText}>ДОЛЖНОСТЬ</div>
            <div className={s.tableHeaderText}>ФИО</div>
            <div className={s.tableHeaderText}>
              ДАТА НАЧАЛА <br />
              ПОЛНОМОЧИЙ
            </div>
            <div className={s.tableHeaderText}>ДАТА ОКОНЧАНИЯ ПОЛНОМОЧИЙ</div>
            <div className={s.tableHeaderText}>ОСНОВАНИЕ</div>
            <div className={s.tableHeaderText}>СТАТУС</div>
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

export default connect(mapStateToProps)(Organization);
