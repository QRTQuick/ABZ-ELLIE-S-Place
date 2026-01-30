
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Heart, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 via-red-500 to-yellow-400 rounded-lg flex items-center justify-center text-white shadow-lg">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold font-serif tracking-tight leading-none text-slate-900">ABZ&ELLIE</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-medium">Place</p>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600 uppercase tracking-widest">
          <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
          <a href="#shop" className="hover:text-red-500 transition-colors">Shop</a>
          <a href="#about" className="hover:text-yellow-600 transition-colors">About</a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-slate-600 hover:text-red-500 transition-colors">
            <Heart size={22} />
          </button>
          <button 
            onClick={onOpenCart}
            className="p-2 text-slate-600 hover:text-blue-600 transition-colors relative"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-slate-900 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-xl border-t border-slate-100 p-6 flex flex-col space-y-4 animate-in slide-in-from-top duration-300">
          <a href="#" className="text-lg font-medium text-slate-800" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="#shop" className="text-lg font-medium text-slate-800" onClick={() => setIsMobileMenuOpen(false)}>Shop</a>
          <a href="#about" className="text-lg font-medium text-slate-800" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#contact" className="text-lg font-medium text-slate-800" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
