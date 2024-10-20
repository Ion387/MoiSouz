import React, { useEffect, useState } from "react";
import s from "./Banner.module.css";
import star from "1Pictures/0Icons/star.png";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import Veil from "2Generics/Veil/Veil";

const Banner = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <Veil />
        <div className={s.bannerName}>Достижения</div>
        <div className={s.bannerContent}>
          <div className={s.star}>
            <img src={star} />
          </div>
        </div>
        <div className={s.bannerFooter}>
          <div className={s.bannerFooterTitle}>Название достижения</div>
          <div className={s.bannerFooterAdd}>Смотреть все</div>
        </div>
        <div className={s.soonIcon}>
          <Icon iconName="soonIcon" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
