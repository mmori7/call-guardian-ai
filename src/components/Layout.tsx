
import { ReactNode } from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      <main className={`flex-1 container mx-auto px-4 py-6 ${isHome ? 'max-w-7xl' : 'max-w-5xl'}`}>
        {children}
      </main>
      <footer className="py-6 bg-app-darkBlue text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© {new Date().getFullYear()} CallShield. All rights reserved.</p>
          <p className="text-xs mt-1 text-slate-300">This is a demo app. Not for actual call interception.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
