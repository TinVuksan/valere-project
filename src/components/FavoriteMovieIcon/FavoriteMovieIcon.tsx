'use client';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FAVORITE_MOVIES_LOCAL_STORAGE } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { FaStar as StarFilled, FaRegStar as StarOutlined } from 'react-icons/fa6';

interface Props {
  movieId: number;
}

export const FavoriteMovieIcon = ({ movieId }: Props) => {
  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage<number[]>();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getLocalStorageItem(FAVORITE_MOVIES_LOCAL_STORAGE) || [];
    setIsFavorite(favorites.includes(movieId));
  }, [getLocalStorageItem, movieId]);

  const toggleFavorite = () => {
    const currentFavorites = getLocalStorageItem(FAVORITE_MOVIES_LOCAL_STORAGE) || [];
    let updatedFavorites: number[];

    if (currentFavorites.includes(movieId)) {
      updatedFavorites = currentFavorites.filter((id) => id !== movieId);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...currentFavorites, movieId];
      setIsFavorite(true);
    }

    setLocalStorageItem(FAVORITE_MOVIES_LOCAL_STORAGE, updatedFavorites);
  };
  return (
    <div
      onClick={toggleFavorite}
      className="absolute right-1 top-1 m-1 flex cursor-pointer select-none items-center justify-center gap-1 rounded bg-gray-600 p-2 opacity-75 transition hover:opacity-90"
    >
      <h3 className="transition-opacity duration-500 ease-in-out">
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </h3>
      <div className={`transition-transform duration-500 ${isFavorite ? 'rotate-360' : ''}`}>
        {isFavorite ? (
          <StarFilled className="duration-300 ease-in-out" color="gold" />
        ) : (
          <StarOutlined className="duration-300 ease-in-out" color="gray" />
        )}
      </div>
    </div>
  );
};
