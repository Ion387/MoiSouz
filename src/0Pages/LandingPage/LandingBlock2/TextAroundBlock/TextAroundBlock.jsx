import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import s from "./TextAroundBlock.module.css";
import Logo from "2Generics/Logo/Logo";

const TextAroundBlock = (props) => {
  return (
    <div className={s.containerOfTextAround}>
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
        Учет участников и Единый цифровой паспорт общественного деятеля.
        Возможность работы в одном личном кабинете по нескольким организациям
      </div>
      <div className={`${s.textAround} ${s.textPosition8}`}>
        Личный кабинет работодателя для онлайн взаимодействия с общественными
        организациями
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
      </div>
    </div>
  );
};

export default TextAroundBlock;
