/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ContactFormState } from '../types';
import { Phone, Mail, MapPin, CheckCircle2, Instagram, Facebook, Send, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill out all required fields.');
      return;
    }
    setError('');
    setIsSent(true);
    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    setTimeout(() => {
      setIsSent(false);
    }, 6000);
  };

  return (
    <div id="contact-section" className="pb-16 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-pink-dark font-sans">
          Get In Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-brown dark:text-zinc-100">
          Contact Thecakebake Studio
        </h1>
        <div className="w-20 h-1 bg-brand-pink mx-auto rounded-full" />
        <p className="text-brand-brown-light dark:text-zinc-400 text-sm">
          Have an urgent question about a celebration date, allergen guidelines, or delivery coordinates? Send us a letter or tap our direct chat lines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Column 1: Contact Details & Info Cards */}
        <div className="space-y-8 text-left">
          
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
              <div className="p-3 rounded-xl bg-brand-pink/20 text-brand-brown dark:text-brand-pink">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-brand-brown dark:text-zinc-100 mb-1">
                  Call or Text Us
                </h4>
                <p className="text-xs text-brand-brown-light dark:text-zinc-400">
                  +92 305 3623409
                </p>
                <p className="text-[10px] text-brand-pink-dark font-medium mt-1">
                  Mon-Sat: 9am - 8pm
                </p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
              <div className="p-3 rounded-xl bg-brand-pink/20 text-brand-brown dark:text-brand-pink">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-brand-brown dark:text-zinc-100 mb-1">
                  Email Support
                </h4>
                <p className="text-xs text-brand-brown-light dark:text-zinc-400">
                  thecakebake33@gmail.com
                </p>
                <p className="text-[10px] text-brand-pink-dark font-medium mt-1">
                  Replies within 4 hours
                </p>
              </div>
            </div>
          </div>

          {/* Social Media triggers */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-brand-brown dark:text-zinc-200">
              Connect on Social Media
            </h4>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://instagram.com/thecakebake"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
              <a
                href="https://facebook.com/thecakebake"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
              <a
                href="https://wa.me/923053623409"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Column 2: Send a Message Form */}
        <div className="glass-card p-6.5 sm:p-10 rounded-3xl border border-brand-brown/5 text-left shadow-xl">
          <h3 className="font-serif text-lg font-bold text-brand-brown dark:text-zinc-100 mb-6 border-b border-brand-brown/5 pb-2">
            Send Us a Letter
          </h3>
          
          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-brown dark:text-zinc-300">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Elena Parker"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-brown/15 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800 text-sm text-brand-brown dark:text-zinc-200 focus:outline-hidden focus:ring-1 focus:ring-brand-pink-dark focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-brown dark:text-zinc-300">
                Your Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="elena@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-brown/15 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800 text-sm text-brand-brown dark:text-zinc-200 focus:outline-hidden focus:ring-1 focus:ring-brand-pink-dark focus:bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-brown dark:text-zinc-300">
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-brown/15 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-brand-brown dark:text-zinc-200 focus:outline-hidden focus:ring-1 focus:ring-brand-pink-dark"
              >
                <option value="General Inquiry">General Inquiry / Question</option>
                <option value="Event Collaboration">Event Collaboration / Bulk</option>
                <option value="Dietary Constraint Question">Dietary / Allergen Question</option>
                <option value="Order Tracking Help">Order Tracking / Edit Draft</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-brand-brown dark:text-zinc-300">
                Detailed Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="What details would you like to inquire about?"
                className="w-full px-4 py-2.5 rounded-xl border border-brand-brown/15 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800 text-sm text-brand-brown dark:text-zinc-200 focus:outline-hidden focus:ring-1 focus:ring-brand-pink-dark focus:bg-white"
              />
            </div>

            {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}

            <AnimatePresence>
              {isSent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Your message has been sent successfully! Our baking support desk will contact you shortly.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              id="contact-submit"
              className="w-full py-3.5 rounded-xl bg-rose-gold-gradient hover:bg-rose-gold-hover text-brand-brown-dark font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/25"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
