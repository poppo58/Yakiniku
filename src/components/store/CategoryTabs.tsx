import type { Category } from '../../types';
import { CATEGORIES } from '../../data/mockData';

interface CategoryTabsProps {
  selected: Category;
  onChange: (category: Category) => void;
}

export function CategoryTabs({ selected, onChange }: CategoryTabsProps) {
  return (
    <div className="flex overflow-x-auto gap-1 pb-1 scrollbar-none">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-400 ${
            selected === cat
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
