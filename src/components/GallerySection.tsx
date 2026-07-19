/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { X, ZoomIn, ChevronLeft, ChevronRight, Share2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteContent } from '../lib/cmsStore';

// Locally generated premium images
const HERO_CAKE = '/src/assets/images/homepage_hero_cake_1784453038791.jpg';
const BIRTHDAY_CAKE = '/src/assets/images/birthday_cake_1784453057938.jpg';
const WEDDING_CAKE = '/src/assets/images/wedding_cake_1784453075817.jpg';
const CUPCAKES = '/src/assets/images/cupcake_collection_1784453094801.jpg';

export default function GallerySection() {
  const { content } = useSiteContent();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const categories = [
    'All',
    'Birthday Cakes',
    'Wedding Cakes',
    'Customized Cakes',
    'Cupcakes',
    'Chocolate Cakes',
    'Kids Theme Cakes',
    'Floral Cakes'
  ];

  const galleryItems: GalleryItem[] = content.galleryItems || [
    {
      id: 'b1',
      title: 'Blush Velvet Birthday Cake',
      category: 'Birthday Cakes',
      image: BIRTHDAY_CAKE,
      description: 'Elegant vanilla buttercream frosting, white chocolate drips, edible pearls, and custom rose gold details. Extremely moist.'
    },
    {
      id: 'w1',
      title: 'Majestic Blush Wedding Cake',
      category: 'Wedding Cakes',
      image: WEDDING_CAKE,
      description: 'Magnificent 3-tier custom wedding cake decorated with realistic hand-sculpted sugar roses and real gold leaf accents.'
    },
    {
      id: 'cp1',
      title: 'Vanilla Pastel Dream Cupcakes',
      category: 'Cupcakes',
      image: CUPCAKES,
      description: 'Gourmet vanilla cupcakes piped with dual-shaded pink and cream buttercream swirls, decorated with mini edible pearls.'
    },
    {
      id: 'ch1',
      title: 'Decadent Fudge Chocolate Drip',
      category: 'Chocolate Cakes',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
      description: 'Rich dark Belgian chocolate sponge filled with premium fudge ganache and topped with cascading dark chocolate drips.'
    },
    {
      id: 'k1',
      title: 'Whimsical Pastel Unicorn',
      category: 'Kids Theme Cakes',
      image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=600&q=80',
      description: 'Whimsical birthday cake for kids with pastel rainbow buttercream layers, edible golden horn, and custom sleeping eyes.'
    },
    {
      id: 'f1',
      title: 'Secret Garden Floral Meadow',
      category: 'Floral Cakes',
      image: 'https://images.unsplash.com/photo-1464349172961-10492ec86537?auto=format&fit=crop&w=600&q=80',
      description: 'Intricately iced pastel cream cake loaded with pressed organic edible flowers, lavender sprigs, and dried berry dust.'
    },
    {
      id: 'c1',
      title: 'Rustic Caramel Drip Celebration',
      category: 'Customized Cakes',
      image: HERO_CAKE,
      description: 'Beautiful multi-tiered rustic cake with dynamic salted caramel splashes, fresh strawberries, raspberries, and white roses.'
    },
    {
      id: 'b2',
      title: 'Pastel Confetti Balloon Cake',
      category: 'Birthday Cakes',
      image: 'https://images.unsplash.com/photo-1518047601542-79f18c655718?auto=format&fit=crop&w=600&q=80',
      description: 'Vibrant confetti-filled cake layered with vanilla frosting and featuring a miniature balloon cake topper arrangement.'
    },
    {
      id: 'ch2',
      title: 'Hazelnut Praline Ganache',
      category: 'Chocolate Cakes',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
      description: 'Luxury milk chocolate cake covered in toasted organic hazelnuts, praline mousse, and a glossy chocolate mirror glaze.'
    },
    {
      id: 'w2',
      title: 'Semi-Naked Botanist Cake',
      category: 'Wedding Cakes',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?auto=format&fit=crop&w=600&q=80',
      description: 'A gorgeous semi-naked wedding design decorated with organic rosemary sprigs, eucalyptus leaves, and rustic wild berries.'
    },
    {
      id: 'cp2',
      title: 'Red Velvet Cream Cheese Collection',
      category: 'Cupcakes',
      image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80',
      description: 'Classic red velvet base topped with a silky, authentic whipped cream cheese frosting and a pinch of velvet crumbs.'
    },
    {
      id: 'f2',
      title: 'Elegant Pink Peony Cake',
      category: 'Floral Cakes',
      image: 'https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1?auto=format&fit=crop&w=600&q=80',
      description: 'Cream cake decorated with a colossal hand-sculpted pink sugar peony, sage-colored foliage, and gold speckles.'
    }
  ];

  // Filter items based on active category
  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      const prevIndex = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
      setLightboxIndex(prevIndex);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      const nextIndex = (lightboxIndex + 1) % filteredItems.length;
      setLightboxIndex(nextIndex);
    }
  };

  const shareItem = (item: GalleryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Check out this gorgeous ${item.title} on Thecakebake!`,
        url: window.location.href
      }).catch(console.error);
    } else {
      alert(`Copied link to clipboard: Thecakebake - ${item.title}`);
    }
  };

  return (
    <div id="gallery-section" className="pb-16 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-pink-dark font-sans">
          The Gallery of Artistry
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-brown dark:text-zinc-100">
          Our Custom Cake Masterpieces
        </h1>
        <div className="w-20 h-1 bg-brand-pink mx-auto rounded-full" />
        <p className="text-brand-brown-light dark:text-zinc-400 text-sm">
          Browse our freshly baked catalog. Filter by category, tap any card to view detailed ingredients/textures, and select your favorites for reference.
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            id={`filter-btn-${category.replace(/\s+/g, '-').toLowerCase()}`}
            onClick={() => setSelectedCategory(category)}
            className={`px-4.5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              selectedCategory === category
                ? 'bg-rose-gold-gradient text-brand-brown-dark font-bold shadow-md'
                : 'bg-white dark:bg-zinc-800 text-brand-brown/80 dark:text-zinc-300 border border-brand-brown/10 dark:border-zinc-700 hover:bg-brand-pink/20 hover:text-brand-brown'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Masonry-like Grid */}
      <motion.div
        id="gallery-grid"
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const actualIndex = galleryItems.findIndex(g => g.id === item.id);
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="glass-card rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-350 flex flex-col justify-between group cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                {/* Image Section */}
                <div className="relative overflow-hidden h-64 bg-zinc-100 dark:bg-zinc-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-cream/90 text-[10px] uppercase tracking-widest font-bold text-brand-brown border border-brand-brown/5 shadow-xs">
                    {item.category}
                  </span>

                  {/* Actions overlay */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      id={`zoom-item-${item.id}`}
                      className="p-3 rounded-full bg-white text-brand-brown hover:bg-brand-pink transition-colors cursor-pointer"
                      title="Enlarge details"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                    <button
                      id={`like-item-${item.id}`}
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className="p-3 rounded-full bg-white hover:bg-brand-pink transition-colors cursor-pointer"
                      title="Favorite cake"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites[item.id] ? 'fill-red-500 text-red-500' : 'text-brand-brown'
                        }`}
                      />
                    </button>
                    <button
                      id={`share-item-${item.id}`}
                      onClick={(e) => shareItem(item, e)}
                      className="p-3 rounded-full bg-white text-brand-brown hover:bg-brand-pink transition-colors cursor-pointer"
                      title="Share recipe/design"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-base font-bold text-brand-brown dark:text-zinc-100 group-hover:text-brand-pink-dark transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-brand-brown-light dark:text-zinc-400 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Modern Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            id="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              id="lightbox-close"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors z-50"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main Content Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative w-full max-w-4xl bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Column */}
              <div className="relative md:w-3/5 h-[350px] md:h-[500px] bg-black">
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Left/Right controls */}
                <button
                  id="lightbox-prev"
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/75 text-white cursor-pointer transition-all border border-white/5"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  id="lightbox-next"
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/75 text-white cursor-pointer transition-all border border-white/5"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Description Column */}
              <div className="p-8 md:w-2/5 flex flex-col justify-between text-left text-zinc-100 space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex px-3 py-1 bg-brand-pink/20 text-brand-pink border border-brand-pink/30 text-[10px] uppercase tracking-widest font-bold rounded-full">
                    {filteredItems[lightboxIndex].category}
                  </div>
                  <h2 className="text-2xl font-bold font-serif text-white tracking-tight">
                    {filteredItems[lightboxIndex].title}
                  </h2>
                  <div className="w-12 h-0.5 bg-brand-pink" />
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {filteredItems[lightboxIndex].description}
                  </p>
                  
                  {/* Key Highlights / Meta characteristics */}
                  <div className="space-y-2 pt-2 text-xs text-zinc-400">
                    <div className="flex justify-between border-b border-white/5 pb-1.5">
                      <span>100% Organic Flours</span>
                      <span className="text-white font-medium">Yes</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1.5">
                      <span>Baking Prep Time</span>
                      <span className="text-white font-medium">24 - 48 Hours</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1.5">
                      <span>Custom Design Level</span>
                      <span className="text-white font-medium">Master Artisan</span>
                    </div>
                  </div>
                </div>

                {/* Favorite & Quick Share buttons inside */}
                <div className="flex gap-2">
                  <button
                    id="lightbox-like"
                    onClick={(e) => toggleFavorite(filteredItems[lightboxIndex].id, e)}
                    className="flex-1 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/10"
                  >
                    <Heart
                      className={`w-4.5 h-4.5 ${
                        favorites[filteredItems[lightboxIndex].id] ? 'fill-red-500 text-red-500' : 'text-zinc-300'
                      }`}
                    />
                    {favorites[filteredItems[lightboxIndex].id] ? 'Loved' : 'Save to Board'}
                  </button>
                  <button
                    id="lightbox-share"
                    onClick={(e) => shareItem(filteredItems[lightboxIndex], e)}
                    className="p-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer transition-all border border-white/10"
                    title="Share design"
                  >
                    <Share2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
