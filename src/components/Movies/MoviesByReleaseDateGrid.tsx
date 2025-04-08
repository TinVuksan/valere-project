import { MovieObject } from '@/types/Movie';
import { MovieCard } from './MovieCard';

interface Props {
  movies: MovieObject[];
}

export const MoviesByReleaseDateGrid = ({ movies }: Props) => {
  console.log('Newest movies: ', movies);
  return (
    <div className="border-1 grid h-full grid-cols-5 gap-4 p-3">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} priorityLoading={false} />
      ))}
    </div>
  );
};
