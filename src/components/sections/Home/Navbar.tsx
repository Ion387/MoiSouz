import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenLogin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold tracking-tighter text-slate-900">
            Наш<span className="text-primary-600">Союз</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-slate-600 hover:text-primary-600 transition-colors font-medium">Возможности</a>
          <a href="#steps" className="text-slate-600 hover:text-primary-600 transition-colors font-medium">Как работает</a>
          <a href="#benefits" className="text-slate-600 hover:text-primary-600 transition-colors font-medium">Польза</a>
          <a href="#pricing" className="text-slate-600 hover:text-primary-600 transition-colors font-medium">Стоимость</a>
          <button 
            onClick={onOpenLogin}
            className="border border-slate-200 text-slate-900 px-6 py-2 rounded-full font-medium hover:border-primary-600 hover:text-primary-600 transition-all"
          >
            Войти
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-700">Возможности</a>
              <a href="#steps" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-700">Как работает</a>
              <a href="#benefits" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-700">Польза</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-700">Стоимость</a>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium"
              >
                Войти
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;