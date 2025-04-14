'use client';
import { MoviesByGenre } from '@/types/Movie';
import { Fragment } from 'react';
import MovieCarousel from '../MovieCarousel';

interface Props {
  movies: MoviesByGenre;
}

export const MoviesByGenreGrid = ({ movies }: Props) => {
  return (
    <div className="mt-10">
      {Object.entries(movies).map(([genre, items], index) => (
        <Fragment key={index}>
          <MovieCarousel movies={items} title={genre} key={index} />
        </Fragment>
      ))}
    </div>
  );
};
