import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Item } from '../types';

export interface CartLine {
  item: Item;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  setQuantity: (item: Item, quantity: number) => void;
  increment: (item: Item) => void;
  decrement: (item: Item) => void;
  clearCart: () => void;
  totalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],

      setQuantity: (item, quantity) => {
        set((state) => {
          const exists = state.lines.some((l) => l.item.id === item.id);
          if (quantity <= 0) {
            return { lines: state.lines.filter((l) => l.item.id !== item.id) };
          }
          if (exists) {
            return {
              lines: state.lines.map((l) =>
                l.item.id === item.id ? { ...l, quantity } : l,
              ),
            };
          }
          return { lines: [...state.lines, { item, quantity }] };
        });
      },

      increment: (item) => {
        const { lines, setQuantity } = get();
        const current = lines.find((l) => l.item.id === item.id)?.quantity ?? 0;
        setQuantity(item, current + 1);
      },

      decrement: (item) => {
        const { lines, setQuantity } = get();
        const current = lines.find((l) => l.item.id === item.id)?.quantity ?? 0;
        setQuantity(item, current - 1);
      },

      clearCart: () => set({ lines: [] }),

      totalItems: () => get().lines.filter((l) => l.quantity > 0).length,
    }),
    {
      name: 'yakiniku-cart', // localStorage のキー名
    },
  ),
);
