import { fetchNewestMovies, mapTopMoviesByGenre } from '@/actions/tmdb';

export const getHomepageMovieIds = async () => {
  const allIds: Set<number> = new Set();

  try {
    const newestMoviesResponse = await fetchNewestMovies();
    newestMoviesResponse.results.forEach((movie) => {
      if (movie.id && movie.poster_path) {
        allIds.add(movie.id);
      }
    });
  } catch (error) {
    console.error('[generateStaticParams] Failed to fetch newest movies: ', error);
  }

  try {
    const moviesByGenre = await mapTopMoviesByGenre();
    Object.values(moviesByGenre).forEach((movies) => {
      movies.forEach((movie) => {
        if (movie.id && movie.poster_path) {
          allIds.add(movie.id);
        }
      });
    });
  } catch (error) {
    console.error('[generateStaticParams] Failed to fetch movies by genre: ', error);
  }

  return Array.from(allIds).map((id) => id.toString());
};
