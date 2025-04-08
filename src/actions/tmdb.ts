import { MovieApiResponse, MovieFilter, MoviesByGenre } from '@/types/Movie';
import { getCurrentYear } from '@/utils/getCurrentYear';

const BASE_URL = 'https://api.themoviedb.org/3';

const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
};

const convertToHex = (arrayOfChars: number[] | number) => {
  if (typeof arrayOfChars === 'number') return arrayOfChars;
  const comma = '%2C';
  return arrayOfChars.join(comma);
};

export const fetchNewestMovies = async (): Promise<MovieApiResponse> => {
  const currentYear = getCurrentYear();
  const res = await fetch(
    `${BASE_URL}/discover/movie?sort_by=release_date.desc&primary_release_year=${currentYear}&append_to_response=images`,
    {
      headers,
      cache: 'force-cache',
    }
  );
  return res.json();
};

export const fetchTopByStreamingService = async (providerId: number) => {
  const providerFilter = convertToHex(providerId);
  const res = await fetch(`${BASE_URL}/discover/movie?with_watch_providers=${providerFilter}`, {
    headers,
    cache: 'force-cache',
  });
  return res.json();
};

export const fetchTopByGenre = async (genreIds: number[]): Promise<MovieApiResponse> => {
  const genreFilter = convertToHex(genreIds);
  const res = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${genreFilter}&sort_by=popularity.desc`,
    {
      headers,
      cache: 'force-cache',
    }
  );

  return res.json();
};

export const mapTopMoviesByGenre = async (): Promise<MoviesByGenre> => {
  const { genres } = await fetchMovieGenres();
  const topGenres = genres.slice(0, 5);

  const moviesByGenre: MoviesByGenre = {};

  await Promise.all(
    topGenres.map(async (genre) => {
      try {
        const response = await fetchTopByGenre([genre.id]);
        const topFiveMovies = response.results.slice(0, 5);
        moviesByGenre[genre.name] = topFiveMovies;
      } catch (error) {
        console.error(`Error fetching for genre ${genre.name}: `, error);
        throw error;
      }
    })
  );

  console.log('Movies by genre: ', moviesByGenre);

  return moviesByGenre;
};

export const fetchMovieProviders = async () => {
  try {
    const res = await fetch(`${BASE_URL}/watch/providers/movie?language=en-US&watch_region=HR`, {
      headers,
    });
    if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.log('There has been an error: ', error);
    throw error;
  }
};

export const fetchMovieGenres = async (): Promise<{ genres: MovieFilter[] }> => {
  try {
    const res = await fetch(`${BASE_URL}/genre/movie/list?language=en`, { headers });
    if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.log('There has been an error: ', error);
    throw error;
  }
};
