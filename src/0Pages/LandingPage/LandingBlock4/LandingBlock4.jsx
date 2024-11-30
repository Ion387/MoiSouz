import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import s from "./LandingBlock4.module.css";
import LandingBlock1InfoSection from "./LandingBlock4InfoSection/LandingBlock4InfoSection";
import LandingBlock4InfoSection from "./LandingBlock4InfoSection/LandingBlock4InfoSection";

const LandingBlock4 = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.title}>ПЛЮСЫ ДЛЯ ПРОФСОЮЗА</div>
        <div className={s.block4Sections}>
          <LandingBlock4InfoSection
            title={"БЕСПЛАТНО"}
            text={
              "Базовый функционал всегда доступен бесплатно интеграция с 1 системой в год на платных тарифах"
            }
            rightTitle={"До 50%"}
            rightText={"Снижение стоимости владения в сравнении с аналогами"}
          />

          <LandingBlock4InfoSection
            title={"БЕЗОПАСНО"}
            text={
              "Персональные данные пользователей защищены в соответствии с законом"
            }
            rightTitle={"До 50%"}
            rightText={"Ускорение внутренних процедур за счет автоматизации"}
          />

          <LandingBlock4InfoSection
            title={"ЧЕСТНО"}
            text={
              "Прозрачная система голосований, опросов и принятия решений, и невозможность подделки результатов"
            }
            rightTitle={"До 20%"}
            rightText={
              "Рост бюджета за счёт роста престижа и привлечения новых участников"
            }
          />

          <LandingBlock4InfoSection
            title={"ЭФФЕКТИВНО"}
            text={
              "Больше времени на основную деятельность позволяет повышать качество, производительность и безопасности труда, обеспечить контролируемый рост оплаты труда и улучшение условий"
            }
            rightTitle={"До 10%"}
            rightText={
              "Рост бюджета за счёт внедрения новых инструментов краудсорсинга и краудфандинга на реализацию знаковых проектов"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LandingBlock4;
