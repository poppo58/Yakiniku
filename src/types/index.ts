// 単位の型定義
export type Unit = string;

// カテゴリの型定義
export type Category =
  | '一般1'
  | '一般2'
  | '限定メニュー'
  | '宴会'
  | '弁当関係'
  | '発注書'
  | 'ペアモール'
  | '肉札';

// 商品アイテムの型定義
export interface Item {
  id: string;
  name: string;
  spec: string; // 規格 (例: "100g×10P")
  unit: Unit;
  category: Category;
  defaultQuantity: number;
}

// 発注明細の型定義
export interface OrderLine {
  item: Item;
  orderedQty: number;
  deliveredQty: number | null; // センター側が入力する納品数
}

// 発注書の型定義
export interface Order {
  id: string;
  storeId: string;
  storeName: string;
  orderDate: string; // ISO 8601
  deliveryDate: string;
  status: OrderStatus;
  lines: OrderLine[];
}

export type OrderStatus = '未確認' | '確認済み' | '出荷済み' | '完了';
