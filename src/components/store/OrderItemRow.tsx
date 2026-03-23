import { Minus, Plus } from 'lucide-react';
import type { Item } from '../../types';

interface OrderItemRowProps {
  item: Item;
  quantity: number;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onChange: (id: string, value: number) => void;
}

export function OrderItemRow({ item, quantity, onIncrease, onDecrease, onChange }: OrderItemRowProps) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-gray-100 py-3 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-gray-900 text-sm leading-tight">{item.name}</p>
        <p className="mt-0.5 text-xs text-gray-500">
          {item.spec} <span className="text-gray-400">|</span> 単位: {item.unit}
        </p>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => onDecrease(item.id)}
          disabled={quantity <= 0}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 active:bg-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="減らす"
        >
          <Minus size={14} />
        </button>

        <input
          type="number"
          min={0}
          value={quantity}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            onChange(item.id, isNaN(v) || v < 0 ? 0 : v);
          }}
          className="h-8 w-14 rounded-lg border border-gray-300 text-center text-sm font-semibold text-gray-900 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400"
          aria-label={`${item.name} 発注数`}
        />

        <button
          onClick={() => onIncrease(item.id)}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white transition-colors hover:bg-red-700 active:bg-red-800"
          aria-label="増やす"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}
