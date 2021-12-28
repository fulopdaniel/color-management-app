import React from "react";
import css from "./ColorLabel.module.scss";

type ColorLabelProps = { hex: string };

const ColorLabel: React.FC<ColorLabelProps> = ({ hex }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.rect} style={{ background: hex }}></div>
      <div className={css.text}>{hex}</div>
    </div>
  );
};

export default ColorLabel;
