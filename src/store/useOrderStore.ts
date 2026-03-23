import { create } from 'zustand';
import type { Order, OrderStatus } from '../types';
import { mockApi } from '../services/mockApi';

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  submitOrder: (draft: Omit<Order, 'id' | 'status'>) => Promise<Order>;
  updateDelivery: (orderId: string, itemId: string, qty: number) => void;
  updateStatus: (orderId: string, status: OrderStatus) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const orders = await mockApi.getOrders();
      set({ orders, isLoading: false });
    } catch (e) {
      set({ error: (e as Error).message, isLoading: false });
    }
  },

  submitOrder: async (draft) => {
    set({ isLoading: true, error: null });
    try {
      const newOrder = await mockApi.postOrder(draft);
      set((state) => ({
        orders: [newOrder, ...state.orders],
        isLoading: false,
      }));
      return newOrder;
    } catch (e) {
      set({ isLoading: false, error: (e as Error).message });
      throw e;
    }
  },

  updateDelivery: (orderId, itemId, qty) => {
    // 楽観的更新：UIを即時反映し、非同期でAPIに同期
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId
          ? {
              ...o,
              lines: o.lines.map((l) =>
                l.item.id === itemId ? { ...l, deliveredQty: qty } : l,
              ),
            }
          : o,
      ),
    }));
    mockApi.patchDeliveredQty(orderId, itemId, qty).catch((e) => {
      console.error('[updateDelivery] API error:', e);
    });
  },

  updateStatus: async (orderId, status) => {
    try {
      const updated = await mockApi.patchOrderStatus(orderId, status);
      set((state) => ({
        orders: state.orders.map((o) => (o.id === updated.id ? updated : o)),
      }));
    } catch (e) {
      set({ error: (e as Error).message });
      throw e;
    }
  },
}));
