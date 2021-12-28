import React from "react";
import css from "./GeneralLayout.module.scss";

const GeneralLayout: React.FC = ({ children }) => {
  return <div className={css.wrapper}>{children}</div>;
};

export default GeneralLayout;
