/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem } from '../types';
import { PencilRuler, Cake, Wine, Landmark, CupSoda, Table, Truck, Check, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useSiteContent } from '../lib/cmsStore';

export default function ServicesSection() {
  const { content } = useSiteContent();

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'custom-design':
        return <PencilRuler className="w-6 h-6 text-brand-pink-dark" />;
      case 'birthday':
        return <Cake className="w-6 h-6 text-brand-pink-dark" />;
      case 'wedding':
        return <Wine className="w-6 h-6 text-brand-pink-dark" />;
      case 'corporate':
        return <Landmark className="w-6 h-6 text-brand-pink-dark" />;
      case 'cupcakes':
        return <CupSoda className="w-6 h-6 text-brand-pink-dark" />;
      case 'dessert-tables':
        return <Table className="w-6 h-6 text-brand-pink-dark" />;
      case 'delivery':
        return <Truck className="w-6 h-6 text-brand-pink-dark" />;
      default:
        return <Cake className="w-6 h-6 text-brand-pink-dark" />;
    }
  };

  const defaultServices = [
    {
      id: 'custom-design',
      title: 'Bespoke Custom Cake Design',
      description: 'Consult with our head chef to translate color palettes, wedding themes, mood boards, or character blueprints into majestic edible sculptures.',
      features: ['Personalized consultation', 'Digital sketch mockups', 'Custom edible toppers']
    },
    {
      id: 'birthday',
      title: 'Vibrant Birthday Cakes',
      description: 'Make birthdays unforgettable with customizable toppers, double-choc fudge layers, or whimsical children themes (unicorns, heroes, castles).',
      features: ['Eggless options available', 'Age candles included', 'Personalized message plaques']
    },
    {
      id: 'wedding',
      title: 'Elite Wedding Masterpieces',
      description: 'Hand-sculpted sugar flowers, luxurious metallic leaf ribbons, and multiple cream layers engineered to withstand grand receptions with beauty.',
      features: ['Complimentary cake tastings', 'On-site venue assembly', 'Structural engineering check']
    },
    {
      id: 'corporate',
      title: 'Corporate Celebration Cakes',
      description: 'Sophisticated custom logos printed using high-resolution edible ink. Clean geometry, elegant colors, and prompt corporate receipt invoicing.',
      features: ['High-res edible logo printing', 'Bulk cupcake packs', 'Official invoice setup']
    },
    {
      id: 'cupcakes',
      title: 'Artisan Cupcake Packs',
      description: 'Gourmet cupcake sets with whipped pastel dual-swirl buttercream, customized wrappers, and chocolate fillings, ideal for corporate gift boxes.',
      features: ['Piping style selection', 'Gourmet berry inserts', 'Customized gift packaging']
    },
    {
      id: 'dessert-tables',
      title: 'Comprehensive Dessert Tables',
      description: 'We design full banquet displays featuring premium mini-donuts, custom cake pops, personalized sugar cookies, and French macarons.',
      features: ['Complete table layout styling', 'Tiered stands & props rental', 'Menu labeling cards']
    },
    {
      id: 'delivery',
      title: 'Temperature-Controlled Delivery',
      description: 'We do not use standard bicycle delivery. All cakes are transported in specialized shock-absorbent coolers inside AC vans to guarantee freshness.',
      features: ['AC van transportation', 'Delivery time lock guarantees', 'Unboxing assistance']
    }
  ];

  const services = (content.services || defaultServices).map(serv => ({
    ...serv,
    icon: getServiceIcon(serv.id)
  }));

  return (
    <div id="services-section" className="pb-16 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-pink-dark font-sans">
          Bespoke Services
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-brown dark:text-zinc-100">
          Our Special Baking Offerings
        </h1>
        <div className="w-20 h-1 bg-brand-pink mx-auto rounded-full" />
        <p className="text-brand-brown-light dark:text-zinc-400 text-sm">
          From intimate birthday gathers to grand five-star wedding receptions, we handle baking, design, styling, and safe delivery of delicious memories.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="glass-card p-7 rounded-2xl border border-brand-brown/5 text-left flex flex-col justify-between hover:shadow-lg transition-all group"
          >
            <div className="space-y-4">
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-brand-pink/25 flex items-center justify-center text-brand-brown group-hover:scale-105 transition-transform duration-300 shadow-xs">
                {service.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-brown dark:text-zinc-100 group-hover:text-brand-pink-dark transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-brand-brown-light dark:text-zinc-400 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Service Features checklist */}
            <div className="mt-6 pt-5 border-t border-brand-brown/5 dark:border-zinc-800 space-y-2">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-brand-brown-light dark:text-zinc-300 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Process Flow banner */}
      <section className="mt-16 bg-rose-gold-gradient/10 border border-brand-pink/25 rounded-3xl p-8 md:p-12 text-center space-y-8">
        <div className="max-w-xl mx-auto space-y-2">
          <h3 className="text-2xl font-bold text-brand-brown dark:text-zinc-100">
            How Simple It Works
          </h3>
          <p className="text-xs text-brand-brown-light dark:text-zinc-400">
            From your raw ideas to a freshly baked centerpiece in 4 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            { step: '01', title: 'Submit Details', desc: 'Fill out our online order form, detailing the event date, weight, and favorite flavor.' },
            { step: '02', title: 'Design Call', desc: 'We message you on WhatsApp to confirm design reference images, toppers, and exact price.' },
            { step: '03', title: 'Hygienic Bake', desc: 'Our head chefs bake your sponge fresh and ice it under rigorous sanitation protocols.' },
            { step: '04', title: 'Cool Delivery', desc: 'Your custom masterwork arrives fresh in AC vans, ready to take center stage.' }
          ].map((item, idx) => (
            <div key={idx} className="space-y-2 text-center relative z-10">
              <div className="text-3xl font-serif font-extrabold text-brand-pink-dark/30">
                {item.step}
              </div>
              <h4 className="font-serif text-sm font-bold text-brand-brown dark:text-zinc-200">
                {item.title}
              </h4>
              <p className="text-[11px] text-brand-brown-light dark:text-zinc-400 leading-relaxed px-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
