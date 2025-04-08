import { fetchNewestMovies } from '@/actions/tmdb';
import MoviesGrid from '@/components/Movies/MoviesGrid';
import { MovieFilter, MovieObject } from '@/types/Movie';

interface HomepageData {
  topMoviesByGenre: Record<string, MovieObject[]>;
  movieProviders: MovieFilter[];
  newestMovies: MovieObject[];
}

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/homepageData');
  if (!res.ok) {
    const text = await res.text();
    console.error('API route failed with status', res.status);
    console.error('Raw response:', text); // log any HTML error page or backend crash
    throw new Error('Failed to fetch homepage data');
  }

  const { topMoviesByGenre, movieProviders, newestMovies }: HomepageData = await res.json();
  console.log(topMoviesByGenre);
  console.log('Providers1: ', movieProviders);

  const testData = await fetchNewestMovies();
  console.log(testData);

  return (
    <div className="m-4 p-4">
      <MoviesGrid
        topMoviesByGenre={topMoviesByGenre}
        movieProviders={movieProviders}
        newestMovies={newestMovies}
      />
    </div>
  );
}
