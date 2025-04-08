import { MovieFilter, MovieObject, MoviesByGenre } from '@/types/Movie';
import { MoviesByGenreGrid } from './MoviesByGenreGrid';
import { MoviesByProviderGrid } from './MoviesByProviderGrid';
import { MoviesByReleaseDateGrid } from './MoviesByReleaseDateGrid';

interface Props {
  topMoviesByGenre: MoviesByGenre;
  movieProviders: MovieFilter[];
  newestMovies: MovieObject[];
}

const MoviesGrid = ({ topMoviesByGenre, movieProviders, newestMovies }: Props) => {
  return (
    <>
      <MoviesByProviderGrid movieProviders={movieProviders} />
      <MoviesByGenreGrid movies={topMoviesByGenre} />
      <MoviesByReleaseDateGrid movies={newestMovies} />
    </>
  );
};

export default MoviesGrid;
