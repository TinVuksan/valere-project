import { MoviesByGenre } from '@/types/Movie';
import { MovieCard } from './MovieCard';

interface Props {
  movies: MoviesByGenre;
}

export const MoviesByGenreGrid = ({ movies }: Props) => {
  return (
    <>
      {Object.entries(movies).map(([genre, items]) => (
        <div key={genre} className="flex flex-col justify-between">
          <h2 className="text-5xl font-bold text-gray-400 opacity-85">{genre}</h2>
          <div className="gap-15 my-3 flex flex-row justify-start">
            {items.map((movie, index) => (
              <MovieCard key={index} movie={movie} priorityLoading={false} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
