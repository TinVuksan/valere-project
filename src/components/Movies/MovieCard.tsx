import { MovieObject } from '@/types/Movie';
import { filePathToImage } from '@/utils/filePathToImage';
import Image from 'next/image';
import { FavoriteMovieIcon } from '../FavoriteMovieIcon/FavoriteMovieIcon';

interface Props {
  movie: MovieObject;
  priorityLoading: boolean;
}

export const MovieCard = ({ movie, priorityLoading }: Props) => {
  return (
    <div
      key={movie.id}
      className="hover:scale-103 w-[250px] transform overflow-hidden rounded-xl shadow-lg shadow-indigo-500/15 transition-all duration-300 ease-in-out hover:shadow-indigo-500/30"
    >
      <div className="relative rounded-t-xl">
        <Image
          alt={movie.title}
          src={filePathToImage(movie.poster_path)}
          priority={priorityLoading}
          height={320}
          width={300}
          quality={80}
        />

        <FavoriteMovieIcon movieId={movie.id} />
      </div>
    </div>
  );
};
