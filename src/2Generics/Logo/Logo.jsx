import s from "./Logo.module.css";

const Logo = ({ style, white }) => {
  return (
    <div className={s.logo}>
      <span style={style} className={!white ? s.logoMoi : s.logoMoiWhite}>
        Мой
      </span>
      <span style={style} className={s.logoSouz}>
        Союз
      </span>
    </div>
  );
};

export default Logo;
