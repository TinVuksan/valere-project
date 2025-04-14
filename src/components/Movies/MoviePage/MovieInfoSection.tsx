import { MovieDetails } from '@/types/Movie';
import MovieCreditsGrid from './MovieCreditsGrid';
import MovieMetaInfo from './MovieMetaInfo';

interface Props {
  movie: MovieDetails;
}

const MovieInfoSection = ({ movie }: Props) => {
  return (
    <div className="mx-auto max-w-[1300px] px-8 py-6">
      <div className="mt-6 flex max-h-[700px] flex-col justify-between gap-8 rounded-md border border-blue-300 bg-white/5 p-4 lg:flex-row">
        <div className="flex min-w-[120px] flex-col items-center">
          <h4 className="text-xl font-semibold">Score</h4>
          <p className="text-lg">⭐ {movie.vote_average} / 10</p>
          <p className="text-lg">👥 {movie.vote_count} votes</p>
        </div>

        {/* Movie Meta Info */}
        <MovieMetaInfo movie={movie} />

        {/* Overview */}
        <div className="text-md text-center lg:max-w-[500px] lg:text-left">
          <h4 className="mb-1 text-xl font-semibold">Description</h4>
          <p>{movie.overview}</p>
        </div>
      </div>

      {/* CAST GRID */}
      <MovieCreditsGrid movieCast={movie.credits.cast} />
    </div>
  );
};

export default MovieInfoSection;
