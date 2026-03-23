import { useState, useEffect } from 'react';
import type { OrderStatus } from '../types';
import { useOrderStore } from '../store/useOrderStore';
import { OrderCard } from '../components/center/OrderCard';
import { StatsBar } from '../components/center/StatsBar';

const STATUS_FILTERS: { label: string; value: OrderStatus | 'すべて' }[] = [
  { label: 'すべて', value: 'すべて' },
  { label: '未確認', value: '未確認' },
  { label: '確認済み', value: '確認済み' },
  { label: '出荷済み', value: '出荷済み' },
  { label: '完了', value: '完了' },
];

// スケルトンローディング
function OrderSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-40 rounded bg-gray-200" />
          <div className="h-3 w-60 rounded bg-gray-100" />
        </div>
        <div className="h-6 w-16 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}

export function CenterDashboardPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'すべて'>('すべて');

  const orders = useOrderStore((s) => s.orders);
  const isLoading = useOrderStore((s) => s.isLoading);
  const fetchOrders = useOrderStore((s) => s.fetchOrders);
  const updateStatus = useOrderStore((s) => s.updateStatus);
  const updateDelivery = useOrderStore((s) => s.updateDelivery);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders =
    statusFilter === 'すべて'
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">センター 発注管理</h1>
            <p className="text-xs text-gray-500 mt-0.5">2026年3月23日</p>
          </div>
          <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
            配送センター
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        {/* 統計サマリー */}
        <StatsBar orders={orders} />

        {/* フィルターバー */}
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 ${
                statusFilter === f.value
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f.label}
              {f.value !== 'すべて' && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({orders.filter((o) => o.status === f.value).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* 発注リスト */}
        <div className="space-y-3">
          {isLoading ? (
            <>
              <OrderSkeleton />
              <OrderSkeleton />
              <OrderSkeleton />
            </>
          ) : filteredOrders.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 py-12 text-center">
              <p className="text-sm text-gray-400">該当する発注がありません</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isExpanded={expandedId === order.id}
                onToggle={() => toggleExpand(order.id)}
                onStatusChange={(status) => updateStatus(order.id, status)}
                onDeliveryChange={(itemId, qty) => updateDelivery(order.id, itemId, qty)}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
