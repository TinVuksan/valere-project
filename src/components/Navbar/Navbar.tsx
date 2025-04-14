'use client';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FAVORITE_MOVIES_EVENT_LISTENER, FAVORITE_MOVIES_LOCAL_STORAGE } from '@/utils/constants';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown';
import Search from '../Search/Search';

const Navbar = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<DropdownItem[] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { getLocalStorageItem } = useLocalStorage<DropdownItem[]>();

  const router = useRouter();
  const pathName = usePathname();

  const fetchFavoritesMovies = useCallback(() => {
    const favorites = getLocalStorageItem(FAVORITE_MOVIES_LOCAL_STORAGE);
    setFavoriteMovies(favorites);
  }, [getLocalStorageItem]);

  useEffect(() => {
    fetchFavoritesMovies();

    window.addEventListener(FAVORITE_MOVIES_EVENT_LISTENER, fetchFavoritesMovies);
    return () => {
      window.removeEventListener(FAVORITE_MOVIES_EVENT_LISTENER, fetchFavoritesMovies);
    };
  }, [fetchFavoritesMovies]);

  const handleDropdownSelect = (item: DropdownItem) => {
    router.push(`/movie/${item.id}`);
  };

  const navLinkStyle = (href: string) => {
    return pathName === href
      ? 'text-blue-200 underline decoration-blue-400 underline-offset-4 transition-all duration-300'
      : 'text-gray-200 hover:text-white underline-offset-4 hover:underline hover:decoration-blue-400';
  };
  return (
    <nav className="w-full bg-gray-900 p-5">
      <div className="h-15 ml-[50px] flex items-center justify-around lg:justify-between">
        <Link
          href="/"
          className="justify-center text-3xl font-extrabold tracking-wide text-gray-200"
        >
          Binge-It
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <Link href="/mostWatched" className={`text-xl ${navLinkStyle('/mostWatched')}`}>
            Most Watched
          </Link>
          <Dropdown
            items={favoriteMovies}
            onItemSelect={handleDropdownSelect}
            buttonIconRight={<FaAngleDown />}
            placeholder="Favorite Movies"
          />
          <Search />
        </div>

        <div className="lg:hidden">
          <RxHamburgerMenu onClick={() => setMenuOpen((prev) => !prev)} />
        </div>
      </div>

      {menuOpen && (
        <div className="mt-4 flex flex-col items-center gap-4 lg:hidden">
          <Link
            onClick={() => setMenuOpen(false)}
            href="/mostWatched"
            className={`text-lg ${navLinkStyle('/mostWatched')}`}
          >
            Most Watched
          </Link>
          <Dropdown
            items={favoriteMovies}
            onItemSelect={handleDropdownSelect}
            buttonIconRight={<FaAngleDown />}
            placeholder="Favorite Movies"
            className="w-[300px]"
          />
          <Search />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
