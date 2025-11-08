import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Moon, Sun } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { categories } from '../data/mockData';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { getTotalItems } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 10);
      
      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-800/50'
          : 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group transition-transform duration-200 hover:scale-105"
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent transition-all duration-300">
              TechStore
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              to="/products"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 relative group"
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              to="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              aria-label="Search"
            >
              <Search className="w-5 h-5 transition-transform duration-200 hover:scale-110" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 transition-transform duration-200 hover:rotate-90" />
              ) : (
                <Moon className="w-5 h-5 transition-transform duration-200 hover:-rotate-12" />
              )}
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 group"
            >
              <ShoppingCart className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
              {getTotalItems() > 0 && (
                <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in shadow-lg">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 transition-transform duration-200 rotate-90" />
              ) : (
                <Menu className="w-5 h-5 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isSearchOpen ? 'max-h-20 opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <form onSubmit={handleSearch} className="flex gap-2 animate-fade-in">
            <input
              type="text"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-200 focus:outline-none focus:border-primary-400 dark:focus:border-primary-500 focus:ring-0 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] dark:focus:shadow-[0_0_0_3px_rgba(56,189,248,0.1)]"
              autoFocus
            />
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 active:scale-95 transition-all duration-200 ripple font-medium"
            >
              Search
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100 border-t border-gray-200 dark:border-gray-800 mt-4 pt-4 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col space-y-3 animate-fade-in">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition-all duration-200"
            >
              Products
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition-all duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-lg transition-all duration-200"
            >
              Contact
            </Link>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 px-3">
                Categories
              </p>
              <div className="flex flex-wrap gap-2 px-3">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/products?category=${category.slug}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 font-medium"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
