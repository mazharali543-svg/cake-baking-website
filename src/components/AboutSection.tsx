/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldAlert, Users, Award, ShieldCheck, Heart, Sparkles, CookingPot } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutSection() {
  const values = [
    {
      icon: <Heart className="w-6 h-6 text-brand-pink-dark" />,
      title: 'Baked with Deep Love',
      desc: 'Baking is not a mechanical assembly line for us. We pour absolute devotion, artistry, and passion into whipping, layering, and painting every custom masterwork.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: 'Sterile Hygiene Protocol',
      desc: 'Our baking workstations undergo rigorous daily chemical sanitization. Hand-washing is hourly, hairnets and sterile masks are mandatory, ensuring absolute pure safety.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      title: 'Premium Raw Ingredients',
      desc: 'We strictly reject compound chocolate or hydrogenated fats. We source genuine Belgian chocolate blocks, organic madagascar vanilla pods, and fresh farm-direct dairy.'
    }
  ];

  const team = [
    {
      name: 'Elena Rostova',
      role: 'Founder & Head Artisan Baker',
      bio: 'Elena trained in pastry arts in Paris before returning home to share authentic, scratch-baked celebration cakes. She oversees every custom design.',
      avatar: 'https://images.unsplash.com/photo-1556217256-d841f3297049?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Marcus Chen',
      role: 'Master Pastry Chef & Chocolatier',
      bio: 'Marcus specializes in gourmet Belgian chocolate fillings, hand-sculpted sugar flowers, and complex multi-layered architectural structural supports.',
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=150&q=80',
    }
  ];

  return (
    <div id="about-section" className="space-y-20 pb-16 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Page Title */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-pink-dark font-sans">
          The Bakery Behind the Magic
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-brown dark:text-zinc-100">
          Our Baking Journey & Philosophy
        </h1>
        <div className="w-20 h-1 bg-brand-pink mx-auto rounded-full" />
        <p className="text-brand-brown-light dark:text-zinc-400 text-sm">
          Discover how a small home-oven hobby bloomed into Pastry Hills' most celebrated custom cake studio.
        </p>
      </div>

      {/* 2. Story Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-left"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-pink/20 text-brand-brown text-xs font-semibold rounded-full dark:text-brand-pink">
            <CookingPot className="w-3.5 h-3.5" />
            Baking from Scratch Since 2024
          </div>
          <h2 className="text-3xl font-bold font-serif text-brand-brown dark:text-zinc-100">
            How Thecakebake Was Kneaded Into Life
          </h2>
          <p className="text-sm text-brand-brown-light dark:text-zinc-300 leading-relaxed">
            Our story started in a modest family kitchen with a single hand-mixer and a mother's dream of baking cakes that were both visually spectacular and tasted profoundly moist. Elena Rostova grew frustrated by commercial bakeries that sacrificed rich homemade textures for mass-produced stability.
          </p>
          <p className="text-sm text-brand-brown-light dark:text-zinc-300 leading-relaxed">
            She began baking for friends, family, and local baby showers. Word of her exquisite buttercream styling, fluffy crumb texture, and strict sanitation standards spread rapidly. In 2024, Elena co-founded **Thecakebake**, converting her workspace into a professional-grade custom bakery laboratory.
          </p>
          <blockquote className="border-l-4 border-brand-pink pl-4 italic text-xs text-brand-brown dark:text-zinc-300 bg-brand-pink/5 py-3 rounded-r-lg">
            "To us, a cake is not just dessert. It is the glowing centerpiece of some of life's most precious memories. We bake that honor into every layer."
          </blockquote>
        </motion.div>

        {/* Visual Showcase */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-[450px] rounded-2xl overflow-hidden shadow-xl"
        >
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
            alt="Thecakebake workspace kitchen"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 p-6 glass-card rounded-xl">
            <h4 className="font-serif text-sm font-bold text-brand-brown dark:text-zinc-100 mb-1">
              Our Professional Bakery Studio
            </h4>
            <p className="text-[11px] text-brand-brown-light dark:text-zinc-300 leading-relaxed">
              Equipped with convection ovens, precise humidity controllers, and hospital-grade sterilization filters to maintain pristine sanitation codes.
            </p>
          </div>
        </motion.div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="text-2xl font-bold text-brand-brown dark:text-zinc-100">
            Our Core Baking Quality Pillars
          </h3>
          <p className="text-xs text-brand-brown-light dark:text-zinc-400">
            Every creation is guaranteed to meet the ultimate criteria of food artistry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-6.5 rounded-2xl border border-brand-brown/5 text-left space-y-3 hover:-translate-y-1 transition-transform"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-pink/20 flex items-center justify-center">
                {val.icon}
              </div>
              <h4 className="font-serif text-base font-bold text-brand-brown dark:text-zinc-100">
                {val.title}
              </h4>
              <p className="text-xs text-brand-brown-light dark:text-zinc-400 leading-relaxed">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Professional Artisans */}
      <section className="space-y-8 bg-brand-cream/10 dark:bg-zinc-900/10 p-8 rounded-3xl border border-brand-brown/5">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="text-2xl font-bold text-brand-brown dark:text-zinc-100">
            Meet the Artisans
          </h3>
          <p className="text-xs text-brand-brown-light dark:text-zinc-400">
            The skilled culinary hands whipping and piping your dream wedding & birthday designs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="glass-card p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left"
            >
              <img
                src={member.avatar}
                alt={member.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-full object-cover border-2 border-brand-pink shadow-md"
              />
              <div className="space-y-2">
                <h4 className="font-serif text-base font-bold text-brand-brown dark:text-zinc-100">
                  {member.name}
                </h4>
                <div className="text-[11px] font-semibold text-brand-pink-dark uppercase tracking-wider font-sans">
                  {member.role}
                </div>
                <p className="text-xs text-brand-brown-light dark:text-zinc-400 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
