import { MovieObject } from '@/types/Movie';

export const sortAlphabetical = (array: MovieObject[], key: keyof MovieObject): MovieObject[] => {
  return [...array].sort((a, b) => {
    const stringA = String(a[key]).toUpperCase();
    const stringB = String(b[key]).toUpperCase();

    if (stringA < stringB) return -1;
    if (stringA > stringB) return 1;
    return 0;
  });
};
