'use client';
import { useClickOutside } from '@/hooks/useClickOutside';
import { MovieSearchResult } from '@/types/Movie';
import { filePathToImage } from '@/utils/filePathToImage';
import { getBaseUrl } from '@/utils/getBaseUrl';
import { getYearFromDate } from '@/utils/getYearFromDate';
import { throttle } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<MovieSearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const throttledFetchRef = useRef<((query: string) => void) | null>(null);
  const activeItemRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setActiveIndex(-1);
    throttledFetchRef.current?.(value);
  };

  const handleSelect = (movie: MovieSearchResult) => {
    setIsOpen((prev) => {
      return !prev;
    });
    setQuery(movie.name);
    setSuggestions([]);
    setActiveIndex(-1);

    router.push(`/movie/${movie.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
    }

    if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSelect(suggestions[activeIndex]);
      }
    }

    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    activeItemRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [activeIndex]);

  useEffect(() => {
    throttledFetchRef.current = throttle(async (searchTerm: string) => {
      if (!searchTerm.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `${getBaseUrl()}/api/searchData?query=${encodeURIComponent(searchTerm)}`
        );
        const data = await res.json();

        setSuggestions(data.results || []);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    }, 2000);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`w-75 relative h-10 items-center rounded-md bg-gray-800 ${isOpen && 'rounded-b-none'}`}
    >
      <input
        type="text"
        placeholder="Search movies..."
        className={`${isOpen && 'border-b-1 border-gray-500'} h-full w-full indent-3 focus:outline-none`}
        value={query}
        onClick={() => setIsOpen(true)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-30 h-[350px] rounded-md rounded-t-none bg-gray-800 antialiased">
          <ul className="scrollbar-hide flex max-h-[350px] flex-col gap-2 overflow-y-auto p-2">
            {suggestions.map((movie, index) => (
              <div
                ref={index === activeIndex ? activeItemRef : null}
                key={movie.id}
                className="border-1 flex flex-row rounded-md border-gray-600"
              >
                <Image
                  src={filePathToImage(movie.image)}
                  className="overflow-hidden rounded-md"
                  alt={movie.name}
                  width={70}
                  height={50}
                />
                <li
                  onClick={() => handleSelect(movie)}
                  className={`w-full cursor-pointer p-2 ${
                    index === activeIndex ? 'bg-gray-600' : 'hover:bg-gray-600'
                  }`}
                >
                  <p>{movie.name}</p>
                  <p>({getYearFromDate(movie.release_date)})</p>
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
