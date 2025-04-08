'use client';
import { fetchTopByStreamingService } from '@/actions/tmdb';
import { MovieApiResponse, MovieFilter, MovieObject } from '@/types/Movie';
import { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown';
import { MovieCard } from './MovieCard';

interface Props {
  movieProviders: MovieFilter[];
}

export const MoviesByProviderGrid = ({ movieProviders }: Props) => {
  const [selectedProvider, setSelectedProvider] = useState<DropdownItem | null>(movieProviders[0]);
  const [movies, setMovies] = useState<MovieObject[]>([]);

  useEffect(() => {
    const handleProviderChanged = async () => {
      if (selectedProvider) {
        const data: MovieApiResponse = await fetchTopByStreamingService(selectedProvider.id);
        console.log('Provider is: ', selectedProvider);
        console.log('Data is: ', data);
        setMovies(data.results.slice(0, 3));
      }
    };

    if (selectedProvider) {
      handleProviderChanged();
    }
  }, [selectedProvider]);
  const handleDropdownSelect = (item: DropdownItem) => {
    setSelectedProvider(item);
  };

  return (
    <>
      <div className="m-5 flex items-center justify-center gap-2">
        <h1>Top 3 movies from</h1>
        <Dropdown
          buttonIconRight={<FaAngleDown />}
          items={movieProviders}
          onSelect={handleDropdownSelect}
        />
      </div>

      <div className="flex flex-row justify-evenly">
        {movies.map((movie, index) => (
          <div key={index} className="flex items-center">
            <span className="mr-0 translate-x-1/3 transform text-[12rem] font-bold text-gray-600 opacity-50">
              {index + 1}
            </span>
            <MovieCard movie={movie} priorityLoading={true} />
          </div>
        ))}
      </div>
    </>
  );
};
