import { useNavigate } from 'react-router-dom';
import { Store, Building2 } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-3xl">🥩</span>
          <h1 className="text-2xl font-bold text-gray-900">焼肉チェーン 発注管理</h1>
        </div>
        <p className="text-sm text-gray-500">ログイン先を選択してください</p>
      </div>

      <div className="w-full max-w-sm space-y-3">
        <button
          onClick={() => navigate('/store')}
          className="flex w-full items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm hover:border-red-300 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
            <Store size={24} />
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-900">店舗としてログイン</p>
            <p className="text-xs text-gray-500 mt-0.5">発注入力画面へ</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/center')}
          className="flex w-full items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm hover:border-blue-300 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Building2 size={24} />
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-900">センターとしてログイン</p>
            <p className="text-xs text-gray-500 mt-0.5">受注管理画面へ</p>
          </div>
        </button>
      </div>
    </div>
  );
}
