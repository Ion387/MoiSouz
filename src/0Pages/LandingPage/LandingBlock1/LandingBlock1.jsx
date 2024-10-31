import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import s from "./LandingBlock1.module.css";
import LandingBlock1InfoSection from "./LandingBlock1InfoSection/LandingBlock1InfoSection";

const LandingBlock1 = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <LandingBlock1InfoSection
          title={
            "Ускоряет процессы внутри организации и минимизирует бумажный документооборот"
          }
          text={"Ускоряет работу и повышает гибкость и оперативность действий"}
          iconName="landingDeadlineIcon"
        />
        <LandingBlock1InfoSection
          title={"Повышает уровень мотивации и вовлеченности участников"}
          text={
            "Геймификация, инструменты награждений участников за активную работу, краудсорсинг и краудфандинга"
          }
          iconName="landingTimeOutOfWork"
        />
        <LandingBlock1InfoSection
          title={"Новый подход к организации работы"}
          text={
            "Развитые возможности онлайн общения, формирования задач и контроля их выполнения"
          }
          iconName="landingWorking"
        />
        <LandingBlock1InfoSection
          title={"Ведет историю участия в профсоюзе"}
          text={
            "Сохраняет все данные при смене профсоюза(например, при переезде в другой регион). Личное портфолио всегда под рукой"
          }
          iconName="landingManagment"
        />
        <LandingBlock1InfoSection
          title={"Увеличивает количество участников профсоюза"}
          text={
            "Вследствие вступления в альтернативные и радикальные организации, а также диаспоры"
          }
          iconName="landingHR"
        />
        <LandingBlock1InfoSection
          title={"Формирует статистику"}
          text={
            "Для пользователя и руководства, позволяющую оценить эффективность работы и участия в профсоюзе"
          }
          iconName="landingAddToWithlist"
        />
      </div>
    </div>
  );
};

export default LandingBlock1;
