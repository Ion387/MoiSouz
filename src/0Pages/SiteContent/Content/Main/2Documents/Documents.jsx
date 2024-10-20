import s from "./Documents.module.css";
import BigInfoblock from "3Entities/Infoblocks/BigInfoblock/BigInfoblock";

const Documents = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.title}>Документы</div>
        <div className={s.bigBlock}>
          <BigInfoblock
            bigIcon={"Mans"}
            title={"Заявлений о вступлении"}
            volume={1604}
            isVolumeGrow={true}
            percent={8.5}
            persentTime={"за месяц"}
          />
        </div>
        <div className={s.bigBlock2}>
          <BigInfoblock
            bigIcon={"greenBoxIcon"}
            title={"Обращений в организацию"}
            volume={320}
            isVolumeGrow={true}
            percent={1.3}
            persentTime={"за месяц"}
          />
        </div>
        <div className={s.bigBlock3}>
          <BigInfoblock
            bigIcon={"chartFallIcon"}
            title={"Заявлений о выходе"}
            volume={3}
            isVolumeGrow={false}
            percent={4.3}
            persentTime={"за месяц"}
          />
        </div>
      </div>
    </div>
  );
};

export default Documents;
