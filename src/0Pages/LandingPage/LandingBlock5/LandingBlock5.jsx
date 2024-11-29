import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import s from "./LandingBlock5.module.css";
import LandingBlock5InfoSection from "./LandingBlock5InfoSection/LandingBlock5InfoSection";

const LandingBlock5 = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.title}>
          ВЫГОДЫ ДЛЯ УЧАСТНИКА
          <br /> ПРОФСОЮЗА
        </div>
        <div className={s.block5Sections}>
          <div className={s.vertikalLineIcon}>
            <Icon iconName="block5VertikalLineIcon" />
          </div>
          <div className={s.block5Section}>
            <LandingBlock5InfoSection
              leftText={"РОСТ ДОХОДА И ЭКОНОМИЯ ДО 20 000 РУБЛЕЙ"}
              rightText={
                "Повышение заработной платы и улучшение условий труда в организациях с сильным Профсоюзом. Маркетплейс предложений партнеров позволяет получить скидки и снизить стоимость товаров и услуг"
              }
            />
          </div>
          <div className={s.block5Section}>
            <LandingBlock5InfoSection
              leftText={"МИНИМУМ КОНФЛИКТОВ"}
              rightText={
                "Снижение количества трудовых конфликтов и и увеличение скорости их разрешения с четким отслеживанием статуса работы по обращению"
              }
            />
          </div>
          <div className={s.block5Section}>
            <LandingBlock5InfoSection
              leftText={"РОСТ ДОВЕРИЯ К ПРОФСОЮЗУ"}
              rightText={
                "Открытая и прозрачная система голосований и невозможность подделки результатов повышают доверие к Профсоюзу и его лидерам"
              }
            />
          </div>
          <div className={s.block5Section}>
            <LandingBlock5InfoSection
              leftText={"ПОВЫШЕНИЕ ИНТЕРЕСА"}
              rightText={
                "К общественной деятельности, рост инициативы и понимания результатов, которые возможно достигнуть за общественную работу в т.ч. за счет геймификации процесса"
              }
            />
          </div>
          <div className={s.block5Section}>
            <LandingBlock5InfoSection
              leftText={"СОЦИАЛЬНЫЙ ЛИФТ"}
              rightText={
                "Для общественных активистов на основании подтверждённых результатов общественной деятельности и невозможности манипулирования фактами"
              }
            />
          </div>
          <div className={s.block5Section}>
            <LandingBlock5InfoSection
              leftText={"ЗАЩИТА ДАННЫХ"}
              rightText={
                "Персональные данные защищены в соответствии с требованиями законодательства"
              }
            />
          </div>
        </div>{" "}
        \
      </div>
    </div>
  );
};

export default LandingBlock5;
