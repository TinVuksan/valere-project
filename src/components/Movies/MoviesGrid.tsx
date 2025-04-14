import { MovieFilter, MovieObject, MoviesByGenre } from '@/types/Movie';
import { MoviesByGenreGrid } from './MoviesGrid/MoviesByGenreGrid';
import { MoviesByProviderGrid } from './MoviesGrid/MoviesByProviderGrid';
import { MoviesByReleaseDateGrid } from './MoviesGrid/MoviesByReleaseDateGrid';

interface Props {
  topMoviesByGenre: MoviesByGenre;
  movieProviders: MovieFilter[];
  newestMovies: MovieObject[];
}

const MoviesGrid = ({ topMoviesByGenre, movieProviders, newestMovies }: Props) => {
  return (
    <>
      <MoviesByProviderGrid movieProviders={movieProviders} />
      <MoviesByReleaseDateGrid movies={newestMovies} />
      <MoviesByGenreGrid movies={topMoviesByGenre} />
    </>
  );
};

export default MoviesGrid;
