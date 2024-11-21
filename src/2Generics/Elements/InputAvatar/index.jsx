import { useState } from "react";
import s from "./index.module.css";

import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";

const InputAvatar = ({ value, onChange, error }) => {
  const [preview, setPreview] = useState(value);

  const previewHandler = (e) => {
    const file = e.target.files[0];

    const urlImage = URL.createObjectURL(file);
    const formData = new FormData();
    formData.append("avatar", file);
    setPreview(urlImage);
  };

  return (
    <label
      className={s.inputAvatarBlock}
      style={error && { borderColor: "red" }}
    >
      <input
        onChange={previewHandler}
        className={s.inputAvatar}
        id="image-file"
        type="file"
      />

      {preview ? (
        <div className={s.avaterPreview}>
          <img
            src={preview}
            className={s.avaterPreview}
            alt="input-avatar"
            onLoad={({ target }) => onChange && onChange(target.src)}
          />
        </div>
      ) : (
        <div className={s.inputLableBlock}>
          <div className={s.inputAvatarText}>
            Добавить
            <br />
            фото
          </div>
          <div className={s.addAvatarIcon}>
            <Icon iconName="addSomethingIcon" />
          </div>
        </div>
      )}
    </label>
  );
};

export default InputAvatar;
