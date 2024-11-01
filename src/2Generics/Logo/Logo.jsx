import s from "./Logo.module.css";

const Logo = (props) => {
  return (
    <div className={s.logo}>
      <span style={props.moi} className={s.logoMoi}>
        Мой
      </span>
      <span style={props.souz} className={s.logoSouz}>
        Союз
      </span>
    </div>
  );
};

export default Logo;
