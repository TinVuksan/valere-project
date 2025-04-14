export const getYearFromDate = (dateString: string): string => {
  const date = new Date(dateString);
  return String(date.getFullYear());
};
