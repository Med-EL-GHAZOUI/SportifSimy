import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return <>{children}</>;
  }

  const navItems = [
    { icon: 'fitness_center', label: 'Training', path: '/training' },
    { icon: 'assignment_turned_in', label: 'Check-ins', path: '/check-ins' },
    { icon: 'restaurant', label: 'Nutrition', path: '/nutrition', filled: true },
    { icon: 'insights', label: 'Progress', path: '/progress' },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-slate-100 flex-col py-8 gap-4 transition-all duration-300 ease-in-out">
        <div className="px-6 mb-8">
          <h1 className="font-['Manrope'] font-extrabold text-indigo-600 text-xl tracking-tight">
            The Fluid Pulse
          </h1>
          <p className="text-xs text-[#596063] font-medium uppercase tracking-widest mt-1">
            Elite Performance
          </p>
        </div>

        <nav className="flex flex-col flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-4 transition-all text-sm ${
                  isActive
                    ? 'text-indigo-600 font-bold border-r-4 border-indigo-600 bg-white'
                    : 'text-slate-500 hover:text-indigo-500 hover:bg-slate-50 font-medium'
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: item.filled ? '"FILL" 1' : '"FILL" 0' }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-6 mt-auto">
          <div className="flex items-center gap-3 p-3 bg-[#f1f4f6] rounded-xl">
            <img
              alt="User Profile"
              className="w-10 h-10 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">Alex Rivera</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Header */}
      <header className="md:ml-64 bg-slate-50/70 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-[1440px] mx-auto">
          <h2 className="font-['Manrope'] font-bold text-2xl tracking-tight text-indigo-600">
            {navItems.find(item => location.pathname.startsWith(item.path))?.label || 'The Fluid Pulse'}
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="md:ml-64">
        {children}
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-50 border-t-0 shadow-[0_-8px_24px_rgba(45,51,55,0.08)] px-6 py-4 flex justify-between items-center z-50">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 ${
                isActive ? 'text-indigo-600' : 'text-slate-500'
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: item.filled && isActive ? '"FILL" 1' : '"FILL" 0' }}
              >
                {item.icon}
              </span>
              <span className="text-[10px] font-bold">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
