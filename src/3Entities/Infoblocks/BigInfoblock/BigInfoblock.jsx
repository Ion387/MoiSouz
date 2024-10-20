import React, { useEffect, useState } from "react";
import s from "./BigInfoblock.module.css";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";

const BigInfoblock = (props) => {
  let text = {
    bigIcon: "Mans",
    title: "Взносы",
    volume: "406689",
    icon: "growUpIcon",
    percent: 8.5,
    persentTime: "за месяц",
  };
  let isRub = true;

  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.bigIcon}>
          <Icon iconName={props.bigIcon} />
        </div>

        <div className={s.title}>{props.title}</div>
        <div className={s.volume}>
          {props.volume}
          {props.isRub && <span className={s.rub}>₽</span>}
        </div>

        <div className={s.growOrFall}>
          <div className={s.icon}>
            <Icon
              iconName={props.isVolumeGrow ? "growUpIcon" : "fallDownIcon"}
            />
          </div>

          <div
            className={
              props.isVolumeGrow ? `${s.percent}` : `${s.percent} ${s.fall}`
            }
          >
            {props.percent}
          </div>
          <div className={s.persentTime}>{props.persentTime}</div>
        </div>
        <div className={s.icon}></div>
      </div>
    </div>
  );
};

export default BigInfoblock;
