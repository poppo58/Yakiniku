# フェーズ2 要件定義書 — Claude Code 向け
## 焼肉チェーン発注管理システム: グローバル状態管理 & 非同期通信シミュレーション

---

## 概要

フェーズ1で構築したUIコンポーネント群（`StoreOrderPage`, `CenterDashboardPage`, 各UI部品）をベースに、フェーズ2では以下の2点を実装してください。

1. **Zustand によるグローバル状態管理**（店舗カート → センター受注の一連のデータフロー）
2. **`setTimeout` を用いた非同期処理シミュレーション**（Ajax通信のリアルな模倣）

フェーズ1の `console.log` モック・`useState` ローカル管理をすべて本実装へ置き換えます。

---

## 1. 技術スタックの追加

```bash
npm install zustand
```

- **Zustand v5**（2026年現在の最新安定版）を使用してください。
- `immer` ミドルウェアは **不要**。Zustand v5 のシンプルな `set` で対応できます。

---

## 2. ディレクトリ構成の追加・変更

```text
src/
  ├── store/                    ← 新規追加
  │    ├── useCartStore.ts      ← 店舗カートの状態
  │    └── useOrderStore.ts     ← センター受注管理の状態
  ├── services/                 ← 新規追加
  │    └── mockApi.ts           ← setTimeout による非同期API模倣
  ├── components/
  │    └── ui/
  │         └── Toast.tsx       ← 新規: 送信成功・失敗のフィードバック
  └── pages/
       ├── StoreOrderPage.tsx   ← 変更: useCartStore に接続
       └── CenterDashboardPage.tsx ← 変更: useOrderStore に接続
```

---

## 3. Zustand ストアの設計

### 3-A. `useCartStore.ts` — 店舗カート

```typescript
// src/store/useCartStore.ts

import { create } from 'zustand';
import type { Item } from '../types';

interface CartLine {
  item: Item;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  setQuantity: (item: Item, quantity: number) => void;
  increment: (item: Item) => void;
  decrement: (item: Item) => void;
  clearCart: () => void;
  totalItems: () => number; // セレクター（派生値）
}

export const useCartStore = create<CartState>((set, get) => ({
  lines: [],
  setQuantity: (item, quantity) => { /* ... */ },
  increment: (item) => { /* ... */ },
  decrement: (item) => { /* ... */ },
  clearCart: () => set({ lines: [] }),
  totalItems: () => get().lines.filter((l) => l.quantity > 0).length,
}));
```

**実装方針:**
- `lines` は商品IDをキーにしたマップではなく、配列で管理（センターへ送る順序保持のため）
- `setQuantity(item, 0)` を呼んだ行は配列から除去すること（空行ゴミを防ぐ）

---

### 3-B. `useOrderStore.ts` — センター受注管理

```typescript
// src/store/useOrderStore.ts

import { create } from 'zustand';
import type { Order, OrderStatus } from '../types';

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;       // 発注一覧の取得（非同期）
  submitOrder: (draft: Omit<Order, 'id' | 'status'>) => Promise<Order>; // 店舗→センター送信
  updateDelivery: (orderId: string, itemId: string, qty: number) => void; // 納品数更新
  updateStatus: (orderId: string, status: OrderStatus) => Promise<void>;  // ステータス変更
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,
  fetchOrders: async () => { /* ... */ },
  submitOrder: async (draft) => { /* ... */ },
  updateDelivery: (orderId, itemId, qty) => { /* ... */ },
  updateStatus: async (orderId, status) => { /* ... */ },
}));
```

---

## 4. 非同期 API シミュレーション (`mockApi.ts`)

`setTimeout` を用いてネットワーク遅延（300〜1200ms）をリアルに模倣します。

```typescript
// src/services/mockApi.ts

import type { Order } from '../types';
import { MOCK_ORDERS } from '../data/mockData';

// インメモリDB（モジュールスコープ）
let ordersDb: Order[] = [...MOCK_ORDERS];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
    if (Math.random() < 0.05) throw new Error('ネットワークエラーが発生しました。再送してください。');
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
    ordersDb = ordersDb.map((o) => o.id === orderId ? { ...o, status } : o);
    const updated = ordersDb.find((o) => o.id === orderId);
    if (!updated) throw new Error('発注が見つかりません');
    return updated;
  },

  /** 納品数更新 */
  async patchDeliveredQty(orderId: string, itemId: string, qty: number): Promise<void> {
    await delay(300);
    ordersDb = ordersDb.map((o) =>
      o.id === orderId
        ? { ...o, lines: o.lines.map((l) => l.item.id === itemId ? { ...l, deliveredQty: qty } : l) }
        : o
    );
  },
};
```

