/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ActivePage } from '../types';
import { PhoneCall, ArrowUp, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingButtonsProps {
  setActivePage: (page: ActivePage) => void;
}

export default function FloatingButtons({ setActivePage }: FloatingButtonsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderClick = () => {
    setActivePage('order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="floating-actions" className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-top-btn"
            id="scroll-to-top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white dark:bg-zinc-800 text-brand-brown dark:text-zinc-200 border border-brand-brown/10 dark:border-zinc-700 hover:bg-brand-pink/20 shadow-lg cursor-pointer transition-colors"
            title="Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Order Now */}
      <motion.button
        id="floating-order-btn"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={handleOrderClick}
        className="flex items-center gap-2 px-4.5 py-3 rounded-full bg-rose-gold-gradient hover:bg-rose-gold-hover text-brand-brown-dark font-semibold shadow-xl hover:scale-105 transition-all cursor-pointer border border-white/20"
        title="Order Cake Online"
      >
        <ShoppingBag className="w-4.5 h-4.5" />
        <span className="text-xs uppercase tracking-wider hidden sm:inline">Order Now</span>
      </motion.button>

      {/* Floating WhatsApp Chat */}
      <motion.a
        id="floating-whatsapp-btn"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        href="https://wa.me/923053623409?text=Hello%20Thecakebake!%20I'd%20like%20to%20inquire%20about%20ordering%20a%20custom%20cake."
        target="_blank"
        rel="noopener noreferrer"
        className="p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:scale-110 transition-all cursor-pointer flex items-center justify-center relative group"
        title="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <PhoneCall className="w-5.5 h-5.5" />
        {/* Tooltip */}
        <span className="absolute right-14 bg-white dark:bg-zinc-800 text-brand-brown dark:text-zinc-200 text-[11px] font-medium px-2.5 py-1.5 rounded-lg shadow-md border border-brand-brown/10 dark:border-zinc-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Cake Consultation on WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
