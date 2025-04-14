export const getRuntimeHours = (runtime: number): string => {
  const hoursString = `${Math.floor(runtime / 60)}h`;
  const minutesString = `${runtime % 60}min`;

  return hoursString + minutesString;
};
