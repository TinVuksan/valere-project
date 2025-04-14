import { fetchMostWatchedMovies } from '@/actions/tmdb';

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page');
    const filter = searchParams.get('sort_by');
    const genre = searchParams.get('with_genres');
    console.log('Received parameters: ', { page, filter, genre });

    if (!page) {
      console.log('Page is missing, setting to 1');
    }
    if (!filter) {
      console.log('Sort filter is missing, setting default to popularity');
    }
    if (!genre) {
      console.log('Genre is missing');
    }

    const mostWatchedMovies = await fetchMostWatchedMovies(Number(page), filter, genre || null);

    console.log('Fetched movies:', mostWatchedMovies);

    if (!mostWatchedMovies || mostWatchedMovies.results.length === 0) {
      console.log('No movies found for the given parameters');
    }
    return Response.json({
      mostWatchedMovies,
    });
  } catch (error) {
    console.error('[API ERROR] homepageData route failed:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
