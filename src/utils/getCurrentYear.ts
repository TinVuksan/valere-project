export const getCurrentYear = (): number => {
  const date = new Date();
  const year = date.getFullYear();
  return year;
};
