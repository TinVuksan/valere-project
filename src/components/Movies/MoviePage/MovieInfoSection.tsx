import { MovieDetails } from '@/types/Movie';
import { GoPeople } from 'react-icons/go';
import { MdOutlineGrade } from 'react-icons/md';
import MovieCreditsGrid from './MovieCreditsGrid';
import MovieMetaInfo from './MovieMetaInfo';

interface Props {
  movie: MovieDetails;
}

const MovieInfoSection = ({ movie }: Props) => {
  return (
    <div className="mx-auto max-w-[1300px] px-8 py-6">
      <div className="mt-6 flex max-h-fit flex-col justify-between gap-8 rounded-md border border-blue-300 bg-white/5 p-4 lg:flex-row">
        <div className="flex min-w-[120px] flex-col items-center">
          <h4 className="text-xl font-semibold">Score</h4>
          <div className="flex items-center">
            <MdOutlineGrade size={25} className="mr-1" />
            <p className="text-lg">{movie.vote_average.toFixed(2)} / 10</p>
          </div>
          <div className="flex items-center">
            <GoPeople size={25} className="mr-1" />
            <p className="text-lg">{movie.vote_count} votes</p>
          </div>
        </div>

        <MovieMetaInfo movie={movie} />

        <div className="text-md text-center lg:max-w-[500px] lg:text-left">
          <h4 className="mb-1 text-xl font-semibold">Description</h4>
          <p>{movie.overview}</p>
        </div>
      </div>

      <MovieCreditsGrid movieCast={movie.credits.cast} />
    </div>
  );
};

export default MovieInfoSection;
