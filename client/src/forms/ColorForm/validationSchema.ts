
import * as yup from "yup";
import { COLOR_HEX, COLOR_NAME } from "./fieldNames";

const validationSchema =  yup.object({
    [COLOR_NAME]: yup.string().required("Color name is required"),
    [COLOR_HEX]: yup
      .string()
      .required("Color hex is required")
      .matches(
        /^(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3})$/,
        "Invalid hex format. Only #XXX or #XXXXXX is permitted."
      ),
  });

export default validationSchema;
