import React from "react";
import css from "./ColorPickerInput.module.scss";
import { Dropdown, Form, Input } from "antd";
import { useField } from "formik";
import { ChromePicker } from "react-color";

type ColorPickerInputProps = {
  name: string;
  label: string;
  placeholder?: string;
};

const ColorPickerInput: React.FC<ColorPickerInputProps> = ({
  name,
  label,
  placeholder,
}) => {
  const [field, meta, helper] = useField({ name });

  const error = meta.touched && meta.error;
  const currentColor = field.value || "#000";
  return (
    <Form.Item
      label={label}
      validateStatus={error ? "error" : undefined}
      help={error || undefined}
    >
      <Input
        placeholder={placeholder}
        value={field.value}
        onChange={(e) => helper.setValue(e.target.value)}
        onBlur={() => helper.setTouched(true)}
        suffix={
          <Dropdown
            trigger={["click"]}
            overlay={
              <ChromePicker
                disableAlpha
                color={currentColor}
                onChange={(newColor) => helper.setValue(newColor.hex)}
              />
            }
          >
            <div
              className={css.colorButton}
              style={{ background: currentColor }}
            ></div>
          </Dropdown>
        }
      />
    </Form.Item>
  );
};

export default ColorPickerInput;
