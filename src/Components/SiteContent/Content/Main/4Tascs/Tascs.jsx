import React, { useEffect, useState } from "react";
import s from "./Tascs.module.css";
import Veil from "Components/0Generics/Veil/Veil";
import { NavLink } from "react-router-dom";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";

const Tascs = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.title}>Задачи</div>

        <div className={s.taskSection}>
          <div className={s.soonIcon}>
            <Icon iconName="soonIcon" />
          </div>
          <Veil />
          <div className={s.Tascks}>
            <div className={s.taskTitle}>Активные задачи</div>
            <div className={s.Tasc}>Актуальная задача1</div>
            <div className={s.Tasc}>Актуальная задача2</div>
          </div>
        </div>

        <div className={s.taskSection}>
          <div className={s.soonIcon}>
            <Icon iconName="soonIcon" />
          </div>
          <Veil />
          <div className={s.Tascks}>
            <div className={s.taskTitle}>Задачи на будущее</div>
            <div className={s.Tasc}>Задача 1</div>
            <div className={s.Tasc}>Задача 1</div>
          </div>
        </div>
        <NavLink to="/tasks" className={s.showMore}>
          Смотреть все
        </NavLink>
      </div>
    </div>
  );
};

export default Tascs;
