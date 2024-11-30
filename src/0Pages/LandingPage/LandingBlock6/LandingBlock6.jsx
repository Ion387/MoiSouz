import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import s from "./LandingBlock6.module.css";
import LandingBlock6InfoSection from "./LandingBlock6InfoSection/LandingBlock6InfoSection";
import { Link } from "react-router-dom";
import Button from "3Entities/Forms/FormElements/Base/Button/Button";

const LandingBlock6 = (props) => {
  return (
    <div className={s.main}>
      <div className={s.title}>ТАРИФЫ</div>
      <div className={s.autoBlock}>
        <div className={s.autoIcon}>
          <Icon iconName="landingAutoIcon" />
        </div>
        <div className={s.autoBlock_midle}>
          <div className={s.autoBlock_midle_title}>БЕСПЛАТНО</div>
          <div className={s.autoBlock_midle_text}>
            базовый функционал <br />
            навсегда
          </div>
        </div>
        <div className={s.autoBlock_right}>
          - Учет участников Профсоюза и Единый цифровой паспорт участника
          <br />- Формирование и ведение учетной карточки члена Профсоюза
          <br />- Возможность работы в одном ЛК по нескольким организациям
          <br />- Защита персональных данных <br />- Реклама от партнеров
        </div>

        <Link to="/registration" className={s.autoBlock_button}>
          <Button
            value={"Попробовать бесплатно"}
            style={{ fontSize: "16px", fontWeight: "600", width: "226px" }}
          />
        </Link>

        <Link to="/registration" className={s.autoBlock_button_table}>
          <Button
            value={"Попробовать бесплатно"}
            style={{ fontSize: "16px", fontWeight: "600", width: "490px" }}
          />
        </Link>
      </div>

      <div className={s.block6Sections}>
        <div className={s.block6Section}>
          <LandingBlock6InfoSection
            styleInfoblock={{}}
            title={"«ЗЕМЛЯ»"}
            money={"9,9 рублей"}
            addition={"базовый функционал навсегда"}
            styleBoldText={{}}
            boldText={"- Маркетплейс специальных предложений от партнеров"}
            text={["- Отключение рекламы"]}
          />
        </div>
        <div className={s.block6Section}>
          <LandingBlock6InfoSection
            styleInfoblock={{}}
            title={"«ВОДА»"}
            money={"19,9 рублей"}
            addition={"за пользователя в месяц"}
            styleBoldText={{ position: "absolute" }}
            boldText={""}
            text={[
              "- Всё что входит в тариф Земля",
              "- Конструктор оргструктуры",
              "- Централизованные рассылки и уведомления",
              "- Постановка и учёт выполнения задач",
              "- Электронный документооборот",
              "- API для интеграции с 1С, платежными сервисами, внешними ИС",
              "- База знаний 1Тб дискового пространства",
            ]}
          />
        </div>
        <div className={s.block6Section}>
          <LandingBlock6InfoSection
            styleInfoblock={{
              backgroundColor: "rgb(72, 128, 255)",
              color: "#fff",
            }}
            title={"«ОГОНЬ»"}
            money={"29,9 рублей"}
            addition={"за пользователя в месяц"}
            styleBoldText={{ position: "absolute" }}
            boldText={""}
            text={[
              "- Всё что входит в тариф Вода",
              "- Автоматизация процессов",
              "- Инструменты коммуникации и обмена знаниями (чат, видеоконференции, наставничество)",
              "- Личный кабинет работодателя для онлайн взаимодействия с Профсоюзом",
              "- Инструменты аналитики для организации и контролирующих органов",
              "- Инструменты краудсорсинга, краудфандинга и геймификации (награды, конкурсы)",
              "- Голосования и опросы с использованием технологии блок-чейн",
              "- База знаний 3Тб дискового пространства",
            ]}
            buttonStyle={{
              width: "226px",
              height: "54px",
              fontSize: "16px",
              fontWeight: "600",
              backgroundColor: "white",
              color: "rgb(72, 128, 255)",
            }}
          />
        </div>
        <div className={s.block6Section}>
          <LandingBlock6InfoSection
            styleInfoblock={{}}
            title={"ВОЗДУХ"}
            money={"ИНДИВИДУАЛЬНО"}
            addition={"за пользователя* в месяц"}
            styleBoldText={{ position: "absolute" }}
            boldText={""}
            text={[
              "- Всё что входит в тариф Огонь",
              "- 9 Тб дискового пространства",
              "- Выделенный сервер",
              "- Поддержка 24/7",
            ]}
            bottomBlock
          />
        </div>
      </div>
    </div>
  );
};

export default LandingBlock6;
