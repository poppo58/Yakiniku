import { useState } from 'react';
import { StoreOrderPage } from './pages/StoreOrderPage';
import { CenterDashboardPage } from './pages/CenterDashboardPage';

type View = 'store' | 'center';

function App() {
  const [view, setView] = useState<View>('store');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ナビゲーション切り替え（フェーズ1用デモ） */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-1 bg-gray-900 px-4 py-2 text-xs">
        <span className="mr-3 text-gray-400 font-medium">画面切替:</span>
        <button
          onClick={() => setView('store')}
          className={`rounded-full px-3 py-1 font-semibold transition-colors ${
            view === 'store'
              ? 'bg-red-500 text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          店舗発注
        </button>
        <button
          onClick={() => setView('center')}
          className={`rounded-full px-3 py-1 font-semibold transition-colors ${
            view === 'center'
              ? 'bg-red-500 text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-700'
          }`}
        >
          センター管理
        </button>
      </nav>

      {/* ページトップに余白（ナビバー分） */}
      <div className="pt-9">
        {view === 'store' ? <StoreOrderPage /> : <CenterDashboardPage />}
      </div>
    </div>
  );
}

export default App;
