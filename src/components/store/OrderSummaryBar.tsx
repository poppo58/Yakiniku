import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/Button';

interface OrderSummaryBarProps {
  totalItems: number;
  onSubmit: () => void;
}

export function OrderSummaryBar({ totalItems, onSubmit }: OrderSummaryBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-gray-200 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-lg">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ShoppingCart size={18} className="text-red-500" />
          <span>
            発注点数: <strong className="text-gray-900">{totalItems}</strong> 点
          </span>
        </div>
        <Button onClick={onSubmit} disabled={totalItems === 0} size="md" className="min-w-[120px]">
          発注する
        </Button>
      </div>
    </div>
  );
}
