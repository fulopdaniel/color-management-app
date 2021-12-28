export const isValidHex = (hex: string): boolean => {
  return !!hex.match(/^(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3})$/);
};
