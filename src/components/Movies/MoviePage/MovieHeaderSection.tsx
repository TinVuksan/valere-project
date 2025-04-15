import { MovieDetails } from '@/types/Movie';
import { filePathToImage } from '@/utils/filePathToImage';
import Image from 'next/image';
import { FavoriteMovieIcon } from '../FavoriteMovieIcon';

interface Props {
  movie: MovieDetails;
}

const MovieHeaderSection = ({ movie }: Props) => {
  return (
    <div className="relative h-[70vh] w-full">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <FavoriteMovieIcon pxSize={35} movie={{ id: movie.id, name: movie.original_title }} />
        <h1 className="text-6xl font-bold">{movie.title}</h1>
        <h2 className="mt-2 text-3xl font-semibold">{movie.tagline || ''}</h2>
      </div>

      <Image
        alt={movie.title}
        src={filePathToImage(movie.backdrop_path)}
        layout="fill"
        objectFit="cover"
        className="z-0 object-cover"
        quality={70}
      />
      <div className="absolute inset-0 z-0 bg-black opacity-60"></div>

      <Image
        alt={movie.title}
        src={filePathToImage(movie.poster_path)}
        height={750}
        width={350}
        className="absolute bottom-1/2 left-5 z-20 hidden h-[auto] translate-y-1/2 transform rounded-lg shadow-lg md:hidden lg:block lg:w-[20vw]"
        quality={50}
      />
    </div>
  );
};

export default MovieHeaderSection;
