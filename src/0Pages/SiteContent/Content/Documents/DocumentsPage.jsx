import s from "./DocumentsPage.module.css";
import { connect } from "react-redux";
import SendButton from "./SendButton/SendButton";
import ColorFlag from "../../../../2Generics/TableElements/ColorFlag/ColorFlag";

const DocumentsPage = (props) => {
  let documentsList = props.documentsList.map((i) => (
    <div key={i.id} className={s.documentsListRow}>
      <div className={s.indent}></div>
      <div className={s.tableListText}> {i.organization}</div>
      <div className={s.tableListText}>{i.documenType}</div>
      <div className={s.tableListText}> {i.sendingData}</div>
      <div className={s.tableListText}> {i.answerData}</div>
      <div className={s.tableListText}>
        <ColorFlag
          status={i.status}
          text={{ green: "Исполнено", yellow: "В обработке", red: "Отказано" }}
        />
      </div>
    </div>
  ));

  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.tableHeader}>
          <div className={s.headerTitle}>Документы</div>
          <div className={s.headerAddButton}>
            <SendButton />
          </div>
        </div>
        <div className={s.table}>
          <div className={s.headerGrid}>
            <div className={s.indent}></div>
            <div className={s.tableHeaderText}>ОРГАНИЗАЦИЯ</div>
            <div className={s.tableHeaderText}>ТИП ДОКУМЕНТА</div>
            <div className={s.tableHeaderText}>ДАТА ОТПРАВКИ</div>
            <div className={s.tableHeaderText}>ДАТА ПОЛУЧЕНИЯ ОТВЕТА </div>
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
    documentsList: state.documents.documentsList,
  };
};

export default connect(mapStateToProps)(DocumentsPage);
