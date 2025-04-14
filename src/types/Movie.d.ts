export interface MovieApiResponse<T> {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
}

export interface MovieObject {
  id: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  release_date: string;
  title: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
  popularity: number;
  video: boolean;
}

export interface MovieDetails extends MovieObject {
  genres: MovieFilter[];
  tagline: string;
  status: string;
  images: ImageCollection;
  credits: Credits;
  runtime: number;
  origin_country: string[];
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

export interface MovieSearchResult extends MovieFilter {
  image: string;
  release_date: string;
}

export interface Credits {
  cast: CreditsMember[];
  crew: CreditsMember[];
}

export interface ImageCollection {
  backdrops: string[];
  logos: string[];
  posters: string[];
}

export interface CreditsMember {
  adult: boolean;
  gender: Gender;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
}
