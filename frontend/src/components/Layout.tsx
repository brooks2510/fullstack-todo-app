import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, CheckSquare } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  username?: string;
}

const Layout = ({ children, username }: LayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 font-bold text-primary-700 text-xl cursor-pointer" onClick={() => navigate('/')}>
          <CheckSquare size={28} />
          <span>TaskFlow</span>
        </div>
        
        {username && (
          <div className="flex items-center gap-4">
            <span className="text-slate-600 font-medium hidden sm:inline">
              Welcome, <span className="text-slate-900">{username}</span>
            </span>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </nav>
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {children}
      </main>
      
      <footer className="py-6 text-center text-slate-500 text-sm border-t border-slate-100">
        &copy; {new Date().getFullYear()} TaskFlow App. Built with FastAPI & React.
      </footer>
    </div>
  );
};

export default Layout;
