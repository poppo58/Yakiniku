import { ChevronDown, ChevronUp, Store } from 'lucide-react';
import type { Order } from '../../types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

interface OrderCardProps {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
}

export function OrderCard({ order, isExpanded, onToggle }: OrderCardProps) {
  const total = order.lines.reduce((s, l) => s + l.orderedQty, 0);

  return (
    <Card className="overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
            <Store size={18} />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">{order.storeName}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              注文ID: {order.id} &nbsp;·&nbsp; 納品日: {order.deliveryDate}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Badge status={order.status} />
          <span className="text-sm text-gray-500 hidden sm:block">{total} 点</span>
          {isExpanded ? (
            <ChevronUp size={18} className="text-gray-400" />
          ) : (
            <ChevronDown size={18} className="text-gray-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-100 px-5 pb-5">
          <p className="pt-3 text-xs text-gray-500 mb-2">
            発注日時: {new Date(order.orderDate).toLocaleString('ja-JP')}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <th className="pb-2 pr-4">商品名</th>
                  <th className="pb-2 pr-4">規格</th>
                  <th className="pb-2 pr-4 text-right">発注数</th>
                  <th className="pb-2 text-right">納品数</th>
                </tr>
              </thead>
              <tbody>
                {order.lines.map((line) => (
                  <DeliveryRow key={line.item.id} line={line} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  );
}

// 納品数入力行（センター担当者が入力）
interface DeliveryRowProps {
  line: Order['lines'][number];
}

function DeliveryRow({ line }: DeliveryRowProps) {
  return (
    <tr className="border-b border-gray-50 last:border-0">
      <td className="py-2.5 pr-4 font-medium text-gray-900">{line.item.name}</td>
      <td className="py-2.5 pr-4 text-gray-500 text-xs">{line.item.spec}</td>
      <td className="py-2.5 pr-4 text-right font-semibold text-gray-900">
        {line.orderedQty}
        <span className="ml-1 text-xs font-normal text-gray-400">{line.item.unit}</span>
      </td>
      <td className="py-2.5 text-right">
        <input
          type="number"
          min={0}
          defaultValue={line.deliveredQty ?? ''}
          placeholder="—"
          onChange={(e) => {
            // フェーズ1: モック（実際の送信処理はフェーズ2で実装）
            console.log(`[MOCK] 納品数変更: ${line.item.name} → ${e.target.value}`);
          }}
          className="w-20 rounded-md border border-gray-300 px-2 py-1 text-right text-sm font-semibold focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400"
          aria-label={`${line.item.name} 納品数`}
        />
        <span className="ml-1 text-xs text-gray-400">{line.item.unit}</span>
      </td>
    </tr>
  );
}
