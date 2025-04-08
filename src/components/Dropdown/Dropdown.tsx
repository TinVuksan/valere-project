'use client';

import { useClickOutside } from '@/hooks/useClickOutside';
import { ReactNode, useEffect, useRef, useState } from 'react';

export interface DropdownItem {
  id: number;
  name: string;
}

interface DropdownProps {
  buttonIconLeft?: ReactNode;
  buttonIconRight?: ReactNode;
  items: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
}

export const Dropdown = ({ buttonIconRight, onSelect, items = [] }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonText = items[0].name;
  const filteredItems = items.filter((item) => item.id !== selectedItem?.id);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    setSelectedItem(items?.find((item) => item.name === buttonText) || null);
  }, [buttonText, items]);

  const handleItemClick = (item: DropdownItem) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Dropdown Toggle Button */}
      <button
        className={`flex h-10 items-center bg-gray-800 text-white ${
          isOpen ? 'rounded-t-[12px] border-b-0' : 'rounded-[12px]'
        } w-full min-w-[200px] antialiased focus:outline-none`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {/* Button Text */}
        <span className="font-inter mx-4 font-bold">{selectedItem?.name || buttonText}</span>
        {/* Right Icon with rotation for dropdown state */}
        <span
          className={`ml-auto flex transform items-center justify-center px-2 py-1 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          {buttonIconRight}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 z-30 w-full min-w-[200px] rounded-b-[12px] bg-gray-800 antialiased">
          <ul className="scrollbar-hide max-h-60 overflow-y-auto py-2">
            {filteredItems.map((item) => (
              <li
                key={item.id}
                className="border-b-1 flex cursor-pointer items-center border-gray-700 px-2 py-1 text-white hover:bg-gray-800"
                onClick={() => handleItemClick(item)}
              >
                {/* Item Text */}
                <span className="font-inter mx-2 font-bold">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
