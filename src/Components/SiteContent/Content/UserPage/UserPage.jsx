import s from "./UserPage.module.css";
import { connect } from "react-redux";

const UserPage = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}></div>
      <div className={s.text}>Данные получены с сервера:</div>
      <div className={s.text}>Имя пользователя: {props.username}</div>
      <div className={s.text}>Потча пользователя: {props.email}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    email: state.user.email,
  };
};

export default connect(mapStateToProps)(UserPage);
