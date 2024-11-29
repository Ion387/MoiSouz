import { Link, useSearchParams } from "react-router-dom";
import s from "./ContactCard.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ContactCard = (props) => {
  const { organizationBlock } = useSelector((state) => state.organization);
  const location = useParams();
  const getUserIndex = () => {
    for (let i = 0; i <= organizationBlock[0].manager.length; i += 1) {
      if (organizationBlock[0].manager[i].id == location.slug) {
        return i;
      }
    }
  };
  /* 
        id: 1,
          name: "Иванов Иван Васильевич",
          post: "Председатель",
          startAuthorityData: "28 Сентября 2023",
          endAuthorityData: "04 Декабря 2024",
          basedDocument: "Приказ № 1",
          status: "green",
          contacts: "+7 818 88 18 28, email@mail.ru", */

  return (
    <div className={s.main}>
      <div className={s.section}>
        <Link to={`/colleagues`} className={s.linkText}>
          {"< назад к списку коллег"}
        </Link>
        <div className={s.tableHeader}>
          <div className={s.headerTitle}>Карточка контакта</div>
        </div>
        <div className={s.contaktCardBlock}>
          <div className={s.photo}>
            <img
              className={s.img}
              src={organizationBlock[0].manager[getUserIndex()].photo}
              load={"lazy"}
            />
          </div>
          <div className={s.rightInfoBlock}>
            <div className={s.rightInfoTextBlock}>
              <div className={s.fullName}>
                {organizationBlock[0].manager[getUserIndex()].name}
              </div>
              <div className={s.text}>
                {organizationBlock[0].manager[getUserIndex()].name}
              </div>
              <div className={s.text}>{organizationBlock[0].organization}</div>
              <div className={s.text}>
                {organizationBlock[0].manager[getUserIndex()].post}
              </div>
              <div className={s.text}>
                {organizationBlock[0].manager[getUserIndex()].contacts}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
/* const mapStateToProps = (state) => {
  return {
    manager: state.organization.organizationBlock[0].manager,
    organization: state.organization.organizationBlock[0].organization,
  };
}; */
export default ContactCard;
