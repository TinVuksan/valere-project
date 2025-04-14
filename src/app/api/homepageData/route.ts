import { getHomepageData } from '@/lib/api';

export const GET = async () => {
  try {
    const data = await getHomepageData();
    return Response.json(data);
  } catch (error) {
    console.error('[API ERROR] homepageData route failed:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
