import s from "./PrintedFormJoin.module.css";
import moment from "moment";
import Button from "3Entities/Forms/FormElements/Base/Button/Button";
import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintedFormJoin = ({
  printRef,
  savePDF,
  targetRef,
  toPDF,
  saveHandler,
  printHandler,
  setIsShowPrintedForm,
}) => {
  const unionTrade =
    "Профсоюзная организация аппарата Московской областной организации профсоюза работников здравохранения РФ";
  const directorName = "Еременко В.Н.";
  const user = "Кормушкин Владимир Ярославович";
  const isFemale = false;
  const date = moment(new Date()).format("DD.MM.YYYY");
  const displayprintedForm = "none";
  const profession = "Главный врач";
  /*   useEffect(() => {
    if (savePDF > 0) {
      toPDF();
    }
  }, [savePDF]); */

  return (
    <div className={s.main}>
      <div className={s.buttons}>
        <Button
          value={"Отмена"}
          onClick={() => setIsShowPrintedForm(false)}
          style={{ width: "200px" }}
          white
        />

        <Button
          value={"Скачать"}
          onClick={() => toPDF()}
          style={{ width: "200px" }}
        />

        <Button
          value={"Распечатать"}
          onClick={printHandler}
          style={{ width: "200px" }}
        />
      </div>
      <div className={s.printedForm} ref={targetRef}>
        <div ref={printRef}>
          <div className={s.joinForm}>
            <div className={s.header}>
              <div className={s.headerTo}>
                Кому:
                <div className={s.unionTrade}>{unionTrade}.</div>
                <div className={s.unionTradeDirector}>
                  Председателю: {directorName}
                </div>
              </div>

              <div className={s.headerFrom}>
                От:
                <div className={s.user}>{user}</div>
                <div>{profession}</div>
              </div>
            </div>
            <div className={s.title}>Заявление</div>
            <div className={s.body}>
              Прошу принять меня в члены профсоюза работников здравоохранения РФ
              c {date} . <br />С уставом Профсоюза работников здравоохранения РФ
              ознакомлен
              {isFemale && "a"}.
            </div>
            <div className={s.signatureBlock}>
              {date}
              <div className={s.signature}>___________________ {user}</div>
            </div>
          </div>
        </div>

        <div className={s.paymentForm}>
          <div className={s.header}>
            <div className={s.headerTo}>
              Кому:
              <div className={s.unionTrade}>{unionTrade}.</div>
              <div className={s.unionTradeDirector}>
                Председателю: {directorName}
              </div>
            </div>

            <div className={s.headerFrom}>
              От:
              <div className={s.user}>{user}</div>
              <div>{profession}</div>
            </div>
          </div>
          <div className={s.title}>Заявление</div>
          <div className={s.body}>
            На основании ст.28 Федерального закона «О профессиональных союзах,
            их правах и гарантиях деятельности» прошу ежемесячно удерживать из
            моей заработной платы членские профсоюзные взносы в размере 1%
            (одного процента) и перечислять их на счет, профсоюзной организации
            с {date}.
          </div>
          <div className={s.signatureBlock}>
            {date}
            <div className={s.signature}>___________________ {user}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintedFormJoin;
