import React, { useState } from "react";
import { ColorContext } from "../contexts/ColorContext";
import { Color } from "../types";

const ColorProvider: React.FC = ({ children }) => {
  const [colors, setColors] = useState<Color[]>([]);
  return (
    <ColorContext.Provider value={{ colors, setColors }}>
      {children}
    </ColorContext.Provider>
  );
};

export default ColorProvider;
