import prisma from '../../prisma/client';

export const getColorByName = async (name: string) => {
  return prisma.color.findFirst({
    where: {
      name,
    },
  });
};

export const removeColorByName = async (name: string) => {
  return prisma.color.delete({
    where: {
      name,
    },
  });
};

export const updateColorByName = async (
  name: string,
  newName,
  newHex: string
) => {
  return prisma.color.update({
    where: {
      name,
    },
    data: {
      name: newName,
      hex: newHex,
      updatedAt: new Date(),
    },
  });
};

export const getAllColors = async () => {
  return prisma.color.findMany();
};

export const createColor = async (name: string, hex: string) => {
  return prisma.color.create({
    data: {
      name,
      hex,
    },
  });
};
