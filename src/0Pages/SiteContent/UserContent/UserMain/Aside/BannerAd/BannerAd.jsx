import React, { useEffect, useState } from "react";
import s from "./BannerAd.module.css";

const BannerAd = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={`${s.bannerBlock} ${s.bannerAd}`}></div>
        <div className={`${s.bannerBlock} ${s.bannerAd}`}></div>
        <div className={`${s.bannerBlock} ${s.bannerAd}`}></div>
      </div>
    </div>
  );
};

export default BannerAd;
