/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ActivePage } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import SEOHead from './components/SEOHead';

// Page Section imports
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import ServicesSection from './components/ServicesSection';
import PricingSection from './components/PricingSection';
import OrderSection from './components/OrderSection';
import ContactSection from './components/ContactSection';
import FAQSection from './components/FAQSection';

// Framer Motion layout transition triggers
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check local storage or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('thecakebake-dark-mode');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sync dark mode class with standard Document Root
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('thecakebake-dark-mode', String(darkMode));
  }, [darkMode]);

  // Determine SEO Metadata dynamically based on current route
  const getSEOMetadata = () => {
    switch (activePage) {
      case 'home':
        return {
          title: 'Premium Homemade Celebration Cakes',
          description: 'Thecakebake designs spectacular custom cakes for birthdays, weddings, baby showers, and anniversaries. Baked fresh using organic, premium ingredients.',
        };
      case 'about':
        return {
          title: 'Our Artisanal Baking Story',
          description: 'Meet the master bakeshops behind Thecakebake. Read our journey from a cozy home oven to a professional, highly hygienic cake craft laboratory.',
        };
      case 'gallery':
        return {
          title: 'Artisan Cake Gallery',
          description: 'Browse our beautiful catalog of birthday cakes, floral wedding cakes, gourmet chocolate drips, customized unicorn cakes, and mini-cupcakes.',
        };
      case 'services':
        return {
          title: 'Custom Cake Designing & Dessert Tables',
          description: 'Explore our services including on-site wedding cake assemblies, high-res corporate logo printing, custom dessert tables, and safe AC van deliveries.',
        };
      case 'pricing':
        return {
          title: 'Pricing Packages & Custom Quotes',
          description: 'Check starting prices for our 1-pound, 2-pound, and 3-pound cakes. Get high-end customizable rates aligned to your special dietary parameters.',
        };
      case 'order':
        return {
          title: 'Online Cake Booking Draft',
          description: 'Fill in your flavor profile, size, celebration theme, and upload design sketches. Forward directly to our WhatsApp help desk for rapid confirmation.',
        };
      case 'faq':
        return {
          title: 'Baking & Booking FAQ Support',
          description: 'Learn about our advance booking timelines, sanitization protocols, secure refund policies, and temperature-controlled AC delivery circles.',
        };
      case 'contact':
        return {
          title: 'Contact Our Bakery Studio',
          description: 'Locate us on Google Maps, find our WhatsApp hotline, social handles, or send us a digital message regarding corporate collaboration quotes.',
        };
      default:
        return {
          title: 'Freshly Baked with Love',
          description: 'Premium homemade cakes for birthdays, weddings, and anniversaries.',
        };
    }
  };

  const seo = getSEOMetadata();

  // Route selector
  const renderPageSection = () => {
    switch (activePage) {
      case 'home':
        return <HomeSection setActivePage={setActivePage} />;
      case 'about':
        return <AboutSection />;
      case 'gallery':
        return <GallerySection />;
      case 'services':
        return <ServicesSection />;
      case 'pricing':
        return <PricingSection setActivePage={setActivePage} />;
      case 'order':
        return <OrderSection />;
      case 'contact':
        return <ContactSection />;
      case 'faq':
        return <FAQSection />;
      default:
        return <HomeSection setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FFF8E7] dark:bg-zinc-950 text-[#5D4037] dark:text-zinc-100 transition-colors duration-300">
      {/* 1. Dynamic SEO Metadata & Schema Injections */}
      <SEOHead
        title={seo.title}
        description={seo.description}
        pageUrl={`https://thecakebake.com/${activePage}`}
      />

      {/* 2. Sticky Glass Header Navigation */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* 3. Smooth Animated Main Container */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="w-full"
          >
            {renderPageSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Persistent Conversion Floaters */}
      <FloatingButtons setActivePage={setActivePage} />

      {/* 5. Deep Footprint Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
