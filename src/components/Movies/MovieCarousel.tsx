import { MovieObject } from '@/types/Movie';
import { useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { MovieCard } from './MovieCard';

interface Props {
  movies: MovieObject[];
  title?: string;
}

const CARD_WIDTH = 250;

const MovieCarousel = ({ movies, title }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: number) => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.9;
      container.scrollLeft += direction * scrollAmount;
    }
  };
  return (
    <>
      {title && <h2 className="text-5xl font-bold text-gray-400 opacity-85">{title}</h2>}
      <div className="flex flex-row">
        <div
          ref={containerRef}
          className="scrollbar-none mx-2 flex h-[420px] flex-row items-center justify-start gap-5 overflow-y-hidden overflow-x-scroll scroll-smooth"
          style={{
            width: `calc(${movies.length} * ${CARD_WIDTH}px)`,
          }}
        >
          {movies.map((movie, index) => (
            <div key={index}>
              <MovieCard key={index} movie={movie} priorityLoading={false} />
            </div>
          ))}
          <FaAngleLeft
            className="duration-350 absolute left-10 cursor-pointer rounded-xl bg-black opacity-20 transition-all hover:opacity-85"
            size={70}
            color="white"
            onClick={() => handleScroll(-1)}
          />
          <FaAngleRight
            className="duration-350 absolute right-10 cursor-pointer rounded-xl bg-black opacity-20 transition-all hover:opacity-85"
            size={70}
            color="white"
            onClick={() => handleScroll(1)}
          />
        </div>
      </div>
    </>
  );
};

export default MovieCarousel;
