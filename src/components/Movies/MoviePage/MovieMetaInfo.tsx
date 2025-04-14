import { MovieDetails } from '@/types/Movie';
import { getRuntimeHours } from '@/utils/getRuntimeHours';

interface Props {
  movie: MovieDetails;
}

const MovieMetaInfo = ({ movie }: Props) => {
  return (
    <div className="flex flex-1 flex-col flex-wrap items-center justify-center gap-6 text-lg lg:flex-row lg:items-start lg:justify-start">
      <div className="place-items-center">
        <h4 className="text-xl font-semibold">Genre</h4>
        <p>{movie.genres.map((genre) => genre.name).join(', ')}</p>
      </div>
      <div>
        <h4 className="text-xl font-semibold">Duration</h4>
        <p>{getRuntimeHours(movie.runtime)}</p>
      </div>
      <div>
        <h4 className="text-xl font-semibold">Country</h4>
        <p>{movie.origin_country.join(', ') || 'N/A'}</p>
      </div>
    </div>
  );
};

export default MovieMetaInfo;
