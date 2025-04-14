import { fetchMovieGenres } from '@/actions/tmdb';
import MoviesByPopularityGrid from '@/components/Movies/MoviesGrid/MoviesByPopularityGrid';

const MostWatchedPage = async () => {
  const { genres } = await fetchMovieGenres();

  return <MoviesByPopularityGrid genres={genres} />;
};

export default MostWatchedPage;
