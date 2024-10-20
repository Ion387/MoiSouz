import React, { useEffect, useState } from "react";
import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import Icon from "../../../1Pictures/0Icons/0IconsContainer/IconsContainer";

const Navbar = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.mainNavSection}>
          <NavLink
            to="/"
            className={(navData) =>
              navData.isActive
                ? `${s.navLinkButton} ${s.active}`
                : s.navLinkButton
            }
          >
            <div className={s.navButtonIcon}>
              <Icon iconName="mainIcon" />
            </div>
            <div className={s.navButtonName}>
              Главная
              <Icon iconName="Icon" />
            </div>
          </NavLink>

          <NavLink
            to="/notifications"
            className={(navData) =>
              navData.isActive
                ? `${s.navLinkButton} ${s.active}`
                : `${s.navLinkButton} ${s.empty}`
            }
          >
            <div className={s.navButtonIcon}>
              <Icon iconName="notificationsIcon" />
            </div>
            <div className={s.navButtonName}>Уведомления</div>
          </NavLink>

          <NavLink
            to="/tasks"
            className={(navData) =>
              navData.isActive
                ? `${s.navLinkButton} ${s.active}`
                : `${s.navLinkButton} ${s.empty}`
            }
          >
            <div className={s.navButtonIcon}>
              <Icon iconName="tasksIcon" />
            </div>
            <div className={s.navButtonName}>Задачи</div>
          </NavLink>

          <NavLink
            to="/documents"
            className={(navData) =>
              navData.isActive
                ? `${s.navLinkButton} ${s.active}`
                : s.navLinkButton
            }
          >
            <div className={s.navButtonIcon}>
              <Icon iconName="documentsIcon" />
            </div>
            <div className={s.navButtonName}>Документы</div>
          </NavLink>

          <NavLink
            to="/my_organizations"
            className={(navData) =>
              navData.isActive
                ? `${s.navLinkButton} ${s.active}`
                : s.navLinkButton
            }
          >
            <div className={s.navButtonIcon}>
              <Icon iconName="my_organizationsIcon" />
            </div>
            <div className={s.navButtonName}>Мои организации</div>
          </NavLink>
        </div>

        <NavLink
          to="/colleagues"
          className={(navData) =>
            navData.isActive
              ? `${s.navLinkButton} ${s.active}`
              : s.navLinkButton
          }
        >
          <div className={s.navButtonIcon}>
            <Icon iconName="colleaguesIcon" />
          </div>
          <div className={s.navButtonName}>Коллеги</div>
        </NavLink>

        <div className={s.bottomNavSection}></div>

        <NavLink
          to="/money"
          className={(navData) =>
            navData.isActive
              ? `${s.navLinkButton} ${s.active}`
              : `${s.navLinkButton} ${s.empty}`
          }
        >
          <div className={s.navButtonIcon}>
            <Icon iconName="moneyIcon" />
          </div>
          <div className={s.navButtonName}>Деньги</div>
        </NavLink>

        <NavLink
          to="/discounts"
          className={(navData) =>
            navData.isActive
              ? `${s.navLinkButton} ${s.active}`
              : s.navLinkButton
          }
        >
          <div className={s.navButtonIcon}>
            <Icon iconName="discountsIcon" />
          </div>
          <div className={s.navButtonName}>Скидки, льготы</div>
        </NavLink>

        <NavLink
          to="/store"
          className={(navData) =>
            navData.isActive
              ? `${s.navLinkButton} ${s.active}`
              : `${s.navLinkButton} ${s.empty}`
          }
        >
          <div className={s.navButtonIcon}>
            <Icon iconName="storeIcon" />
          </div>
          <div className={s.navButtonName}>Магазин</div>
        </NavLink>

        <NavLink
          to="/information"
          className={(navData) =>
            navData.isActive
              ? `${s.navLinkButton} ${s.active}`
              : `${s.navLinkButton} ${s.empty}`
          }
        >
          <div className={s.navButtonIcon}>
            <Icon iconName="information" />
          </div>
          <div className={s.navButtonName}>Информация</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
