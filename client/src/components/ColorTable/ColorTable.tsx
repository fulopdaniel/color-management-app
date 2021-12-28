import { Button, Table } from "antd";
import React, { useEffect } from "react";
import { format } from "date-fns";
import { ColorLabel } from "./ColorLabel";
import css from "./ColorTable.module.scss";
import { Color } from "../../types";
import { RowActions } from "./RowActions";
import { useColors } from "../../hooks/useColors";
import { CardLayout } from "../../layouts/CardLayout";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Hex",
    dataIndex: "hex",
    key: "hex",
    render: (hex: string) => <ColorLabel hex={hex} />,
  },
  {
    title: "Updated at",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (date: Date) => (
      <span>{format(new Date(date), "yyyy-MM-dd HH:mm")}</span>
    ),
  },
  {
    title: "Created at",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: Date) => (
      <span>{format(new Date(date), "yyyy-MM-dd HH:mm")}</span>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_value: any, color: Color) => <RowActions color={color} />,
  },
];

const ColorTable: React.FC = () => {
  const { colors, isFetching, fetchColors } = useColors();
  const navigate = useNavigate();

  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <div className={css.wrapper}>
      <Button
        className={css.btn}
        type="primary"
        onClick={() => navigate("/addcolor")}
      >
        Add new color
      </Button>
      <CardLayout style={{ padding: 0 }}>
        <Table
          columns={columns}
          dataSource={colors}
          rowKey={(color: Color) => color.id}
          loading={isFetching}
        />
      </CardLayout>
    </div>
  );
};

export default ColorTable;
