/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ActivePage } from '../types';
import { Menu, X, Sun, Moon, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CakeLogo from './CakeLogo';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Header({ activePage, setActivePage, darkMode, setDarkMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: ActivePage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Cake Gallery', page: 'gallery' },
    { label: 'Services', page: 'services' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'Order Online', page: 'order' },
    { label: 'FAQ', page: 'faq' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            id="logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <CakeLogo size={42} className="group-hover:scale-105 transition-transform" />
            <div className="text-left">
              <span className="block font-serif text-2xl font-bold tracking-tight text-brand-brown dark:text-brand-pink">
                Thecakebake
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-brand-brown-light dark:text-zinc-400 font-sans -mt-1 font-medium">
                Freshly Baked with Love
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                id={`nav-item-${item.page}`}
                onClick={() => handleNavClick(item.page)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activePage === item.page
                    ? 'bg-brand-pink text-brand-brown-dark font-semibold shadow-xs'
                    : 'text-brand-brown/80 dark:text-zinc-300 hover:text-brand-brown dark:hover:text-white hover:bg-brand-pink/15'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions Block */}
          <div className="flex items-center gap-2">
            {/* Quick Order Icon Link */}
            <button
              id="quick-order-icon-btn"
              onClick={() => handleNavClick('order')}
              className="p-2.5 rounded-full bg-brand-pink/10 hover:bg-brand-pink/35 text-brand-brown dark:text-brand-pink cursor-pointer transition-colors relative"
              title="Order Cake"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              id="dark-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-full bg-brand-cream hover:bg-brand-cream-dark dark:bg-zinc-800 dark:hover:bg-zinc-700 text-brand-brown dark:text-zinc-300 transition-all cursor-pointer shadow-xs border border-brand-brown/5 dark:border-zinc-700"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full hover:bg-brand-pink/20 text-brand-brown dark:text-zinc-300 transition-colors cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden glass-nav border-t border-brand-brown/5 dark:border-zinc-800"
          >
            <div className="px-4 pt-3 pb-6 space-y-1 sm:px-6">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  id={`mobile-nav-item-${item.page}`}
                  onClick={() => handleNavClick(item.page)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    activePage === item.page
                      ? 'bg-rose-gold-gradient text-white font-semibold'
                      : 'text-brand-brown dark:text-zinc-300 hover:bg-brand-pink/15'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
