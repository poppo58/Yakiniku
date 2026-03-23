// 1. useNavigate と useLocation を追加インポート
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { LoginPage } from './pages/LoginPage';
import { StoreOrderPage } from './pages/StoreOrderPage';
import { CenterDashboardPage } from './pages/CenterDashboardPage';

const ROUTE_LABELS: Record<string, string> = {
  '/store': '店舗発注',
  '/center': 'センター管理',
};

function NavBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const label = ROUTE_LABELS[pathname];

  if (!label) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gray-900 px-4 py-2 text-xs">
      <span className="font-semibold text-white">{label}</span>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1.5 rounded-full px-3 py-1 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
      >
        <LogOut size={13} />
        ログアウト
      </button>
    </nav>
  );
}

function AppRoutes() {
  const { pathname } = useLocation();
  const hasNav = pathname !== '/';

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className={hasNav ? 'pt-9' : ''}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/store" element={<StoreOrderPage />} />
          <Route path="/center" element={<CenterDashboardPage />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    // 2. BrowserRouter を Router (HashRouterの別名) に変更！
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;