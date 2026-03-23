import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const config = {
  success: {
    bg: 'bg-green-600',
    icon: <CheckCircle size={18} />,
    autoClose: 3000,
  },
  error: {
    bg: 'bg-red-600',
    icon: <AlertCircle size={18} />,
    autoClose: null, // 手動閉じのみ
  },
  info: {
    bg: 'bg-blue-600',
    icon: <Info size={18} />,
    autoClose: 3000,
  },
};

export function Toast({ message, type, onClose }: ToastProps) {
  const { bg, icon, autoClose } = config[type];

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg px-4 py-3 text-white shadow-lg
        ${bg} animate-fade-in`}
      style={{ minWidth: '280px', maxWidth: '360px' }}
      role="alert"
    >
      <span className="shrink-0">{icon}</span>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="shrink-0 rounded p-0.5 hover:bg-white/20 transition-colors"
        aria-label="閉じる"
      >
        <X size={16} />
      </button>
    </div>
  );
}
