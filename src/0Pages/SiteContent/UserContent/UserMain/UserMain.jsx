import s from "./UserMain.module.css";
import News from "./5News/News";
import Aside from "./Aside/Aside";

const UserMain = (props) => {
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

export default UserMain;
