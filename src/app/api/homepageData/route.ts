import { fetchMovieProviders, fetchNewestMovies, mapTopMoviesByGenre } from '@/actions/tmdb';
import { MovieFilter, MovieObject, MovieProvider } from '@/types/Movie';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const [topMoviesByGenre, providers, newestMoviesResponse] = await Promise.all([
      mapTopMoviesByGenre(),
      fetchMovieProviders(),
      fetchNewestMovies(),
    ]);

    const movieProviders: MovieFilter[] = providers.results.map((provider: MovieProvider) => ({
      id: provider.provider_id,
      name: provider.provider_name,
    }));

    const newestMovies: MovieObject[] = newestMoviesResponse.results.filter(
      (movie) => movie.poster_path
    );

    return NextResponse.json({
      topMoviesByGenre,
      movieProviders,
      newestMovies,
    });
  } catch (error) {
    console.error('[API ERROR] homepageData route failed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
