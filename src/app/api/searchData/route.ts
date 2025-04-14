import { MovieApiResponse, MovieObject, MovieSearchResult } from '@/types/Movie';
import { API_BASE_URL } from '@/utils/constants';

const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query) {
      return Response.json({ results: [] });
    }

    const res = await fetch(`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`, {
      headers,
    });

    const data: MovieApiResponse<MovieObject[]> = await res.json();

    const sortedData = data.results
      .filter((movie) => movie.poster_path)
      .sort((a, b) => b.popularity - a.popularity);

    const results: MovieSearchResult[] = (sortedData || []).map((movie: MovieObject) => ({
      id: movie.id,
      name: movie.title,
      image: movie.poster_path,
      release_date: movie.release_date,
    }));

    return Response.json({ results });
  } catch (error) {
    console.error('[API ERROR] homepageData route failed:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
