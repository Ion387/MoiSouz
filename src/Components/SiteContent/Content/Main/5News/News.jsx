import React, { useEffect, useState } from "react";
import s from "./News.module.css";
import Veil from "../../../../0Generics/Veil/Veil";
import { NavLink } from "react-router-dom";
import Icon from "../../../../../1Pictures/0Icons/0IconsContainer/IconsContainer";

const News = (props) => {
  let text = {
    title1: "Ученые создали композитные наноцветы против рака печени",
    title2:
      "В Минздраве рассказали о разработке инновационных медицинских изделий",
    text1:
      "Новые композиты на основе золота и магнитных наночастиц для уничтожения раковых опухолей создали специалисты...",
    text2: "Новые композиты на основе золота и магнитных наночастиц для...",
  };

  return (
    <div className={s.main}>
      <div className={s.title}>Новости</div>

      <div className={s.section}>
        <div className={s.newsBlock}>
          <div className={s.soonIcon}>
            <Icon iconName="soonIcon" />
          </div>
          <NavLink to="/news" className={s.linkArea}></NavLink>
          <div className={s.newspicture1}></div>
          <div className={s.newsText}>
            <div className={s.newsTextTitle}>{text.title1}</div>
            <div className={s.newsTextInfo}>{text.text1}</div>
          </div>
          <Veil />
        </div>

        <div className={s.newsBlock}>
          <div className={s.soonIcon}>
            <Icon iconName="soonIcon" />
          </div>
          <NavLink to="/news" className={s.linkArea}></NavLink>
          <div className={s.newspicture2}></div>
          <div className={s.newsText}>
            <div className={s.newsTextTitle}>{text.title2}</div>
            <div className={s.newsTextInfo}>{text.text2}</div>
          </div>
          <Veil />
        </div>
      </div>
    </div>
  );
};

export default News;
