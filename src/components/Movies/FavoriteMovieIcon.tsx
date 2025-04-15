'use client';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FAVORITE_MOVIES_EVENT_LISTENER, FAVORITE_MOVIES_LOCAL_STORAGE } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { FaStar as StarFilled, FaRegStar as StarOutlined } from 'react-icons/fa6';
import { DropdownItem } from '../Dropdown/Dropdown';

interface Props {
  movie: DropdownItem;
  pxSize: number;
}

export const FavoriteMovieIcon = ({ movie, pxSize }: Props) => {
  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage<DropdownItem[]>();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getLocalStorageItem(FAVORITE_MOVIES_LOCAL_STORAGE) || [];
    setIsFavorite(favorites.some((favMovie) => favMovie.id === movie.id));
  }, [getLocalStorageItem, movie]);

  const toggleFavorite = () => {
    const currentFavorites = getLocalStorageItem(FAVORITE_MOVIES_LOCAL_STORAGE) || [];
    let updatedFavorites: DropdownItem[];

    if (currentFavorites.some((favMovie) => favMovie.id === movie.id)) {
      updatedFavorites = currentFavorites.filter((movieParam) => movieParam.id !== movie.id);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...currentFavorites, movie];
      setIsFavorite(true);
    }

    setLocalStorageItem(FAVORITE_MOVIES_LOCAL_STORAGE, updatedFavorites);
    window.dispatchEvent(new Event(FAVORITE_MOVIES_EVENT_LISTENER));
  };
  return (
    <div
      onClick={toggleFavorite}
      className="absolute right-1 top-1 m-1 flex cursor-pointer select-none items-center justify-center gap-1 rounded bg-gray-900 p-2 opacity-65 transition hover:bg-black hover:opacity-80"
    >
      <div className={`transition-transform duration-500 ${isFavorite ? 'rotate-360' : ''}`}>
        {isFavorite ? (
          <StarFilled size={pxSize} className="duration-300 ease-in-out" color="gold" />
        ) : (
          <StarOutlined size={pxSize} className="duration-300 ease-in-out" color="gray" />
        )}
      </div>
    </div>
  );
};
