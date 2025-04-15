import { MovieObject } from '@/types/Movie';
import { filePathToImage } from '@/utils/filePathToImage';
import Image from 'next/image';
import Link from 'next/link';
import { FavoriteMovieIcon } from './FavoriteMovieIcon';

interface Props {
  movie: MovieObject;
  priorityLoading: boolean;
  enlarged?: boolean;
}

export const MovieCard = ({ movie, priorityLoading, enlarged }: Props) => {
  const width = enlarged ? 250 : 200;
  const height = enlarged ? 350 : 300;
  return (
    <div
      key={movie.id}
      className="hover:scale-103 transform cursor-pointer overflow-hidden rounded-xl shadow-lg shadow-indigo-500/15 transition-all duration-300 ease-in-out hover:shadow-indigo-500/30"
      style={{ width, height }}
    >
      <Link href={`/movie/${movie.id}`}>
        <div className="w-[250px] rounded-t-xl">
          <Image
            alt={movie.title}
            src={filePathToImage(movie.poster_path)}
            priority={priorityLoading}
            width={width}
            height={height}
            quality={80}
          />
        </div>
      </Link>
      <FavoriteMovieIcon pxSize={20} movie={{ id: movie.id, name: movie.original_title }} />
    </div>
  );
};
