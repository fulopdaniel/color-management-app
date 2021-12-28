import React from "react";
import { Form, Input } from "antd";
import { useField } from "formik";

type TextInputProps = {
  name: string;
  label: string;
  placeholder?: string;
};

const TextInput: React.FC<TextInputProps> = ({ name, label, placeholder }) => {
  const [field, meta, helper] = useField({ name });

  const error = meta.touched && meta.error;
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
      />
    </Form.Item>
  );
};

export default TextInput;
