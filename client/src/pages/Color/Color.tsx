import React from "react";
import { useParams } from "react-router-dom";
import { ColorForm } from "../../components/ColorForm";
import { GeneralLayout } from "../../layouts/GeneralLayout";

type ColorProps = any;

const Color: React.FC<ColorProps> = () => {
  const { color } = useParams();
  
  return (
    <GeneralLayout>
      <ColorForm colorName={color} />
    </GeneralLayout>
  );
};

export default Color;
