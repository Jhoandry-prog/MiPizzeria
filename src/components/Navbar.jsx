import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useUser } from '../hooks/useUser';
import { Pizza, ShoppingCart, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();
  const { user } = useUser();
  const location = useLocation();
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md text-gray-800' : 'bg-red-600 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Pizza 
                size={32} 
                className={`mr-2 ${isScrolled ? 'text-red-600' : 'text-white'}`} 
              />
              <span className="font-bold text-xl">Ciao Pizza</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link 
              to="/" 
              className={`font-medium hover:text-red-300 transition-colors ${
                location.pathname === '/' ? 'border-b-2 border-white' : ''
              }`}
            >
              Inicio
            </Link>
            <Link 
              to="/cart" 
              className="relative font-medium hover:text-red-300 transition-colors"
            >
              <ShoppingCart className="inline mr-1" size={18} />
              Carrito
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            {user ? (
              <Link 
                to="/profile" 
                className="font-medium hover:text-red-300 transition-colors"
              >
                <User className="inline mr-1" size={18} />
                Perfil
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="font-medium hover:text-red-300 transition-colors"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-red-300 hover:bg-red-700 focus:outline-none"
              aria-label="Main menu"
              aria-expanded="false"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${
          isScrolled ? 'bg-white' : 'bg-red-600'
        }`}>
          <Link
            to="/"
            className="block px-3 py-2 rounded-md font-medium hover:bg-red-700 hover:text-white"
          >
            Inicio
          </Link>
          <Link
            to="/cart"
            className="block px-3 py-2 rounded-md font-medium hover:bg-red-700 hover:text-white"
          >
            <ShoppingCart className="inline mr-2" size={18} />
            Carrito
            {totalItems > 0 && (
              <span className="ml-2 bg-yellow-500 text-white text-xs font-bold rounded-full h-5 w-5 inline-flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          {user ? (
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md font-medium hover:bg-red-700 hover:text-white"
            >
              <User className="inline mr-2" size={18} />
              Perfil
            </Link>
          ) : (
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md font-medium hover:bg-red-700 hover:text-white"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;