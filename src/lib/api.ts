import { fetchMovieProviders, fetchNewestMovies, mapTopMoviesByGenre } from '@/actions/tmdb';
import { MovieApiResponse, MovieFilter, MovieObject, MovieProvider } from '@/types/Movie';
import { SortOrder } from '@/types/enums';
import { getBaseUrl } from '@/utils/getBaseUrl';

interface MostWatchedData {
  mostWatchedMovies: MovieApiResponse<MovieObject[]>;
}

export const fetchMostWachedMoviesData = async (
  filter: keyof MovieObject = 'popularity',
  order: SortOrder = SortOrder.DESC,
  genre?: string,
  page?: number
) => {
  let url = `${getBaseUrl()}/api/mostWatchedData?page=${page || 1}&sort_by=${filter}.${order}`;
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

export const getHomepageData = async () => {
  const providers = await fetchMovieProviders();
  const newestMoviesResponse = await fetchNewestMovies();
  const topMoviesByGenre = await mapTopMoviesByGenre();

  const movieProviders: MovieFilter[] = providers.results.map((provider: MovieProvider) => ({
    id: provider.provider_id,
    name: provider.provider_name,
  }));

  const newestMovies: MovieObject[] = newestMoviesResponse.results.filter(
    (movie) => movie.poster_path
  );

  return {
    topMoviesByGenre,
    movieProviders,
    newestMovies,
  };
};
