'use client';

import { MovieSearchResult } from '@/types/Movie';
import { getBaseUrl } from '@/utils/getBaseUrl';
import { throttle } from 'lodash';
import { useEffect, useRef, useState } from 'react';

export const useMovieSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<MovieSearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const throttledFetchRef = useRef<((query: string) => void) | null>(null);

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
      } catch (error) {
        console.error('Error fetching suggestions: ', error);
      }
    }, 1500);
  }, []);

  const updateQuery = (newQuery: string) => {
    setQuery(newQuery);
    setActiveIndex(-1);
    throttledFetchRef.current?.(newQuery);
  };

  return {
    query,
    setQuery,
    suggestions,
    setSuggestions,
    activeIndex,
    setActiveIndex,
    updateQuery,
  };
};
