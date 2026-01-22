export const normalizeTech = (value?: string | string[]) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.map(v => v.trim()).filter(Boolean);
  }

  return value
    .split(",")
    .map(v => v.trim())
    .filter(Boolean);
};
