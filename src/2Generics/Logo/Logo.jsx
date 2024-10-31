import s from "./Logo.module.css";

const Logo = (props) => {
  const customFontSize = props.fontSize || "20px";
  return (
    <div className={s.logo}>
      <span style={props.style} className={s.logoMoi}>
        Мой
      </span>
      <span style={props.style} className={s.logoSouz}>
        Союз
      </span>
    </div>
  );
};

export default Logo;
