import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Popconfirm} from "antd";
import { Color } from "../../../types";
import css from "./RowActions.module.scss";
import { useColors } from "../../../hooks/useColors";
import { useMount } from "../../../hooks/useMount";

type RowActionsProps = {
  color: Color;
};

const RowActions: React.FC<RowActionsProps> = ({ color }) => {
  const { deleteColor, isLoading } = useColors();
  const isMounted = useMount();

  const onDelete = () => {
    deleteColor(color.name);
  };



  return (
    <div className={css.wrapper}>
      <Link to={`/colors/${color.name}`}>
        <Button className={css.btn} type="link">
          Edit
        </Button>
      </Link>
      <Popconfirm
        title="Are you sure you want to delete this color?"
        onConfirm={onDelete}
        okText="Yes"
        cancelText="No"
      >
        <Button
          loading={isMounted && isLoading}
          className={css.btn}
          type="link"
          danger
        >
          Delete
        </Button>
      </Popconfirm>
    </div>
  );
};

export default RowActions;
