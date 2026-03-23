import type { Item, Order, Category } from '../types';

export const CATEGORIES: Category[] = [
  '精肉',
  '弁当関係',
  '限定メニュー',
  '野菜・サラダ',
  '飲み物',
  'タレ・調味料',
  '消耗品',
];

export const MOCK_ITEMS: Item[] = [
  // 精肉
  { id: 'M001', name: '国産牛カルビ', spec: '100g×10P', unit: 'P', category: '精肉', defaultQuantity: 0 },
  { id: 'M002', name: '国産牛ロース', spec: '100g×10P', unit: 'P', category: '精肉', defaultQuantity: 0 },
  { id: 'M003', name: '豚バラ', spec: '200g×5P', unit: 'P', category: '精肉', defaultQuantity: 0 },
  { id: 'M004', name: '鶏もも', spec: '250g×4P', unit: 'P', category: '精肉', defaultQuantity: 0 },
  { id: 'M005', name: '牛タン', spec: '150g×6P', unit: 'P', category: '精肉', defaultQuantity: 0 },
  { id: 'M006', name: 'ハラミ', spec: '100g×10P', unit: 'P', category: '精肉', defaultQuantity: 0 },
  { id: 'M007', name: '和牛サーロイン', spec: '80g×5P', unit: 'P', category: '精肉', defaultQuantity: 0 },
  { id: 'M008', name: 'ホルモン（ミックス）', spec: '150g×8P', unit: 'P', category: '精肉', defaultQuantity: 0 },
  { id: 'M009', name: 'ラム肩ロース', spec: '100g×10P', unit: 'P', category: '精肉', defaultQuantity: 0 },
  { id: 'M010', name: '牛レバー', spec: '200g×5P', unit: 'P', category: '精肉', defaultQuantity: 0 },

  // 弁当関係
  { id: 'B001', name: 'テイクアウト容器(大)', spec: '50個入', unit: '個', category: '弁当関係', defaultQuantity: 0 },
  { id: 'B002', name: 'テイクアウト容器(小)', spec: '100個入', unit: '個', category: '弁当関係', defaultQuantity: 0 },
  { id: 'B003', name: '割り箸', spec: '1束(100膳)', unit: '1束(100枚)', category: '弁当関係', defaultQuantity: 0 },
  { id: 'B004', name: '弁当用仕切り', spec: '200枚入', unit: '枚', category: '弁当関係', defaultQuantity: 0 },
  { id: 'B005', name: '保冷袋', spec: '50枚入', unit: '個', category: '弁当関係', defaultQuantity: 0 },
  { id: 'B006', name: '焼肉弁当ご飯（冷凍）', spec: '200g×20個', unit: '個', category: '弁当関係', defaultQuantity: 0 },

  // 限定メニュー
  { id: 'L001', name: '黒毛和牛特上カルビ', spec: '80g×5P', unit: 'P', category: '限定メニュー', defaultQuantity: 0 },
  { id: 'L002', name: '季節野菜盛り合わせ', spec: '300g×8P', unit: 'P', category: '限定メニュー', defaultQuantity: 0 },
  { id: 'L003', name: '石焼きビビンバ（冷凍）', spec: '1食×10P', unit: 'P', category: '限定メニュー', defaultQuantity: 0 },
  { id: 'L004', name: 'サムギョプサルセット', spec: '2人前×5セット', unit: 'P', category: '限定メニュー', defaultQuantity: 0 },
  { id: 'L005', name: '特製冷麺（冷凍）', spec: '1食×10P', unit: 'P', category: '限定メニュー', defaultQuantity: 0 },

  // 野菜・サラダ
  { id: 'V001', name: 'サンチュ', spec: '1K', unit: 'K', category: '野菜・サラダ', defaultQuantity: 0 },
  { id: 'V002', name: 'キムチ（白菜）', spec: '1K', unit: 'K', category: '野菜・サラダ', defaultQuantity: 0 },
  { id: 'V003', name: 'もやし', spec: '200g×10袋', unit: '袋', category: '野菜・サラダ', defaultQuantity: 0 },
  { id: 'V004', name: 'ナムル（ミックス）', spec: '500g×4P', unit: 'P', category: '野菜・サラダ', defaultQuantity: 0 },
  { id: 'V005', name: 'ネギ（白）', spec: '1本', unit: '本', category: '野菜・サラダ', defaultQuantity: 0 },
  { id: 'V006', name: 'コーンサラダ（冷凍）', spec: '1K', unit: 'K', category: '野菜・サラダ', defaultQuantity: 0 },

  // 飲み物
  { id: 'D001', name: 'ビール（生）樽', spec: '20L', unit: '個', category: '飲み物', defaultQuantity: 0 },
  { id: 'D002', name: 'ソフトドリンクシロップ', spec: '5L×2本', unit: '本', category: '飲み物', defaultQuantity: 0 },
  { id: 'D003', name: 'ミネラルウォーター', spec: '500ml×24本', unit: '箱', category: '飲み物', defaultQuantity: 0 },
  { id: 'D004', name: 'コーラ（業務用）', spec: '1.5L×12本', unit: '箱', category: '飲み物', defaultQuantity: 0 },
  { id: 'D005', name: 'ウーロン茶（業務用）', spec: '1L×12本', unit: '箱', category: '飲み物', defaultQuantity: 0 },

  // タレ・調味料
  { id: 'S001', name: '焼肉タレ（甘口）', spec: '1.8L×6本', unit: '本', category: 'タレ・調味料', defaultQuantity: 0 },
  { id: 'S002', name: '焼肉タレ（辛口）', spec: '1.8L×6本', unit: '本', category: 'タレ・調味料', defaultQuantity: 0 },
  { id: 'S003', name: 'コチュジャン', spec: '500g×10個', unit: '個', category: 'タレ・調味料', defaultQuantity: 0 },
  { id: 'S004', name: 'ごま油', spec: '500ml×10本', unit: '本', category: 'タレ・調味料', defaultQuantity: 0 },
  { id: 'S005', name: 'ニンニク（チューブ）', spec: '1kg×4本', unit: '本', category: 'タレ・調味料', defaultQuantity: 0 },
  { id: 'S006', name: '塩（岩塩）', spec: '500g×10袋', unit: '袋', category: 'タレ・調味料', defaultQuantity: 0 },

  // 消耗品
  { id: 'C001', name: 'アルミホイル', spec: '30cm×100m', unit: '本', category: '消耗品', defaultQuantity: 0 },
  { id: 'C002', name: '使い捨て手袋', spec: '100枚入', unit: '箱', category: '消耗品', defaultQuantity: 0 },
  { id: 'C003', name: 'ラップ', spec: '30cm×100m', unit: '本', category: '消耗品', defaultQuantity: 0 },
  { id: 'C004', name: '網（交換用）', spec: '24cm×50枚', unit: '枚', category: '消耗品', defaultQuantity: 0 },
  { id: 'C005', name: 'おしぼり（紙）', spec: '100枚入', unit: '袋', category: '消耗品', defaultQuantity: 0 },
  { id: 'C006', name: '爪楊枝', spec: '1000本入', unit: '袋', category: '消耗品', defaultQuantity: 0 },
];

export const MOCK_ORDERS: Order[] = [];
