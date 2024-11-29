import { useEffect, useState } from "react";
import s from "./PDFinputBody.module.css";

import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";

const PDFinputBody = ({ value, onChange, error, label }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (value == null) {
      setPreview(null);
      return;
    }
    switch (typeof value) {
      case "object":
        const urlImage = URL.createObjectURL(value);
        const formData = new FormData();
        formData.append("avatar", value);
        setPreview(urlImage);
        break;

      case "string":
        setPreview(`${process.env.REACT_APP_SERVER_PATH}${value}`);
        break;

      default:
        break;
    }
  }, [value]);

  const onInput = (e) => {
    const file = e.target.files[0];
    if (file == null) return;
    onChange && onChange(file);
  };

  return (
    <label className={s.inputPDFBlock}>
      <input
        onChange={onInput}
        className={s.inputAvatar}
        id="image-file"
        type="file"
      />

      {preview ? (
        <div className={s.avaterPreview}>
          <img src={preview} className={s.avaterPreview} alt="input-avatar" />
        </div>
      ) : (
        <div className={s.inputLableBlock}>
          <div className={s.inputAvatarText}></div>
          <div className={s.addAvatarIcon}>
            <Icon iconName="addSomethingIcon" />
          </div>
        </div>
      )}
    </label>
  );
};

export default PDFinputBody;
