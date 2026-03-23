import type { Order } from '../types';
import { MOCK_ORDERS } from '../data/mockData';

// インメモリDB（モジュールスコープ — ページリロードでリセットされる仕様）
let ordersDb: Order[] = [...MOCK_ORDERS];

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export const mockApi = {
  /** 発注一覧取得 */
  async getOrders(): Promise<Order[]> {
    await delay(600);
    return [...ordersDb];
  },

  /** 発注送信（店舗 → センター） */
  async postOrder(draft: Omit<Order, 'id' | 'status'>): Promise<Order> {
    await delay(1000);
    // 5% の確率でネットワークエラーを模倣
    if (Math.random() < 0.05) {
      throw new Error('ネットワークエラーが発生しました。再送してください。');
    }
    const newOrder: Order = {
      ...draft,
      id: `ORD-${Date.now()}`,
      status: '未確認',
    };
    ordersDb = [newOrder, ...ordersDb];
    return newOrder;
  },

  /** ステータス更新 */
  async patchOrderStatus(orderId: string, status: Order['status']): Promise<Order> {
    await delay(400);
    ordersDb = ordersDb.map((o) => (o.id === orderId ? { ...o, status } : o));
    const updated = ordersDb.find((o) => o.id === orderId);
    if (!updated) throw new Error('発注が見つかりません');
    return updated;
  },

  /** 納品数更新 */
  async patchDeliveredQty(orderId: string, itemId: string, qty: number): Promise<void> {
    await delay(300);
    ordersDb = ordersDb.map((o) =>
      o.id === orderId
        ? {
            ...o,
            lines: o.lines.map((l) =>
              l.item.id === itemId ? { ...l, deliveredQty: qty } : l,
            ),
          }
        : o,
    );
  },
};
