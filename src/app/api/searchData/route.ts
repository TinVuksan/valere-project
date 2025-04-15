import { fetchMoviesBySearch } from '@/actions/tmdb';

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query) {
      return Response.json({ results: [] });
    }

    const results = await fetchMoviesBySearch(query);
    return Response.json({ results });
  } catch (error) {
    console.error('[API ERROR] homepageData route failed:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
