/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActivePage } from '../types';
import { Phone, Mail, MapPin, Instagram, Facebook, Send, CheckCircle2 } from 'lucide-react';
import CakeLogo from './CakeLogo';
import { useSiteContent } from '../lib/cmsStore';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const { content } = useSiteContent();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    // Mock subscription
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  const handleLinkClick = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-brand-cream/50 dark:bg-zinc-900 border-t border-brand-brown/10 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CakeLogo size={36} />
              <span className="font-serif text-xl font-bold tracking-tight text-brand-brown dark:text-brand-pink">
                Thecakebake
              </span>
            </div>
            <p className="text-sm text-brand-brown-light dark:text-zinc-400 leading-relaxed">
              Crafting premium, mouthwatering homemade cakes with love, pure hygiene standards, and only the finest premium ingredients. Every cake tells a beautiful celebratory story.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={content.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-brand-brown/10 dark:border-zinc-700 flex items-center justify-center text-brand-brown dark:text-zinc-300 hover:bg-brand-pink hover:text-brand-brown-dark hover:border-brand-pink transition-all duration-350"
                aria-label="Instagram Page"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a
                href={content.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-brand-brown/10 dark:border-zinc-700 flex items-center justify-center text-brand-brown dark:text-zinc-300 hover:bg-brand-pink hover:text-brand-brown-dark hover:border-brand-pink transition-all duration-350"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a
                href={`https://wa.me/${content.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/10 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
                aria-label="WhatsApp Contact"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-brown dark:text-brand-pink mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Home Page', page: 'home' as ActivePage },
                { label: 'About Story', page: 'about' as ActivePage },
                { label: 'Cake Gallery', page: 'gallery' as ActivePage },
                { label: 'Our Services', page: 'services' as ActivePage },
                { label: 'Pricing Estimations', page: 'pricing' as ActivePage },
                { label: 'Order Online', page: 'order' as ActivePage },
                { label: 'Baking Journal', page: 'blog' as ActivePage },
                { label: 'Frequently Asked Questions', page: 'faq' as ActivePage },
                { label: 'Contact Us', page: 'contact' as ActivePage },
                { label: 'Admin Portal', page: 'admin' as ActivePage },
              ].map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => handleLinkClick(link.page)}
                    className="text-brand-brown-light dark:text-zinc-400 hover:text-brand-brown dark:hover:text-brand-pink transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Cake Categories */}
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-brown dark:text-brand-pink mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                'Birthday Cakes',
                'Wedding Cakes',
                'Customized Cakes',
                'Cupcakes',
                'Chocolate Cakes',
                'Kids Theme Cakes',
                'Floral Cakes',
              ].map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleLinkClick('gallery')}
                    className="text-brand-brown-light dark:text-zinc-400 hover:text-brand-brown dark:hover:text-brand-pink transition-colors cursor-pointer text-left"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-brand-brown dark:text-brand-pink">
              Contact & Updates
            </h3>
            <div className="space-y-2.5 text-sm text-brand-brown-light dark:text-zinc-400">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-pink-dark" />
                <span>thecakebake33@gmail.com</span>
              </div>
            </div>

            {/* Newsletter form */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-brand-brown dark:text-zinc-300 uppercase tracking-wider mb-2">
                Join Sweet Newsletter
              </h4>
              <form onSubmit={handleSubscribe} className="space-y-1.5">
                <div className="flex gap-1.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address..."
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-brand-brown/15 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-brand-brown dark:text-zinc-200 focus:outline-hidden focus:ring-1 focus:ring-brand-pink-dark"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-lg bg-rose-gold-gradient hover:bg-rose-gold-hover text-brand-brown-dark font-medium transition-all duration-350 flex items-center justify-center cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                {error && <p className="text-[11px] text-red-500 font-medium">{error}</p>}
                {subscribed && (
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Successfully subscribed for sweet discounts!</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-brand-brown/10 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-brown-light dark:text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} Thecakebake. All rights reserved. Made with love and high hygienic standards.
          </div>
          <div className="flex gap-4">
            <button onClick={() => alert('Privacy Policy: We protect your baking instructions and contact details under secure encryption.')} className="hover:text-brand-brown dark:hover:text-brand-pink cursor-pointer">
              Privacy Policy
            </button>
            <span>&bull;</span>
            <button onClick={() => alert('Terms & Conditions: Please book customized orders at least 3 days in advance to ensure masterpiece creation.')} className="hover:text-brand-brown dark:hover:text-brand-pink cursor-pointer">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
