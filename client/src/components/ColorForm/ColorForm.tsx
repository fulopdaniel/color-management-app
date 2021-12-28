import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import {
  validationSchema,
  defaultValues,
  ColorFormModel,
  fieldLabels,
  COLOR_NAME,
  COLOR_HEX,
} from "../../forms/ColorForm";
import css from "./ColorForm.module.scss";
import { TextInput } from "../TextInput";
import { ColorPickerInput } from "../ColorPickerInput";
import { useColors } from "../../hooks/useColors";
import { CardLayout } from "../../layouts/CardLayout";
import { useNavigate } from "react-router-dom";

type ColorFormProps = {
  colorName?: string;
};

const ColorForm: React.FC<ColorFormProps> = ({ colorName }) => {
  const {
    addColor,
    updateColor,
    fetchColors,
    isLoading,
    isFetching,
    getColorByName,
  } = useColors();
  const navigate = useNavigate();

  useEffect(() => {
    fetchColors();
  }, []);
  
  useEffect(() => {
    // If colorName does not exist redirect back to list
    if (colorName && !isFetching && !getColorByName(colorName)) {
      navigate("/colors");
    }
  }, [isFetching, colorName]);

  const onSubmit = (data: ColorFormModel) => {
    if (colorName) {
      updateColor(colorName, data).then(() => navigate("/colors"));
    } else {
      addColor(data).then(() => navigate("/colors"));
    }
  };

  return (
    <div className={css.wrapper}>
      <CardLayout isLoading={isFetching}>
        <Button
          className={css.backBtn}
          type="default"
          onClick={() => navigate("/colors")}
          icon={<ArrowLeftOutlined />}
        >
          Back to colors
        </Button>
        <Formik
          validationSchema={validationSchema}
          initialValues={defaultValues(
            colorName ? getColorByName(colorName) : undefined
          )}
          onSubmit={onSubmit}
        >
          <Form className={css.vertical}>
            <TextInput label={fieldLabels[COLOR_NAME]} name={COLOR_NAME} />
            <ColorPickerInput label={fieldLabels[COLOR_HEX]} name={COLOR_HEX} />
            <Button type="primary" loading={isLoading} htmlType="submit">
              Save
            </Button>
          </Form>
        </Formik>
      </CardLayout>
    </div>
  );
};

export default ColorForm;
