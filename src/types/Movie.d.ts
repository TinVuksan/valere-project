export interface MovieApiResponse {
  page: number;
  results: MovieObject[];
  total_pages: number;
  total_results: number;
}

export interface MovieObject {
  adult: boolean;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  release_date: string;
  title: string;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  backdrop_path: string | null;
  popularity: number;
  video: boolean;
}

export interface MovieProvider {
  display_priorities: [];
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface MoviesByGenre {
  [genre: string]: MovieObject[];
}

export interface MovieFilter {
  id: number;
  name: string;
}
