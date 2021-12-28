import { Request, Response } from 'express';
import * as ColorService from '@services/ColorService';
import { ERROR_CODES } from '@const';
import { isValidHex } from '@util';

export const getColorByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    if (!name) throw new Error(ERROR_CODES.INVALID_REQUEST);

    const color = await ColorService.getColorByName(name);
    if (!color) throw new Error(ERROR_CODES.NOT_FOUND);

    return res.send(color);
  } catch (e) {
    return getError(e, res);
  }
};

export const getAllColors = async (req: Request, res: Response) => {
  try {
    const colors = await ColorService.getAllColors();
    return res.send(colors);
  } catch (e) {
    return getError(e, res);
  }
};

export const updateColorByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const { name: newName, hex } = req.body;
    const isBodyValid = newName && hex && isValidHex(hex);

    if (!name || !isBodyValid) throw new Error(ERROR_CODES.INVALID_REQUEST);

    const color = await ColorService.updateColorByName(name, newName, hex);
    return res.send(color);
  } catch (e) {
    return getError(e, res);
  }
};

export const createColor = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const { hex } = req.body;
    if (!name || !hex || !isValidHex(hex))
      throw new Error(ERROR_CODES.INVALID_REQUEST);

    const color = await ColorService.createColor(name, hex);
    return res.send(color);
  } catch (e) {
    return getError(e, res);
  }
};

export const removeColorByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    if (!name) throw new Error(ERROR_CODES.INVALID_REQUEST);

    const removedColor = await ColorService.removeColorByName(name);
    if (!removedColor) throw new Error(ERROR_CODES.NOT_FOUND);
    return res.send(removedColor);
  } catch (e) {
    return getError(e, res);
  }
};

const getError = (error: Error, res: Response) => {
  switch (error.message) {
    case ERROR_CODES.INVALID_REQUEST: {
      return res.status(400).send({ code: error.message });
    }
    case ERROR_CODES.NOT_FOUND: {
      return res.status(404).send({ code: error.message });
    }
    case ERROR_CODES.NAME_TAKEN: {
      return res.status(400).send({ code: error.message });
    }
    default: {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
  }
};
