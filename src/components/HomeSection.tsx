/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ActivePage, CakeCategory, Testimonial } from '../types';
import { ShoppingBag, ArrowRight, Award, ShieldCheck, Heart, ThumbsUp, Eye, Star, Sparkles, MessageCircle, HeartHandshake, Pencil, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteContent } from '../lib/cmsStore';

// Import local generated images (using import/relative path if needed, or string paths that are served statically)
const HERO_CAKE = '/src/assets/images/homepage_hero_cake_1784453038791.jpg';
const BIRTHDAY_CAKE = '/src/assets/images/birthday_cake_1784453057938.jpg';
const WEDDING_CAKE = '/src/assets/images/wedding_cake_1784453075817.jpg';
const CUPCAKES = '/src/assets/images/cupcake_collection_1784453094801.jpg';

interface HomeSectionProps {
  setActivePage: (page: ActivePage) => void;
}

export default function HomeSection({ setActivePage }: HomeSectionProps) {
  const { content, updateContent } = useSiteContent();
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState(content.heroImage || '');

  // Keep imageUrlInput state in sync with content.heroImage updates
  useEffect(() => {
    setImageUrlInput(content.heroImage || '');
  }, [content.heroImage]);

  const categories: CakeCategory[] = content.categories || [
    {
      id: 'birthday',
      name: 'Birthday Cakes',
      description: 'Customized creations with vibrant colors, themes, and personalized touches to celebrate birthdays beautifully.',
      image: BIRTHDAY_CAKE,
    },
    {
      id: 'wedding',
      name: 'Wedding Cakes',
      description: 'Elegant multi-tiered masterpieces with hand-crafted floral details to celebrate eternal unions.',
      image: WEDDING_CAKE,
    },
    {
      id: 'cupcakes',
      name: 'Gourmet Cupcakes',
      description: 'Delectable, individually styled mini-treats topped with premium cream swirls and gourmet sprinkles.',
      image: CUPCAKES,
    },
    {
      id: 'custom',
      name: 'Customized Artistry',
      description: 'Bespoke designs shaped exactly according to your theme, mood boards, and favorite flavor combinations.',
      image: content.heroImage || HERO_CAKE, // Fallback to hero
    },
  ];

  const testimonials: Testimonial[] = content.testimonials || [
    {
      id: '1',
      name: 'Sophia Carter',
      role: 'Mother of Two',
      comment: 'The custom birthday cake for my daughter was absolutely stunning and tasted like a slice of heaven. The blush cream icing was delicate, not overly sweet. Highly recommend!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: '2',
      name: 'Alexander Sterling',
      role: 'Wedding Groom',
      comment: 'For our wedding, we wanted a cake that matched our floral theme. Thecakebake delivered a absolute masterpiece. The 3-tier rose gold roses were so realistic, and guests kept praising the moist layers!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: '3',
      name: 'Diana Prince',
      role: 'Marketing Coordinator',
      comment: 'Booked cupcakes for our corporate rebranding launch. Clean branding, pure hygiene standards, and divine chocolate flavors. It was a huge success!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
  ];

  const instagramPosts = [
    {
      id: 1,
      image: BIRTHDAY_CAKE,
      likes: 342,
      comments: 29,
      tags: '#birthdaycake #homebaker #thecakebake',
    },
    {
      id: 2,
      image: WEDDING_CAKE,
      likes: 512,
      comments: 41,
      tags: '#weddingcake #fondantart #premiumcakes',
    },
    {
      id: 3,
      image: CUPCAKES,
      likes: 219,
      comments: 18,
      tags: '#cupcakes #pastelfrosting #desserttables',
    },
    {
      id: 4,
      image: content.heroImage || HERO_CAKE,
      likes: 681,
      comments: 57,
      tags: '#celebrationcake #sugarroses #freshlybaked',
    },
  ];

  return (
    <div id="home-section" className="space-y-24 pb-12 overflow-hidden">
      {/* 1. Hero Banner */}
      <section id="hero-banner" className="relative min-h-[90vh] flex items-center pt-32 pb-16 bg-brand-cream/40 dark:bg-zinc-950/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Content Column */}
            <div className="w-full lg:w-3/5 text-left space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block px-4 py-1.5 bg-[#F8BBD0]/20 text-[#5D4037] dark:text-brand-pink text-xs font-bold rounded-full w-fit tracking-wider font-sans"
              >
                🎂 FRESHLY BAKED WITH LOVE
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-brand-brown dark:text-zinc-100 tracking-tight leading-[1.1]"
              >
                {content.heroTitle || 'Freshly Baked Cakes for'} <span className="text-brand-pink-dark dark:text-brand-pink italic">{content.heroHighlight || 'Every'}</span> Celebration
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-[#5D4037]/80 dark:text-zinc-300 leading-relaxed max-w-lg font-sans"
              >
                {content.heroSubtitle || 'Custom-made cakes prepared with premium organic ingredients and delivered fresh to your doorstep. Boutique designs for your most cherished moments.'}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <button
                  id="hero-order-cta"
                  onClick={() => { setActivePage('order'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-8 py-4 rounded-full bg-rose-gold-gradient hover:bg-rose-gold-hover text-white font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-103 transition-all cursor-pointer flex items-center gap-2 border border-white/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {content.heroCtaText || 'Order Now'}
                </button>
                <button
                  id="hero-gallery-cta"
                  onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-8 py-4 rounded-full border-2 border-brand-pink hover:border-brand-pink-dark text-brand-brown dark:text-zinc-100 font-bold text-xs uppercase tracking-widest hover:scale-103 transition-all cursor-pointer flex items-center gap-2 bg-transparent"
                >
                  View Gallery
                  <ArrowRight className="w-4 h-4 text-brand-pink-dark" />
                </button>
              </motion.div>
            </div>

            {/* Right Visual Geometric Column */}
            <div className="w-full lg:w-2/5 relative flex items-center justify-center py-8">
              {/* Backing geometric circles to match theme visual */}
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#F8BBD0] rounded-full mix-blend-multiply opacity-20 dark:opacity-10 blur-xl animate-pulse"></div>
              <div className="absolute -top-10 -left-10 w-56 h-56 bg-[#F8BBD0] rounded-full mix-blend-multiply opacity-20 dark:opacity-10 blur-xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[440px] sm:w-[420px] sm:h-[520px] border border-[#5D4037]/10 dark:border-zinc-800 rounded-full rotate-6"></div>
              
              {/* Thick bordered rotated image container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 3 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-[280px] h-[380px] sm:w-[340px] sm:h-[460px] rounded-full overflow-hidden border-[12px] border-white dark:border-zinc-800 shadow-2xl z-10 hover:rotate-0 transition-transform duration-500 relative group"
              >
                <img
                  src={content.heroImage || HERO_CAKE}
                  alt="Premium celebration cake"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setIsEditingImage(true)}
                  className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white cursor-pointer z-20"
                >
                  <div className="p-3 bg-white/20 backdrop-blur-xs rounded-full border border-white/40 hover:scale-110 transition-transform">
                    <Pencil className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider px-4 text-center">Change Celebration Cake Image</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories */}
      <section id="featured-categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-pink-dark font-sans">
            Our Delicious Range
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-brown dark:text-zinc-100">
            Featured Cake Categories
          </h2>
          <div className="w-20 h-1 bg-brand-pink mx-auto rounded-full" />
          <p className="text-brand-brown-light dark:text-zinc-400 text-sm">
            Whether it is an intimate wedding, a toddler's birthday, or a grand corporate event, we design bespoke cakes that match your dreams perfectly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden hover:shadow-xl group transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 text-[10px] uppercase tracking-widest font-bold text-brand-brown shadow-xs">
                  Premium
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-brand-brown dark:text-zinc-100 mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-brand-brown-light dark:text-zinc-400 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>
                <button
                  id={`cat-btn-${cat.id}`}
                  onClick={() => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full py-2.5 rounded-xl border border-brand-pink-dark/20 hover:bg-brand-pink/20 text-brand-brown dark:text-zinc-300 font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Explore Category
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <section id="why-choose-us" className="bg-brand-cream/30 dark:bg-zinc-900/40 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-pink-dark font-sans">
              Pure Dedication
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-brown dark:text-zinc-100">
              Why Our Bakers Are Loved
            </h2>
            <div className="w-20 h-1 bg-brand-pink mx-auto rounded-full" />
            <p className="text-brand-brown-light dark:text-zinc-400 text-sm">
              We stand apart through our stubborn focus on hygiene, artisanal aesthetics, and purely gourmet taste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8 text-brand-brown dark:text-brand-pink" />,
                title: '100% Fresh & Homemade',
                desc: 'We never freeze sponges. Every single order is mixed, baked, frosted, and crafted on-demand from scratch, preserving unparalleled fluffiness.'
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-brand-brown dark:text-brand-pink" />,
                title: 'Surgical Hygiene Standards',
                desc: 'Our kitchens adhere to elite sanitation codes. All tools are sterilized, masks/gloves are strictly worn, and ingredients are kept locked under ideal temperatures.'
              },
              {
                icon: <HeartHandshake className="w-8 h-8 text-brand-brown dark:text-brand-pink" />,
                title: 'High-End Customizations',
                desc: 'Your mood boards, colors, themes, and personalized toppers are fully matched by our award-winning designers to make your events breathtaking.'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-card p-8 rounded-2xl flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-brand-pink/20 flex items-center justify-center text-brand-brown mb-2 animate-float">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-brown dark:text-zinc-100">
                  {feature.title}
                </h3>
                <p className="text-xs text-brand-brown-light dark:text-zinc-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Customer Testimonials */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-pink-dark font-sans">
            Client Words
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-brown dark:text-zinc-100">
            Loved By Sweet Lovers
          </h2>
          <div className="w-20 h-1 bg-brand-pink mx-auto rounded-full" />
          <p className="text-brand-brown-light dark:text-zinc-400 text-sm">
            Read stories of how we sweeten wedding, birthday, and anniversary celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card p-6.5 rounded-2xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating */}
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-brand-brown-light dark:text-zinc-300 italic leading-relaxed">
                  "{test.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-brand-brown/5 dark:border-zinc-800">
                <img
                  src={test.avatar}
                  alt={test.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-brand-pink"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-brand-brown dark:text-zinc-200">
                    {test.name}
                  </h4>
                  <p className="text-[10px] text-brand-brown-light dark:text-zinc-400">
                    {test.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Instagram / Facebook Feed Block */}
      <section id="social-feed" className="bg-brand-pink/5 dark:bg-zinc-900/20 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-pink-dark font-sans">
              Join Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-brown dark:text-zinc-100">
              Follow Us on Social Media
            </h2>
            <div className="w-20 h-1 bg-brand-pink mx-auto rounded-full" />
            <p className="text-brand-brown-light dark:text-zinc-400 text-sm">
              We regularly share dynamic baking reels, custom designs, and frosting closeups. See what is baking right now!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instagramPosts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 1.02 }}
                className="relative group h-64 md:h-72 rounded-2xl overflow-hidden shadow-xs cursor-pointer bg-zinc-150"
              >
                <img
                  src={post.image}
                  alt="Baking Instagram Post"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-brand-brown-dark/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-white p-4 space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm font-semibold">
                      <Heart className="w-4 h-4 text-brand-pink fill-brand-pink" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-semibold">
                      <MessageCircle className="w-4 h-4 text-white" />
                      {post.comments}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-300 tracking-wider">
                    {post.tags}
                  </span>
                  <a
                    href="https://instagram.com/thecakebake"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 px-3.5 py-1.5 bg-brand-pink hover:bg-white text-brand-brown-dark text-[10px] uppercase font-bold tracking-widest rounded-full transition-all"
                  >
                    View Post
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. High-Conversion Newsletter Signup Card */}
      <section id="home-newsletter" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-rose-gold-gradient p-8 md:p-12 rounded-3xl text-brand-brown-dark text-center relative overflow-hidden shadow-xl"
        >
          {/* Background overlay decorations */}
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 -mr-16 -mt-16 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 -ml-16 -mb-16 blur-2xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-5 relative z-10">
            <h2 className="text-3xl font-bold font-serif leading-tight text-brand-brown-dark">
              Get 10% Off Your First Customized Celebration Cake!
            </h2>
            <p className="text-sm font-medium leading-relaxed max-w-lg mx-auto text-brand-brown-dark/80">
              Sign up to receive sweet dessert ideas, custom-cake design guidelines, and VIP-only discount codes.
            </p>
            
            {/* Quick newsletter signup */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Success! Check your email for your 10% discount voucher.');
              }}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3 rounded-full text-sm border-0 focus:outline-hidden bg-white/90 text-brand-brown placeholder-brand-brown-light"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-brand-brown-dark hover:bg-brand-brown text-white text-sm font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                Join Club
              </button>
            </form>
            <p className="text-[10px] text-brand-brown-dark/65">
              We guarantee 100% privacy. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </section>

      {/* 6. Celebration Cake Image Editor Modal */}
      <AnimatePresence>
        {isEditingImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditingImage(false)}
              className="absolute inset-0 bg-brand-brown-dark/65 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-brand-pink/20 dark:border-zinc-800 z-10 space-y-6 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-brand-pink/10 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-brand-pink/20 dark:bg-zinc-800 rounded-xl text-brand-pink-dark dark:text-zinc-300">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-brown dark:text-zinc-100">
                      Edit Celebration Cake Image
                    </h3>
                    <p className="text-[11px] text-brand-brown-light dark:text-zinc-400">
                      Update the primary celebration cake image displayed on the home page.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditingImage(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-zinc-800 text-neutral-400 hover:text-neutral-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-brown dark:text-zinc-300">
                    Image URL or Path
                  </label>
                  <input
                    type="text"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    placeholder="Paste an Unsplash, external image URL, or asset path..."
                    className="w-full px-4 py-3 rounded-xl border border-brand-brown/10 dark:border-zinc-700 bg-transparent text-sm text-brand-brown dark:text-zinc-100 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-brand-pink/50 dark:focus:ring-zinc-700"
                  />
                </div>

                {/* Preset Suggestions */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-brown-light dark:text-zinc-400 block">
                    Or select a gorgeous preset cake:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      {
                        name: 'Elegant Red Velvet',
                        url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
                      },
                      {
                        name: 'Whimsical Rainbow',
                        url: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=600&q=80',
                      },
                      {
                        name: 'Rustic Caramel Drip',
                        url: 'https://images.unsplash.com/photo-1464349172961-10492ec86537?auto=format&fit=crop&w=600&q=80',
                      }
                    ].map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => setImageUrlInput(preset.url)}
                        className={`group relative h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          imageUrlInput === preset.url
                            ? 'border-brand-pink shadow-md scale-98'
                            : 'border-transparent hover:border-brand-pink/30'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 text-center">
                          <span className="text-[8px] font-bold text-white block truncate">
                            {preset.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview Card */}
                <div className="p-4 bg-brand-pink/5 dark:bg-zinc-800/40 rounded-2xl border border-brand-pink/10 dark:border-zinc-800 flex items-center gap-4">
                  <div className="w-16 h-20 rounded-lg overflow-hidden border border-brand-brown/10 dark:border-zinc-700 bg-neutral-100 shrink-0">
                    <img
                      src={imageUrlInput || HERO_CAKE}
                      alt="Live Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = HERO_CAKE;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-brand-brown dark:text-zinc-300 block">
                      Live Preview
                    </span>
                    <span className="text-[10px] text-brand-brown-light dark:text-zinc-400 break-all truncate block">
                      {imageUrlInput || 'Showing default cake image'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsEditingImage(false)}
                  className="px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 hover:bg-neutral-50 dark:hover:bg-zinc-800 text-brand-brown-light dark:text-zinc-300 font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    updateContent({
                      ...content,
                      heroImage: imageUrlInput,
                    });
                    setIsEditingImage(false);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-rose-gold-gradient text-white font-semibold text-xs uppercase tracking-wider hover:opacity-90 shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
