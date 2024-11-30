import Logo from "2Generics/Logo/Logo";
import s from "./LandingFooter.module.css";
import { Link } from "react-router-dom";

const LandingFooter = (props) => {
  return (
    <div className={s.main}>
      <div className={s.contacts}>
        <div className={s.contactText}>{/* +7 945 777 33 33 */}</div>
        <div className={s.contactText}>{/* info@moisouz.ru */}</div>
      </div>
      <div className={s.logo}>
        <Logo />
      </div>
      <div className={s.links}>
        <div>
          <Link className={s.link} to="/">
            Сотрудничество
          </Link>
          {/* commit */}
        </div>
        <div>
          <Link className={s.link} to="/">
            Работа
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
