import {
  MovieApiResponse,
  MovieDetails,
  MovieFilter,
  MovieObject,
  MoviesByGenre,
} from '@/types/Movie';
import { API_BASE_URL } from '@/utils/constants';
import { getCurrentYear } from '@/utils/getCurrentYear';
import { cache } from 'react';

const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
};

export const fetchNewestMovies = async (): Promise<MovieApiResponse<MovieObject[]>> => {
  try {
    const currentYear = getCurrentYear();
    const res = await fetch(
      `${API_BASE_URL}/discover/movie?sort_by=release_date.desc&primary_release_year=${currentYear}&append_to_response=images`,
      {
        headers,
        cache: 'force-cache',
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error fetching most watched movies:', error);
    throw new Error('Failed to fetch most watched movies');
  }
};

export const fetchMostWatchedMovies = async (
  page: number,
  filter: string | null,
  genre: string | null
): Promise<MovieApiResponse<MovieObject[]>> => {
  try {
    let url = `${API_BASE_URL}/discover/movie?page=${page}&sort_by=${filter}&vote_count.gte=4500&vote_average.gte=7.5`;

    if (genre) {
      url += `&with_genres=${genre}`;
    }

    const res = await fetch(url, {
      headers,
      cache: 'force-cache',
    });

    if (!res.ok) {
      throw new Error(`API request failed with status: ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error fetching most watched movies:', error);
    throw new Error('Failed to fetch most watched movies');
  }
};

export const fetchTopByStreamingService = cache(
  async (providerId: number): Promise<MovieApiResponse<MovieObject[]>> => {
    try {
      const providerFilter = encodeURIComponent(providerId);
      const res = await fetch(
        `${API_BASE_URL}/discover/movie?with_watch_providers=${providerFilter}`,
        {
          headers,
          cache: 'force-cache',
        }
      );

      if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching movies by streaming service: ', error);
      throw new Error('Failed to fetch movies by streaming service');
    }
  }
);

export const fetchTopByGenre = async (
  genreIds: number[]
): Promise<MovieApiResponse<MovieObject[]>> => {
  try {
    const genreFilter = encodeURIComponent(String(genreIds));
    const res = await fetch(
      `${API_BASE_URL}/discover/movie?with_genres=${genreFilter}&sort_by=popularity.desc`,
      {
        headers,
        cache: 'force-cache',
      }
    );

    if (!res.ok) {
      throw new Error(`API request failed with status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies by streaming service: ', error);
    throw new Error('Failed to fetch movies by streaming service');
  }
};

export const mapTopMoviesByGenre = async (): Promise<MoviesByGenre> => {
  const { genres } = await fetchMovieGenres();
  const topGenres = genres.slice(0, 5);

  const moviesByGenre: MoviesByGenre = {};

  await Promise.all(
    topGenres.map(async (genre) => {
      try {
        const response = await fetchTopByGenre([genre.id]);
        const topFiveMovies = response.results;
        moviesByGenre[genre.name] = topFiveMovies;
      } catch (error) {
        console.error(`Error fetching for genre ${genre.name}: `, error);
        throw error;
      }
    })
  );

  return moviesByGenre;
};

export const fetchMovieDetails = async (movie_id: number): Promise<MovieDetails> => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/movie/${movie_id}?append_to_response=images%2Ccredits&language=en-US`,
      {
        headers,
      }
    );
    if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('There has been an error: ', error);
    throw Error;
  }
};

export const fetchMovieProviders = async () => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/watch/providers/movie?language=en-US&watch_region=HR`,
      {
        headers,
      }
    );
    if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.log('There has been an error: ', error);
    throw error;
  }
};

export const fetchMovieGenres = async (): Promise<{ genres: MovieFilter[] }> => {
  try {
    const res = await fetch(`${API_BASE_URL}/genre/movie/list?language=en`, { headers });
    if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
    return res.json();
  } catch (error) {
    console.log('There has been an error: ', error);
    throw error;
  }
};
