import { createContext } from "react";
import { Color } from "../types";

interface ColorContextType {
  colors: Color[];
  setColors: React.Dispatch<React.SetStateAction<Color[]>>
}

export const ColorContext = createContext<ColorContextType>({
  colors: [],
  setColors: () => {},
});
