import s from "./MainUser.module.css";
import News from "./5News/News";
import Aside from "./Aside/Aside";

const MainUser = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <section className={s.sectionTascs}>
          <News />
        </section>
      </div>
      <aside>
        <Aside />
      </aside>
    </div>
  );
};

export default MainUser;
