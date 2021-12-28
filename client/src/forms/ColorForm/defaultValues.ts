import { Color } from "../../types";
import { COLOR_HEX, COLOR_NAME } from ".";

const defaultValues = (color?:Color) => ({
  [COLOR_NAME]: color ? color.name : "",
  [COLOR_HEX]: color ? color.hex : "",
});

export default defaultValues;
