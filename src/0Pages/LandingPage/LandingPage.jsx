import Logo from "2Generics/Logo/Logo";
import s from "./LandingPage.module.css";
import { Link } from "react-router-dom";
import Button from "2Generics/FormElements/Button/Button";
import LandingHeader from "./LandingHeader/LandingHeader";
import LandingTitle from "./LandingTitle/LandingTitle";
import LandingBlock1 from "./LandingBlock1/LandingBlock1";
import LandingBlock2 from "./LandingBlock2/LandingBlock2";

const LandingPage = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <header className={s.landingHeader}>
          <LandingHeader />
        </header>
        <section className={s.landingTitle}>
          <LandingTitle />
        </section>
        <section className={s.landingBlock1}>
          <LandingBlock1 />
        </section>
        <section className={s.landingBlock2}>
          <LandingBlock2 />
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
