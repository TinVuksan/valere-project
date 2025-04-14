import { fetchMovieDetails } from '@/actions/tmdb';
import MovieHeaderSection from '@/components/Movies/MoviePage/MovieHeaderSection';
import MovieInfoSection from '@/components/Movies/MoviePage/MovieInfoSection';
import { getHomepageMovieIds } from '@/utils/getHomepageMovieIds';
import { notFound } from 'next/navigation';

export const generateStaticParams = async () => {
  const movieIds = await getHomepageMovieIds();

  return movieIds.map((id) => ({
    id: String(id),
  }));
};

export const revalidate = 60;
export const dynamic = 'auto';

const MoviePage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const { id } = params;
  const movie = await fetchMovieDetails(Number(id));

  if (!movie) {
    console.warn(`Movie not found for ID ${params.id}`);
    notFound();
  }

  return (
    <div>
      <MovieHeaderSection movie={movie} />
      <MovieInfoSection movie={movie} />
    </div>
  );
};

export default MoviePage;
