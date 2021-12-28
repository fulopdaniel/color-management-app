import { ERROR_CODES } from '@const';
import * as ColorDAO from '@daos/ColorDAO';

export const getColorByName = async (name: string) => {
  const color = await ColorDAO.getColorByName(name);
  return color;
};

export const getAllColors = async () => {
  const colors = await ColorDAO.getAllColors();
  return colors;
};

export const updateColorByName = async (
  name: string,
  newName: string,
  newHex?: string
) => {
  const existingColor = await ColorDAO.getColorByName(name);
  if (!existingColor) throw new Error(ERROR_CODES.NOT_FOUND);

  const isNameTaken =
    newName !== name && !!(await ColorDAO.getColorByName(newName));
  if (isNameTaken) throw new Error(ERROR_CODES.NAME_TAKEN);

  const color = await ColorDAO.updateColorByName(
    name,
    newName || name,
    newHex || existingColor.hex
  );
  return color;
};

export const removeColorByName = async (name: string) => {
  const color = await ColorDAO.removeColorByName(name);
  return color;
};

export const createColor = async (name: string, hex: string) => {
  const isNameTaken = !!(await ColorDAO.getColorByName(name));
  if (isNameTaken) throw new Error(ERROR_CODES.NAME_TAKEN);

  const color = await ColorDAO.createColor(name, hex);
  return color;
};
