import React, { useEffect, useState } from "react";
import s from "./Money.module.css";
import BigInfoblock from "3Entities/Infoblocks/BigInfoblock/BigInfoblock";
import LilInfoblock from "3Entities/Infoblocks/LilInfoblock/LilInfoblock";

const Money = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.title}>Деньги</div>
        <div className={s.littleBlock}>
          <LilInfoblock
            bigIcon={"Mans"}
            title={"Баланс"}
            volume={406669}
            isRub={true}
          />
        </div>
        <div className={s.bigBlock}>
          <BigInfoblock
            bigIcon={"Mans"}
            title={"Взносы"}
            volume={406669}
            isVolumeGrow={true}
            icon={"growUpIcon"}
            isRub={true}
            percent={8.5}
            persentTime="за месяц"
          />
        </div>

        <div className={s.littleBlock}>
          <LilInfoblock
            bigIcon={"YellowBoxIcon"}
            title={"Пополнение"}
            volume={406669}
            isRub={true}
          />
        </div>

        <div className={s.bigBlock2}>
          <BigInfoblock
            bigIcon={"chartGrowIcon"}
            title={"Экономия"}
            volume={"12340"}
            isVolumeGrow={false}
            icon={"fallDownIcon"}
            isRub={true}
            percent={4.3}
            persentTime={"за месяц"}
          />
        </div>

        <div className={s.littleBlock}>
          <LilInfoblock
            bigIcon={"circleArrowIcon"}
            title={"Расходы"}
            volume={406669}
            isRub={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Money;
