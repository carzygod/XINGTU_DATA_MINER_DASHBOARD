import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { authService } from '../services/authService';
import { useToast } from './Toast';

interface LayoutProps {
  children: ReactNode;
}

const menuItems = [
  { path: '/dashboard', label: '数据面板', icon: '📊星图' },
  { path: '/control', label: '控制中心', icon: '🎮星图' },
  { path: '/accounts', label: '账号管理', icon: '👥星图' },
  { path: '/darens', label: '达人管理', icon: '⭐星图' },
  { path: '/pgydashboard', label: '数据面板', icon: '🌼蒲公英' },
  { path: '/pgycontrol', label: '控制中心', icon: '☀蒲公英' },
  { path: '/pgydarens', label: '达人管理', icon: '🌙蒲公英' },
];

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
    showToast('已登出', 'info');
    navigate('/login');
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-[#0f111a] flex">
      {/* 移动端遮罩 */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* 侧边栏 */}
      <aside className={clsx(
        'fixed lg:static inset-y-0 left-0 z-50',
        'w-64 bg-[#1a1d2e] backdrop-blur-lg bg-opacity-90',
        'flex flex-col transition-transform duration-300',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="p-6 border-b border-[#2d3250]">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#5b8def] to-[#7aa2f7] bg-clip-text text-transparent">
            XINGTU ADMIN
          </h1>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-[#2d3250] text-[#e1e7f5] border-l-2 border-[#4f7cff]'
                    : 'text-[#c4d0ed] hover:bg-[#2d3250] hover:bg-opacity-50'
                )}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* 登出按钮 */}
        <div className="p-4 border-t border-[#2d3250]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#c4d0ed] hover:bg-[#2d3250] hover:bg-opacity-50 transition-all duration-200"
          >
            <span className="text-xl">🚪</span>
            <span className="font-medium">登出</span>
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 顶部栏（移动端） */}
        <header className="lg:hidden bg-[#1a1d2e] p-4 flex items-center justify-between border-b border-[#2d3250]">
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#5b8def] to-[#7aa2f7] bg-clip-text text-transparent">
            XINGTU ADMIN
          </h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#e1e7f5]"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        {/* 页面内容 */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <div className="max-w-[1440px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
