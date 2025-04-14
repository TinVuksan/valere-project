'use client';
import { fetchMostWachedMoviesData } from '@/lib/api';
import { SortOrder } from '@/types/enums';
import { MovieFilter, MovieObject } from '@/types/Movie';
import { useCallback, useEffect, useState } from 'react';
import { FaAngleDown, FaSpinner } from 'react-icons/fa6';
import { useInView } from 'react-intersection-observer';
import BackToTopButton from '../../BackToTopButton/BackToTopButton';
import { Dropdown, DropdownItem } from '../../Dropdown/Dropdown';
import FilterButton from '../../FilterButton/FilterButton';
import { MovieCard } from '../MovieCard';

interface SortFilter {
  filter?: keyof MovieObject;
  order?: SortOrder;
}

interface Props {
  genres: MovieFilter[];
}
const MoviesByPopularityGrid = ({ genres }: Props) => {
  const [data, setData] = useState<MovieObject[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
  const [filter, setFilter] = useState<SortFilter>({});
  const [genre, setGenre] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { ref, inView } = useInView();

  const canLoadMorePages = totalPages === undefined || pageNumber <= totalPages;

  const loadMovies = useCallback(async () => {
    const res = await fetchMostWachedMoviesData(filter.filter, filter.order, genre, pageNumber);
    setTotalPages(res.total_pages);
    setData((prevData) => [...prevData, ...res.results]);
    setPageNumber((prev) => prev + 1);
  }, [pageNumber, filter, genre]);

  useEffect(() => {
    setData([]);
    setPageNumber(1);
  }, [filter, genre]);

  useEffect(() => {
    if (inView && canLoadMorePages) {
      loadMovies();
    }
  }, [inView, loadMovies, canLoadMorePages]);

  const handleGenreSelect = (item: DropdownItem) => {
    setGenre(String(item.id));
  };

  const handleResetFilters = () => {
    if (!filter.filter && genre === '') {
      return;
    }
    setFilter({});
    setGenre('');
  };

  return (
    <>
      <div className="relative mt-10 flex flex-col items-center justify-center gap-6">
        <h1 className="text-center text-4xl font-bold">All time classics</h1>
        <div className="mx-5 grid grid-cols-1 place-items-center gap-6 rounded-md p-2 ring-2 ring-blue-400/50 lg:flex lg:items-center">
          <h2 className="text-xl font-bold">Filters:</h2>
          <Dropdown
            className="min-w-[180px]"
            items={genres}
            placeholder="Genres"
            buttonIconRight={<FaAngleDown />}
            onItemSelect={handleGenreSelect}
          />
          <FilterButton
            label="Release Year"
            filterKey="release_date"
            currentFilter={filter.filter}
            currentOrder={filter.order}
            onClick={() => {
              setFilter((prevFilter) => ({
                filter: 'release_date',
                order: prevFilter.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC,
              }));
            }}
          />
          <FilterButton
            label="Score"
            filterKey="vote_average"
            currentFilter={filter.filter}
            currentOrder={filter.order}
            onClick={() => {
              setFilter((prevFilter) => ({
                filter: 'vote_average',
                order: prevFilter.order === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC,
              }));
            }}
          />
          <button
            onClick={handleResetFilters}
            className="cursor-pointer rounded-md border-2 border-gray-700 p-1 px-3 text-lg font-semibold transition-all duration-300 hover:bg-red-900"
          >
            Clear Filters
          </button>
        </div>
      </div>
      <div className="m-5 grid grid-cols-1 justify-items-center gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {data.map((movie, index) => (
          <MovieCard movie={movie} key={index} priorityLoading={false} />
        ))}
        {canLoadMorePages && (
          <div ref={ref} className="col-span-full justify-self-center">
            <FaSpinner size={50} className="animate-spin" />
          </div>
        )}
      </div>
      <BackToTopButton />
    </>
  );
};

export default MoviesByPopularityGrid;
