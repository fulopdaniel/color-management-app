import { Spin } from "antd";
import React from "react";
import css from "./CardLayout.module.scss";

type CardLayoutProps = {
  style?: React.CSSProperties;
  isLoading?: boolean;
};

const CardLayout: React.FC<CardLayoutProps> = ({
  children,
  style,
  isLoading,
}) => {
  return (
    <div style={style} className={css.wrapper}>
      {isLoading ? (
        <div className={css.center}>
          <Spin />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default CardLayout;
