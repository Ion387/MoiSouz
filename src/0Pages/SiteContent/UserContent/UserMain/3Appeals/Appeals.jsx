import React, { useEffect, useState } from "react";
import s from "./Appeals.module.css";
import { NavLink } from "react-router-dom";

const Appeals = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.statements}>
          <div className={s.text}>Нерассмотренные заявления</div>
          <div className={s.statementsInfo}>Нет</div>
        </div>

        <div className={s.petition}>
          <div className={s.text}>Нерассмотренные обращения</div>
          <div className={s.petitionsInfo}>10</div>
        </div>
      </div>
      <NavLink to="/documents" className={s.showMore}>
        Смотреть все
      </NavLink>
    </div>
  );
};

export default Appeals;
