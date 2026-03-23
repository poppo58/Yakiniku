import type { OrderStatus } from '../../types';

interface BadgeProps {
  status: OrderStatus;
}

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  未確認: { label: '未確認', className: 'bg-yellow-100 text-yellow-800' },
  確認済み: { label: '確認済み', className: 'bg-blue-100 text-blue-800' },
  出荷済み: { label: '出荷済み', className: 'bg-purple-100 text-purple-800' },
  完了: { label: '完了', className: 'bg-green-100 text-green-800' },
};

export function Badge({ status }: BadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.className}`}>
      {config.label}
    </span>
  );
}
