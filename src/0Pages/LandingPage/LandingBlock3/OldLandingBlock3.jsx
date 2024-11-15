import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";
import s from "./LandingBlock3.module.css";
import StepsBlock from "./StepsBlock/StepsBlock";

const LandingBlock3 = (props) => {
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.title}>
          5 ПРОСТЫХ ШАГОВ К УСПЕШНОМУ
          <br />
          ПРОФСОЮЗУ
        </div>

        <div className={s.topFlex}>
          <div className={s.stepsBlock}>
            <StepsBlock
              step={"Шаг 1."}
              title={"Зарегистрируйстесь"}
              text={
                "после проверки данных с использованием ЕГРЮЛ будет обеспечен доступ в сервис"
              }
            />
          </div>
          <div className={s.stepsBlock}>
            <StepsBlock
              step={"Шаг 3."}
              title={"Ввод основных данных"}
              text={
                "используя пошаговый мастер введите необходимые данные в систему"
              }
            />
          </div>
          <div className={s.stepsBlock}>
            <StepsBlock
              step={"Шаг 5."}
              title={"Настройте структуру и автоматизируйте процессы"}
              text={
                "Конструктор процессов и структуры позволяют автоматизировать работу без лишних сложностей"
              }
            />
          </div>
        </div>
        <div className={s.bottomFlex}>
          <div className={s.stepsBlock}>
            <StepsBlock
              step={"Шаг 2."}
              title={"Выберите опции и оплатите"}
              text={
                "доступна оплата картой и по реквизитам организации (без НДС)"
              }
            />
          </div>
          <div className={s.stepsBlock}>
            <StepsBlock
              step={"Шаг 4."}
              title={"Изучите возможности Элементума"}
              text={
                "Видеоинструкция и примеры использования Элементум  доступны в любой момент времени"
              }
            />
          </div>
        </div>
        <div className={s.arrowTopAbsoluteBlock}>
          <Icon iconName="LandingBlock3ArrowIcon2" />
          <Icon iconName="LandingBlock3ArrowIcon3" />
        </div>

        <div className={s.arrowBottomAbsoluteBlock}>
          <Icon iconName="LandingBlock3ArrowIcon1" />

          <Icon iconName="LandingBlock3ArrowIcon4" />
        </div>
      </div>
    </div>
  );
};

export default LandingBlock3;
