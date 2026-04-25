import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ClipboardList, Settings, Menu, Bell, LogOut, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useAuth } from '../App';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { name: 'หน้าหลัก', path: '/', icon: LayoutDashboard },
    { name: 'ผู้ใช้งาน', path: '/users', icon: Users },
    { name: 'บทบาท & สิทธิ์', path: '/roles', icon: ShieldCheck },
    { name: 'กิจกรรม', path: '/activities', icon: ClipboardList },
    { name: 'ตั้งค่า', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-outline-variant">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm">
              <LayoutDashboard size={20} />
            </div>
            <span className="text-xl font-bold text-on-surface tracking-tight">Membership</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative duration-200 ${
                      isActive 
                        ? 'bg-secondary-container text-primary font-bold shadow-sm' 
                        : 'text-on-surface-variant hover:bg-surface-variant'
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeNav"
                        className="absolute left-0 top-3 bottom-3 w-1.5 bg-primary rounded-r-full"
                      />
                    )}
                    <item.icon size={20} className={isActive ? 'text-primary' : 'text-on-surface-variant'} />
                    <span className="text-[15px]">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-outline-variant space-y-2">
          <Link to="/profile" className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-variant transition-all">
            <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover ring-2 ring-surface-variant" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-on-surface truncate">{user.name}</p>
              <p className="text-xs text-on-surface-variant truncate">{user.role}</p>
            </div>
          </Link>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-500 rounded-xl transition-all text-sm font-medium"
          >
            <LogOut size={18} />
            ออกจากระบบ
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-50 md:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 flex items-center justify-between border-b border-outline-variant">
                <span className="text-xl font-bold text-primary">Membership App</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-surface-variant rounded-full">
                  <Menu size={20} />
                </button>
              </div>
              <nav className="flex-1 px-4 py-4">
                <ul className="space-y-1">
                  {menuItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          location.pathname === item.path ? 'bg-secondary-container text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-variant'
                        }`}
                      >
                        <item.icon size={20} />
                        <span className="text-[15px]">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="p-6 border-t border-outline-variant">
                <button onClick={logout} className="flex items-center gap-3 text-red-500 font-bold">
                  <LogOut size={20} />
                  ออกจากระบบ
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-white border-b border-outline-variant sticky top-0 z-30">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition-all"
          >
            <Menu size={24} />
          </button>
          
          <div className="hidden md:block">
            <h2 className="text-xl font-bold text-on-surface tracking-tight">
              {menuItems.find(item => item.path === location.pathname)?.name || 'แดชบอร์ด'}
            </h2>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <button className="p-2 text-on-surface-variant hover:bg-surface-variant rounded-full relative transition-all group">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            </button>
            <div className="h-8 w-px bg-outline-variant hidden sm:block" />
            <Link to="/profile" className="flex items-center gap-3 group">
              <img src={user.avatar} alt="Avatar" className="w-9 h-9 rounded-full border border-outline-variant group-hover:ring-2 ring-primary transition-all object-cover" />
              <span className="hidden lg:inline text-sm font-bold text-on-surface">{user.name}</span>
            </Link>
          </div>
        </header>

        {/* Page Area */}
        <main className="flex-1 overflow-y-auto bg-surface-container-low">
          <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
