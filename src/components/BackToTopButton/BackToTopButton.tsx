'use client';
import { useEffect, useState } from 'react';
import { FaChevronCircleUp } from 'react-icons/fa';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isBrowser = () => typeof window !== 'undefined';
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FaChevronCircleUp
      size={50}
      onClick={scrollToTop}
      className={`duration-350 bg-gray fixed bottom-5 right-5 cursor-pointer rounded-full p-2 shadow-lg transition-all ${isVisible ? 'opacity-100' : 'opacity-0'} hover:bg-black`}
    />
  );
};

export default BackToTopButton;
