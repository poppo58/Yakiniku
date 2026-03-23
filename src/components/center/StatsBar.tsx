import { ClipboardList, CheckCircle, Truck } from 'lucide-react';
import type { Order, OrderStatus } from '../../types';

interface StatsBarProps {
  orders: Order[];
}

function countByStatus(orders: Order[], status: OrderStatus) {
  return orders.filter((o) => o.status === status).length;
}

export function StatsBar({ orders }: StatsBarProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard
        icon={<ClipboardList size={20} className="text-yellow-600" />}
        label="未確認"
        value={countByStatus(orders, '未確認')}
        bg="bg-yellow-50"
      />
      <StatCard
        icon={<CheckCircle size={20} className="text-blue-600" />}
        label="確認済み"
        value={countByStatus(orders, '確認済み')}
        bg="bg-blue-50"
      />
      <StatCard
        icon={<Truck size={20} className="text-purple-600" />}
        label="出荷済み"
        value={countByStatus(orders, '出荷済み')}
        bg="bg-purple-50"
      />
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  bg: string;
}

function StatCard({ icon, label, value, bg }: StatCardProps) {
  return (
    <div className={`rounded-xl p-4 ${bg} flex items-center gap-3`}>
      <div>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}
