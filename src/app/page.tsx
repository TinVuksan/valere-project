import MoviesGrid from '@/components/Movies/MoviesGrid';
import { getHomepageData } from '@/lib/api';
import { MovieFilter, MovieObject } from '@/types/Movie';

interface HomepageData {
  topMoviesByGenre: Record<string, MovieObject[]>;
  movieProviders: MovieFilter[];
  newestMovies: MovieObject[];
}

const Home = async () => {
  const { topMoviesByGenre, movieProviders, newestMovies }: HomepageData = await getHomepageData();

  return (
    <div className="m-4 p-4">
      <MoviesGrid
        topMoviesByGenre={topMoviesByGenre}
        movieProviders={movieProviders}
        newestMovies={newestMovies}
      />
    </div>
  );
};

export default Home;
