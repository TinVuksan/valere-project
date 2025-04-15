'use client';

import { useClickOutside } from '@/hooks/useClickOutside';
import { useMovieSearch } from '@/hooks/useMovieSearch';
import { filePathToImage } from '@/utils/filePathToImage';
import { getYearFromDate } from '@/utils/getYearFromDate';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import SearchInput from './SearchInput';

const SearchWithDropdown = () => {
  const { query, suggestions, activeIndex, setActiveIndex, updateQuery, setSuggestions } =
    useMovieSearch();

  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLDivElement>(null);

  const isOpen = suggestions.length > 0;

  useClickOutside(dropdownRef, () => setSuggestions([]));

  const handleSelect = (movie: { id: number; name: string }) => {
    setSuggestions([]);
    updateQuery(movie.name);
    setActiveIndex(-1);
    router.push(`/movie/${movie.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!query.length) {
      if (e.key === 'Enter') {
        setSuggestions([]);
        router.push('/searchpage');
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
    }

    if (e.key === 'Enter' && activeIndex >= 0) {
      handleSelect(suggestions[activeIndex]);
    }

    if (e.key === 'Escape') {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    activeItemRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [activeIndex]);

  return (
    <div
      ref={dropdownRef}
      className={`relative h-10 w-72 items-center rounded-md bg-gray-800 ${
        isOpen ? 'rounded-b-none' : ''
      }`}
    >
      <SearchInput
        value={query}
        onChange={(e) => updateQuery(e.target.value)}
        onClick={() => {}}
        onKeyDown={handleKeyDown}
        className={`h-full w-full indent-3 focus:outline-none ${
          isOpen ? 'border-b border-gray-500' : ''
        }`}
      />

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-30 max-h-[350px] overflow-y-auto rounded-md rounded-t-none bg-gray-800 p-2 antialiased shadow-lg">
          <ul className="scrollbar-hide flex flex-col gap-2">
            {suggestions.map((movie, index) => (
              <div
                key={movie.id}
                ref={index === activeIndex ? activeItemRef : null}
                className={`flex flex-row items-center gap-2 rounded-md border border-gray-600 ${
                  index === activeIndex ? 'bg-gray-600' : 'hover:bg-gray-600'
                }`}
              >
                <Image
                  src={filePathToImage(movie.image)}
                  className="rounded-md"
                  alt={movie.name}
                  width={70}
                  height={50}
                />
                <li
                  onClick={() => handleSelect(movie)}
                  className={`w-full cursor-pointer p-2 text-sm`}
                >
                  <p>{movie.name}</p>
                  <p className="text-gray-400">({getYearFromDate(movie.release_date)})</p>
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchWithDropdown;
