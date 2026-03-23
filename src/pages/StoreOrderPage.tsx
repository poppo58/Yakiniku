import { useState } from 'react';
import type { Category } from '../types';
import { MOCK_ITEMS } from '../data/mockData';
import { CategoryTabs } from '../components/store/CategoryTabs';
import { OrderItemRow } from '../components/store/OrderItemRow';
import { OrderSummaryBar } from '../components/store/OrderSummaryBar';
import { Card } from '../components/ui/Card';

// 商品IDをキーにした発注数マップ
type QuantityMap = Record<string, number>;

const INITIAL_CATEGORY: Category = '精肉';

export function StoreOrderPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(INITIAL_CATEGORY);
  const [quantities, setQuantities] = useState<QuantityMap>({});

  const filteredItems = MOCK_ITEMS.filter((item) => item.category === selectedCategory);

  const getQty = (id: string) => quantities[id] ?? 0;

  const handleIncrease = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  const handleDecrease = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) - 1) }));
  };

  const handleChange = (id: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    const order = MOCK_ITEMS.filter((item) => (quantities[item.id] ?? 0) > 0).map((item) => ({
      itemId: item.id,
      name: item.name,
      quantity: quantities[item.id],
      unit: item.unit,
    }));
    // フェーズ1: APIへの送信はモック
    console.log('[MOCK] 発注送信:', JSON.stringify(order, null, 2));
    alert('発注を送信しました（フェーズ1 モック）');
    setQuantities({});
  };

  const totalItems = Object.values(quantities).filter((v) => v > 0).length;

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

        {/* 商品リスト */}
        <Card className="px-4 py-2">
          {filteredItems.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">この カテゴリに商品はありません</p>
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
      <OrderSummaryBar totalItems={totalItems} onSubmit={handleSubmit} />
    </div>
  );
}
