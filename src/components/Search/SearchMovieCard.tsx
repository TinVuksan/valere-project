import { MovieSearchResult } from '@/types/Movie';
import { filePathToImage } from '@/utils/filePathToImage';
import { getYearFromDate } from '@/utils/getYearFromDate';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  movie: MovieSearchResult;
}

const SearchMovieCard = ({ movie }: Props) => {
  return (
    <Link
      className="hover:scale-103 flex w-full max-w-[300px] transform cursor-pointer items-start gap-3 rounded-md border border-gray-700 p-3 transition-all duration-300 ease-in-out"
      href={`/movie/${movie.id}`}
    >
      <Image
        src={filePathToImage(movie.image)}
        alt={movie.name}
        width={70}
        height={100}
        className="rounded-md"
      />
      <div>
        <h2 className="font-medium">{movie.name}</h2>
        <p className="text-sm text-gray-400">{getYearFromDate(movie.release_date)}</p>
      </div>
    </Link>
  );
};

export default SearchMovieCard;
