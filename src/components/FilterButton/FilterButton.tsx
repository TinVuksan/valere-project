import { SortOrder } from '@/types/enums';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

interface FilterButtonProps {
  label: string;
  filterKey: string;
  currentFilter: string | undefined;
  currentOrder: SortOrder | undefined;
  onClick: () => void;
}

const FilterButton = ({
  label,
  filterKey,
  currentFilter,
  currentOrder,
  onClick,
}: FilterButtonProps) => {
  const isActive = currentFilter === filterKey;

  return (
    <div className="flex w-[150px] items-center gap-1 lg:w-auto">
      <button
        onClick={onClick}
        className="w-full cursor-pointer rounded-md border-2 border-gray-700 p-1 px-3 text-lg font-semibold transition-all duration-300 hover:bg-gray-950"
      >
        {label}
      </button>
      {/* Only show the icon if the button is active */}
      {isActive && <div>{currentOrder === SortOrder.DESC ? <FaAngleDown /> : <FaAngleUp />}</div>}
    </div>
  );
};

export default FilterButton;
