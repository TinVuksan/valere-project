import { fetchMovieDetails } from '@/actions/tmdb';
import MovieHeaderSection from '@/components/Movies/MoviePage/MovieHeaderSection';
import MovieInfoSection from '@/components/Movies/MoviePage/MovieInfoSection';
import { getHomepageMovieIds } from '@/utils/getHomepageMovieIds';

interface Props {
  params: { id: number };
}
export const generateStaticParams = async () => {
  const movieIds = await getHomepageMovieIds();
  return movieIds.map((id) => ({
    id: id.toString(),
  }));
};

export const revalidate = 60;
export const dynamic = 'auto';

const MoviePage = async ({ params }: Props) => {
  const movie = await fetchMovieDetails(params.id);

  return (
    <div>
      <MovieHeaderSection movie={movie} />
      <MovieInfoSection movie={movie} />
    </div>
  );
};

export default MoviePage;
