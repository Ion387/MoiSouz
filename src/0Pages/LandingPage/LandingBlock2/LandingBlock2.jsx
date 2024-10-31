import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import s from "./LandingBlock2.module.css";

const LandingBlock2 = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.title}>ВОЗМОЖНОСТИ СЕРВИСА</div>
        <div className={s.bigIcon}>
          <Icon iconName="LandingBlock2CentralCicleIcon" />
          <div className={`${s.textAround} ${s.textPosition1}`}>
            Голосования и опросы с использованием технологии блок-чейн
          </div>
          <div className={`${s.textAround} ${s.textPosition2}`}>
            Маркетплейс специальных предложений от партнеров
          </div>
          <div className={`${s.textAround} ${s.textPosition3}`}>
            Электронный документооборот
          </div>
          <div className={`${s.textAround} ${s.textPosition4}`}>
            Постановка и учёт выполнения задач
          </div>
          <div className={`${s.textAround} ${s.textPosition5}`}>
            Конструктор оргструктуры, процессов и их автоматизация
          </div>
          <div className={`${s.textAround} ${s.textPosition6}`}>
            Инструменты краудсорсинга, краудфандинга и геймификации (награды,
            конкурсы)
          </div>
          <div className={`${s.textAround} ${s.textPosition7}`}>
            Учет участников и Единый цифровой паспорт общественного деятеля и
            возможность работы в одном ЛК по нескольким организациям
          </div>
          <div className={`${s.textAround} ${s.textPosition8}`}>
            Личный кабинет работодателя для онлайн взаимодействия с
            общественными организациями
          </div>
          <div className={`${s.textAround} ${s.textPosition9}`}>
            Инструменты аналитики для организации и контролирующих органов
          </div>
          <div className={`${s.textAround} ${s.textPosition10}`}>
            Централизованные рассылки и уведомления
          </div>
          <div className={`${s.textAround} ${s.textPosition11}`}>
            Инструменты коммуникации и обмена знаниями (чат, видеоконференции,
            наставничество, база знаний)
          </div>
          <div className={`${s.textAround} ${s.textPosition12}`}>
            Защита персональных данных в соответствии с требованиями
            законодательства
          </div>
          <div className={`${s.textAround} ${s.textPosition13}`}>
            API для интеграции с 1С,
            <br /> платежными сервисами, внешними ИС
            <br />
            (например, ППО Молоко)
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingBlock2;
