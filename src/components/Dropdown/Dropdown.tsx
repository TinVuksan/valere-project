'use client';

import { useClickOutside } from '@/hooks/useClickOutside';
import { ReactNode, useRef, useState } from 'react';

export interface DropdownItem {
  id: number;
  name: string;
}

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  buttonIconLeft?: ReactNode;
  buttonIconRight?: ReactNode;
  items: DropdownItem[] | null;
  placeholder: string;
  onItemSelect?: (item: DropdownItem) => void;
}

export const Dropdown = ({
  buttonIconRight,
  onItemSelect,
  items,
  placeholder,
  className,
  ...restProps
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const filteredItems = items?.filter((item) => item.id !== selectedItem?.id);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleItemClick = (item: DropdownItem) => {
    setSelectedItem(item);
    setIsOpen(false);
    onItemSelect?.(item);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block text-left ${className ?? ''}`}
      {...restProps}
    >
      <button
        className={`flex h-10 items-center bg-gray-800 text-white ${
          isOpen ? 'rounded-t-[12px] border-b-0' : 'rounded-[12px]'
        } w-full antialiased focus:outline-none`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="font-inter mx-4 font-bold">{selectedItem?.name ?? placeholder}</span>
        <span
          className={`ml-auto flex transform items-center justify-center px-2 py-1 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          {buttonIconRight}
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 w-full rounded-b-[12px] bg-gray-800 antialiased">
          <ul className="scrollbar-hide max-h-60 overflow-y-auto py-2">
            {filteredItems?.map((item) => (
              <li
                key={item.id}
                className="border-b-1 flex cursor-pointer items-center border-gray-700 px-2 py-1 text-white hover:bg-gray-800"
                onClick={() => handleItemClick(item)}
              >
                <span className="font-inter mx-2 font-bold">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
