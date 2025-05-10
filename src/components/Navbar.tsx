
import { Link } from 'react-router-dom';
import { Shield, BarChart2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <header className="bg-app-darkBlue text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-app-teal" />
            <span className="font-bold text-xl">CallShield</span>
          </Link>
          
          <nav className="hidden md:flex space-x-1">
            <Button
              variant={location.pathname === '/' ? 'secondary' : 'ghost'}
              asChild
              className="text-white hover:text-white hover:bg-app-teal/20"
            >
              <Link to="/" className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </Button>
            
            <Button
              variant={location.pathname === '/calls' ? 'secondary' : 'ghost'}
              asChild
              className="text-white hover:text-white hover:bg-app-teal/20"
            >
              <Link to="/calls" className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>Call Log</span>
              </Link>
            </Button>
            
            <Button
              variant={location.pathname === '/analytics' ? 'secondary' : 'ghost'}
              asChild
              className="text-white hover:text-white hover:bg-app-teal/20"
            >
              <Link to="/analytics" className="flex items-center space-x-1">
                <BarChart2 className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
            </Button>
          </nav>
          
          <div className="md:hidden">
            {/* Mobile menu button would go here */}
            <Button variant="ghost" size="sm" className="text-white">
              <span className="sr-only">Open menu</span>
              ≡
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
