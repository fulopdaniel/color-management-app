import React from "react";
import { ColorTable } from "../../components/ColorTable";
import { GeneralLayout } from "../../layouts/GeneralLayout";

const ColorList: React.FC = () => {

  return (
    <GeneralLayout>
      <ColorTable />
    </GeneralLayout>
  );
};

export default ColorList;
