'use client';
import { fetchTopByStreamingService } from '@/actions/tmdb';
import { MovieApiResponse, MovieFilter, MovieObject } from '@/types/Movie';
import { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { Dropdown, DropdownItem } from '../../Dropdown/Dropdown';
import { MovieCard } from '../MovieCard';

interface Props {
  movieProviders: MovieFilter[];
}

export const MoviesByProviderGrid = ({ movieProviders }: Props) => {
  const [selectedProvider, setSelectedProvider] = useState<DropdownItem | null>(movieProviders[0]);
  const [movies, setMovies] = useState<MovieObject[]>([]);

  useEffect(() => {
    const handleProviderChanged = async (providerId: number) => {
      const data: MovieApiResponse<MovieObject[]> = await fetchTopByStreamingService(providerId);
      setMovies(data.results.slice(0, 3));
    };

    if (selectedProvider?.id) {
      handleProviderChanged(selectedProvider.id);
    }
  }, [selectedProvider]);

  const handleDropdownSelect = (item: DropdownItem) => {
    setSelectedProvider(item);
  };

  return (
    <>
      <div className="m-5 flex flex-col items-center justify-center gap-2 md:flex-row">
        <h1 className="text-xl font-bold">Top 3 movies from</h1>
        <Dropdown
          buttonIconRight={<FaAngleDown />}
          className="min-w-[230px]"
          items={movieProviders}
          onItemSelect={handleDropdownSelect}
          placeholder={movieProviders[0].name}
        />
      </div>

      <div className="flex w-full flex-col items-center justify-evenly gap-10 lg:flex-row">
        {movies.map((movie, index) => (
          <div key={index} className="relative flex items-center">
            <span className="absolute -left-20 text-[13rem] font-bold text-gray-600 opacity-30">
              {index + 1}
            </span>
            <MovieCard movie={movie} priorityLoading={true} enlarged />
          </div>
        ))}
      </div>
    </>
  );
};
