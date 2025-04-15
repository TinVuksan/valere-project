'use client';
import SearchInput from '@/components/Search/SearchInput';
import SearchMovieCard from '@/components/Search/SearchMovieCard';
import { useMovieSearch } from '@/hooks/useMovieSearch';

const SearchPage = () => {
  const { query, updateQuery, suggestions } = useMovieSearch();

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-10">
      <h1 className="text-3xl font-semibold">Search a movie</h1>
      <SearchInput
        value={query}
        onChange={(e) => updateQuery(e.target.value)}
        className="w-full max-w-xl rounded-md border border-gray-500 bg-gray-800 p-2 text-xl focus:outline-none"
      />
      <div className="mt-6 flex w-full max-w-7xl flex-wrap justify-center gap-4">
        {suggestions.map((movie) => (
          <SearchMovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