---

## 5. UIコンポーネントの変更仕様

### 5-A. `StoreOrderPage.tsx` の変更点

| 変更前（フェーズ1） | 変更後（フェーズ2） |
|---|---|
| `useState<QuantityMap>` でローカル管理 | `useCartStore` の `increment/decrement/setQuantity` に接続 |
| `handleSubmit` が `console.log` | `useOrderStore.submitOrder()` を呼び出し |
| 送信後の状態リセットなし | 送信成功後に `useCartStore.clearCart()` |
| エラーハンドリングなし | `try/catch` で Toast 通知 |

**追加UI:**
- 発注送信ボタン押下中は `isLoading` が `true` の間スピナー表示・ボタン無効化
- 送信成功で「発注を送信しました ✓」Toast（3秒で自動消去）
- 送信失敗で「送信に失敗しました。再試行してください」Toast（赤、手動閉じ）

---

### 5-B. `CenterDashboardPage.tsx` の変更点

| 変更前（フェーズ1） | 変更後（フェーズ2） |
|---|---|
| `MOCK_ORDERS` の静的インポート | `useOrderStore.fetchOrders()` を `useEffect` で初回取得 |
| 納品数入力が `defaultValue` のみ | `useOrderStore.updateDelivery()` に接続（デバウンス: 500ms） |
| ステータス変更UIなし | `OrderCard` にステータス変更ドロップダウンを追加 |
| ローディング状態なし | スケルトンローディング表示（`isLoading === true` のとき） |

---

## 6. Toast コンポーネント仕様 (`Toast.tsx`)

```typescript
// src/components/ui/Toast.tsx

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}
```

- 画面右下に固定表示（`fixed bottom-4 right-4`）
- `type === 'success'`: 緑背景、自動消去 3000ms
- `type === 'error'`: 赤背景、手動閉じのみ
- アニメーション: `opacity-0 → opacity-100` のフェードイン（Tailwind `transition-opacity`）

---

## 7. データフロー全体図

```
[店舗側]
  StoreOrderPage
    ↓ useCartStore (Zustand)
    ↓ onSubmit → useOrderStore.submitOrder()
    ↓ mockApi.postOrder() [setTimeout 1000ms]
    ↓ 成功 → clearCart() + Toast(success)
    ↓ 失敗 → Toast(error)

[センター側]
  CenterDashboardPage
    ↓ useEffect → useOrderStore.fetchOrders()
    ↓ mockApi.getOrders() [setTimeout 600ms]
    ↓ 納品数変更（デバウンス500ms）→ mockApi.patchDeliveredQty()
    ↓ ステータス変更 → mockApi.patchOrderStatus()
```

---

## 8. 実装の優先順位

1. `mockApi.ts` の実装（非同期基盤）
2. `useCartStore.ts` の実装とテスト（`StoreOrderPage` に接続）
3. `useOrderStore.ts` の実装（`fetchOrders`, `submitOrder`）
4. `CenterDashboardPage` への接続（`fetchOrders`, `updateStatus`）
5. `Toast.tsx` の実装と各ページへの組み込み
6. 納品数デバウンス更新の実装（`updateDelivery`）

---

## 9. 注意事項

- **`ordersDb` はモジュールスコープ変数**。ページリロードでリセットされる仕様で問題ありません（フェーズ3でバックエンドに接続予定）。
- **Zustand のセレクター最適化**: `useCartStore((s) => s.lines)` のように必要な値だけをサブスクライブし、不要な再レンダリングを防いでください。
- **フェーズ2では `react-router-dom` の導入は不要**。フェーズ1同様、`App.tsx` の `useState` による画面切替を維持してください。
- **エラーバウンダリは任意**。`try/catch` + Toast で十分です。
