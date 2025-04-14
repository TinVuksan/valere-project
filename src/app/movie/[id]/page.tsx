import { fetchMovieDetails } from '@/actions/tmdb';
import MovieHeaderSection from '@/components/Movies/MoviePage/MovieHeaderSection';
import MovieInfoSection from '@/components/Movies/MoviePage/MovieInfoSection';
import { getHomepageMovieIds } from '@/utils/getHomepageMovieIds';

export const generateStaticParams = async () => {
  const movieIds = await getHomepageMovieIds();
  return movieIds.map((id) => ({
    id: String(id),
  }));
};

export const revalidate = 60;
export const dynamic = 'auto';

const MoviePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const movie = await fetchMovieDetails(Number(id));
  console.log('params in moviepage: ', params);
  return (
    <div>
      <MovieHeaderSection movie={movie} />
      <MovieInfoSection movie={movie} />
    </div>
  );
};

export default MoviePage;
