import { useEffect, useState } from "react";
import s from "./InputPDF.module.css";
import PDFloading from "1Pictures/Simple/PDFloading.png";
import PDFloaded from "1Pictures/Simple/PDFloaded.png";
import { object } from "yup";
import Icon from "1Pictures/0Icons/0IconsContainer/IconsContainer";

const InputPDF = ({ value, onChange, error, label, labelStyle }) => {
  const [preview, setPreview] = useState(false);

  const onInput = (e) => {
    const file = e.target.files[0];
    if (file == null) return;
    onChange && onChange(file);
  };

  const cancelPDFHandler = () => {
    setTimeout(() => setPreview(false), 10);
    value = null;
  };

  useEffect(() => {
    if (typeof value === "object") {
      setPreview(true);
    }
  }, [value]);

  return (
    <label className={s.inputPDFBlock}>
      <div className={s.PDFBlock}>
        {preview ? (
          <div className={s.PDFloaded}>
            <img src={PDFloaded} alt="PDF icon" />
            <div className={s.PDFText}>{value.name}</div>
            <div className={s.PDFclose} onClick={cancelPDFHandler}>
              <Icon iconName="PDFClose" />
            </div>
          </div>
        ) : (
          <div className={s.PDFloading}>
            <div className={s.input}>
              <input
                accept=".pdf"
                onChange={onInput}
                className={s.inputAvatar}
                id="image-file"
                type="file"
              />
            </div>
            <img src={PDFloading} alt="PDF icon" />
            <div className={s.PDFText} style={labelStyle}>
              {label}
            </div>
          </div>
        )}
      </div>
    </label>
  );
};

export default InputPDF;
