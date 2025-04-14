'use client';
import { MovieObject } from '@/types/Movie';
import MovieCarousel from '../MovieCarousel';

interface Props {
  movies: MovieObject[];
}

export const MoviesByReleaseDateGrid = ({ movies }: Props) => {
  return (
    <div className="mt-15">
      <MovieCarousel movies={movies} title="Newest Movies" />
    </div>
  );
};
