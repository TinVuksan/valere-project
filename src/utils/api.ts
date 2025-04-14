import { MovieApiResponse, MovieObject } from '@/types/Movie';
import { SortOrder } from '@/types/enums';

interface MostWatchedData {
  mostWatchedMovies: MovieApiResponse<MovieObject[]>;
}

export const fetchMostWachedMoviesData = async (
  filter: keyof MovieObject = 'popularity',
  order: SortOrder = SortOrder.DESC,
  genre?: string,
  page?: number
) => {
  let url = `http://localhost:3000/api/mostWatchedData?page=${page || 1}&sort_by=${filter}.${order}`;
  if (genre) {
    url += `&with_genres=${genre}`;
  }
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch most watched movies');
  }
  const { mostWatchedMovies }: MostWatchedData = await res.json();
  return mostWatchedMovies;
};
