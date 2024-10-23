import LilInfoblock from "3Entities/Infoblocks/LilInfoblock/LilInfoblock";
import s from "./Discounts.module.css";
import d from "1Pictures/Content_pictures/discount.png";

const Discounts = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <section className={s.contentBlock}>
          <div className={s.tableHeader}>
            <div className={s.headerTitle}>Скидки и льготы</div>
          </div>
          <div className={s.blocks}>
            <LilInfoblock
              bigIcon={"sunDiscontIcon"}
              title={"Скидок получено"}
              volume={12}
              isRub={false}
            />
            <LilInfoblock
              bigIcon={"presentDiscontIcon"}
              title={"Льгот получено"}
              volume={2}
              isRub={false}
            />
            <LilInfoblock
              bigIcon={"growUpDiscontIcon"}
              title={"Текущая экономия"}
              volume={700}
              isRub={true}
            />
          </div>
          <div className={s.discontPicture}></div>
        </section>
        <aside className={s.asideBlock}></aside>
      </div>
    </div>
  );
};

export default Discounts;
