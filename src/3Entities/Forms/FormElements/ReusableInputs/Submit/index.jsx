import { useMemo } from "react";
import s from "./index.module.css";

import Button from "3Entities/Forms/FormElements/Base/Button/Button";

const Submit = ({ errors, value }) => {
  const messages = useMemo(() => {
    if (!errors) return [];
    let result = [];

    const parse = (target) => {
      Object.keys(target).forEach((key) => {
        if (Array.isArray(target[key])) {
          target[key].forEach((el) =>
            el.message ? result.push(el.message) : parse(el),
          );
          return;
        }
        result.push(target[key].message);
      });
    };
    parse(errors);

    return result;
  }, [errors]);

  return (
    <div className={s.submitBlock}>
      <div className={s.gridButton}>
        <Button
          setIsChoiceHobbyPicked
          value={"Отменить"}
          style={{ width: "180px" }}
          type={"button"}
        />
        <Button
          value={value || "Сохранить"}
          style={{ width: "180px" }}
          type={"submit"}
        />
      </div>

      {/*       {messages.map((el) => (
        <div className={s.error}>{el}</div>
      ))} */}
    </div>
  );
};

export default Submit;
