import { useContext, useState } from "react";
import { ColorContext } from "../contexts/ColorContext";
import { Color } from "../types";
import axios from "axios";
import { API_ENDPOINT } from "../constants";
import { ColorFormModel } from "../forms/ColorForm";
import { message } from "antd";

export const useColors = () => {
  const { colors, setColors } = useContext(ColorContext);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getColorByName = (name: string) => {
    return colors.find((color) => color.name === name);
  };

  const fetchColors = async () => {
    if (!colors.length) {
      try {
        const response = await axios.get<Color[]>(API_ENDPOINT + "/color");
        setColors(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsFetching(false);
      }
    } else {
      setIsFetching(false)
    }
  };

  const addColor = async (color: ColorFormModel) => {
    try {
      setIsLoading(true);
      const response = await axios.put<Color>(
        API_ENDPOINT + `/color/${color.name}`,
        color
      );
      setColors([...colors, response.data]);
      message.success("Color added");
    } catch (e) {
      console.error(e);
      message.error("An error occured");
    } finally {
      setIsLoading(false);
    }
  };

  const updateColor = async (name: string, color: ColorFormModel) => {
    try {
      setIsLoading(true);
      const response = await axios.post<Color>(
        API_ENDPOINT + `/color/${name}`,
        color
      );
      const newColors = colors.map((c) =>
        c.name === name ? response.data : c
      );
      message.success("Color updated");
      setColors(newColors);
    } catch (e) {
      console.error(e);
      message.error("An error occured");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteColor = async (name: string) => {
    try {
      setIsLoading(true);
      const response = await axios.delete<Color>(
        API_ENDPOINT + `/color/${name}`
      );
      setColors(colors.filter((c) => c.id !== response.data.id));
      message.success("Color deleted");
    } catch (e) {
      console.error(e);
      message.error("An error occured");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    colors,
    setColors,
    addColor,
    deleteColor,
    updateColor,
    getColorByName,
    fetchColors,
    isLoading,
    isFetching,
  };
};
