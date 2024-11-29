import Button from "3Entities/Forms/FormElements/Base/Button/Button";
import s from "./LandingBlock6InfoSection.module.css";
import { Link } from "react-router-dom";

const LandingBlock6InfoSection = (props) => {
  let text = props.text.map((i) => (
    <div key={i} className={s.text}>
      {i}
    </div>
  ));
  return (
    <div style={props.styleInfoblock} className={s.infoblock}>
      <div className={s.titleBlock}>
        <div className={s.title}>{props.title}</div>
        <div className={s.money}>{props.money}</div>
        <div className={s.addition}>{props.addition}</div>
      </div>
      <div className={s.textBlock}>
        <div style={props.styleBoldText} className={s.boldText}>
          {props.boldText}
        </div>
        <div className={`${s.text} ${s.textColor}`}>{text}</div>
      </div>
      {props.bottomBlock && (
        <div className={s.addBottomBlock}>
          * Для организаций с количеством <br /> пользователей от 25 000 до 75
          000 тысяч <br />
          предусмотрены индивидуальные условия
        </div>
      )}

      <Link to="/" className={s.orderButton}>
        <Button
          value={"Оформить подписку"}
          style={
            props.buttonStyle || {
              width: "226px",
              height: "54px",
              fontSize: "16px",
              fontWeight: "600",
              color: "#fff",
            }
          }
        />
      </Link>
    </div>
  );
};

export default LandingBlock6InfoSection;
