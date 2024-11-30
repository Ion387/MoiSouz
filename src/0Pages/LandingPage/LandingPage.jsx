import s from "./LandingPage.module.css";
import LandingHeader from "./LandingHeader/LandingHeader";
import LandingTitle from "./LandingTitle/LandingTitle";
import LandingBlock1 from "./LandingBlock1/LandingBlock1";
import LandingBlock2 from "./LandingBlock2/LandingBlock2";
import LandingBlock3 from "./LandingBlock3/LandingBlock3";
import LandingBlock4 from "./LandingBlock4/LandingBlock4";
import LandingBlock5 from "./LandingBlock5/LandingBlock5";
import LandingBlock6 from "./LandingBlock6/LandingBlock6";
import LandingFooter from "./LandingFooter/LandingFooter";
import { useDispatch } from "react-redux";

const LandingPage = () => {
  const dispatch = useDispatch();
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
        <section className={s.landingBlock3}>
          <LandingBlock3 />
        </section>
        {/*     Сделал адаптацию до этого */}
        <section className={s.landingBlock4}>
          <LandingBlock4 />
        </section>
        <section className={s.landingBlock5}>
          <LandingBlock5 />
        </section>
        <section className={s.landingBlock6}>
          <LandingBlock6 />
        </section>
        <section className={s.landingFooter}>
          <LandingFooter />
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
