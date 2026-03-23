import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import type { Category } from '../types';
import { MOCK_ITEMS } from '../data/mockData';
import { useCartStore } from '../store/useCartStore';
import { useOrderStore } from '../store/useOrderStore';
import { CategoryTabs } from '../components/store/CategoryTabs';
import { OrderItemRow } from '../components/store/OrderItemRow';
import { OrderSummaryBar } from '../components/store/OrderSummaryBar';
import { Card } from '../components/ui/Card';
import { Toast } from '../components/ui/Toast';

const INITIAL_CATEGORY: Category = '一般1';

// 送信用の店舗情報（フェーズ2では固定値）
const STORE_ID = 'STORE-001';
const STORE_NAME = '渋谷本店';

export function StoreOrderPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(INITIAL_CATEGORY);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const lines = useCartStore((s) => s.lines);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalItems = useCartStore((s) => s.totalItems());

  const submitOrder = useOrderStore((s) => s.submitOrder);
  const isLoading = useOrderStore((s) => s.isLoading);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredItems = MOCK_ITEMS.filter((item) => {
    const matchesCategory = item.category === selectedCategory;
    if (!normalizedQuery) return matchesCategory;
    return matchesCategory && (
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.spec.toLowerCase().includes(normalizedQuery)
    );
  });

  const getQty = useCallback(
    (id: string) => lines.find((l) => l.item.id === id)?.quantity ?? 0,
    [lines],
  );

  const handleIncrease = useCallback(
    (id: string) => {
      const item = MOCK_ITEMS.find((i) => i.id === id);
      if (item) increment(item);
    },
    [increment],
  );

  const handleDecrease = useCallback(
    (id: string) => {
      const item = MOCK_ITEMS.find((i) => i.id === id);
      if (item) decrement(item);
    },
    [decrement],
  );

  const handleChange = useCallback(
    (id: string, value: number) => {
      const item = MOCK_ITEMS.find((i) => i.id === id);
      if (item) setQuantity(item, value);
    },
    [setQuantity],
  );

  const handleSubmit = async () => {
    if (lines.length === 0) return;

    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 2);

    const draft = {
      storeId: STORE_ID,
      storeName: STORE_NAME,
      orderDate: today.toISOString(),
      deliveryDate: deliveryDate.toISOString().split('T')[0],
      lines: lines.map((l) => ({
        item: l.item,
        orderedQty: l.quantity,
        deliveredQty: null,
      })),
    };

    try {
      await submitOrder(draft);
      clearCart();
      setToast({ message: '発注を送信しました ✓', type: 'success' });
    } catch {
      setToast({ message: '送信に失敗しました。再試行してください', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-sm">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-lg font-bold text-gray-900">発注入力</h1>
          <p className="text-xs text-gray-500">渋谷本店 &nbsp;·&nbsp; 2026年3月23日</p>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-28 pt-4">
        {/* カテゴリタブ */}
        <div className="mb-4">
          <CategoryTabs selected={selectedCategory} onChange={setSelectedCategory} />
        </div>

        {/* 検索バー */}
        <div className="mb-3 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="商品名・規格で絞り込み"
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-9 text-sm focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="検索をクリア"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* 商品リスト */}
        <Card className="px-4 py-2">
          {filteredItems.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">
              {normalizedQuery ? `"${searchQuery}" に一致する商品はありません` : 'このカテゴリに商品はありません'}
            </p>
          ) : (
            filteredItems.map((item) => (
              <OrderItemRow
                key={item.id}
                item={item}
                quantity={getQty(item.id)}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onChange={handleChange}
              />
            ))
          )}
        </Card>
      </main>

      {/* 発注サマリーバー（固定フッター） */}
      <OrderSummaryBar
        totalItems={totalItems}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {/* Toast 通知 */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
