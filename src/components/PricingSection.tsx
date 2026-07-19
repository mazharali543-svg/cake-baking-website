/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PricingPlan, ActivePage } from '../types';
import { Check, Info, Sparkles, Scale, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingSectionProps {
  setActivePage: (page: ActivePage) => void;
}

export default function PricingSection({ setActivePage }: PricingSectionProps) {
  const plans: PricingPlan[] = [
    {
      id: '1-pound',
      name: 'Artisan 1-Pound Cake',
      weight: 'Approx. 0.5 kg (Serves 4 - 6)',
      price: '$35',
      description: 'Ideal for intimate birthday celebrations, romantic anniversaries, or small family dessert treats.',
      features: [
        'Single tier design',
        'Standard flavor list (Chocolate, Vanilla)',
        'Custom piped greeting text',
        'Eco-friendly candle set included',
        'Sanitized cardboard gift box',
      ],
    },
    {
      id: '2-pound',
      name: 'Celebration 2-Pound Cake',
      weight: 'Approx. 1.0 kg (Serves 10 - 12)',
      price: '$65',
      description: 'Our most popular size. Perfect for standard family birthday parties, bridal showers, or friendly gatherings.',
      features: [
        'Up to 2 layers height',
        'Premium flavor selection (Red Velvet, Caramel)',
        'Custom sprinkles & elegant drips',
        'Double-layered hygiene boxed packaging',
        'Complimentary gold card topper',
      ],
    },
    {
      id: '3-pound',
      name: 'Grand 3-Pound Cake',
      weight: 'Approx. 1.5 kg (Serves 18 - 22)',
      price: '$95',
      description: 'Designed for grand celebrations, milestone anniversaries, large children theme parties, or housewarmings.',
      features: [
        'Up to 3 layers or 2-tier assembly',
        'All flavors including fresh berry fillings',
        'Rich buttercream textured styling',
        'Premium thick wooden cake board',
        '24-hour delivery window guarantee',
      ],
    },
    {
      id: 'custom-art',
      name: 'Custom Theme Artistry',
      weight: 'Bespoke Size / Multi-Tier',
      price: 'Quote',
      description: 'Fully customized, structural masterpieces designed to match wedding dresses, corporate branding, or complex fantasy themes.',
      features: [
        'Multi-tiered structural engineering',
        'Hand-sculpted fondant toppers',
        'High-resolution edible logo prints',
        'Complimentary pre-wedding cake tasting',
        'On-site delivery & catering assembly',
      ],
      isCustomized: true,
    },
    {
      id: 'cupcakes-pack',
      name: 'Gourmet Cupcakes Pack',
      weight: 'Box of 12 Cupcakes',
      price: '$30',
      description: 'Delightful individually decorated mini-treats, perfect for school treat boxes, tea parties, or corporate gifts.',
      features: [
        'Up to 3 custom color combinations',
        'Dual-shaded pastel frosting swirls',
        'Organic gold pearls & sprinkle toppers',
        'Separate cupcake compartment box',
        'Custom flavor assortment mix',
      ],
    },
  ];

  const handleOrderClick = () => {
    setActivePage('order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="pricing-section" className="pb-16 pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-pink-dark font-sans">
          Simple Pricing
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-brown dark:text-zinc-100">
          Sample Pricing Packages
        </h1>
        <div className="w-20 h-1 bg-brand-pink mx-auto rounded-full" />
        
        {/* Dynamic Warning Notification */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold mt-2">
          <Info className="w-4 h-4" />
          <span>Note: Prices may vary depending on your custom design and decoration requirements.</span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className={`glass-card rounded-3xl p-7 flex flex-col justify-between hover:shadow-xl transition-all border relative overflow-hidden ${
              plan.id === '2-pound'
                ? 'border-brand-pink ring-2 ring-brand-pink-dark/30 scale-103 md:scale-105 z-10'
                : 'border-brand-brown/5'
            }`}
          >
            {/* Ribbon Decoration for popular or custom items */}
            {plan.id === '2-pound' && (
              <div className="absolute top-0 right-0 bg-brand-pink-dark text-brand-brown-dark text-[10px] font-bold uppercase tracking-widest py-1 px-4 rounded-bl-xl shadow-xs">
                Popular Choice
              </div>
            )}
            {plan.isCustomized && (
              <div className="absolute top-0 right-0 bg-amber-400 text-brand-brown-dark text-[10px] font-bold uppercase tracking-widest py-1 px-4 rounded-bl-xl shadow-xs">
                Pure Artistry
              </div>
            )}

            <div className="space-y-6">
              {/* Plan Header */}
              <div className="text-left space-y-2">
                <h3 className="font-serif text-lg font-bold text-brand-brown dark:text-zinc-100">
                  {plan.name}
                </h3>
                <div className="flex items-center gap-1 text-[11px] text-brand-brown-light dark:text-zinc-400 font-medium">
                  <Scale className="w-3.5 h-3.5" />
                  <span>{plan.weight}</span>
                </div>
                <p className="text-xs text-brand-brown-light dark:text-zinc-400 leading-relaxed min-h-[50px]">
                  {plan.description}
                </p>
              </div>

              {/* Price Tag */}
              <div className="text-left py-4 border-t border-b border-brand-brown/5 dark:border-zinc-800">
                <span className="text-4xl font-extrabold text-brand-brown dark:text-zinc-100">
                  {plan.price}
                </span>
                {plan.price !== 'Quote' && (
                  <span className="text-sm font-semibold text-brand-brown-light dark:text-zinc-400 ml-1">
                    starting price
                  </span>
                )}
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3 text-left">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-brand-brown dark:text-zinc-300 font-medium leading-relaxed">
                    <Check className="w-4 h-4 text-brand-pink-dark shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order CTA */}
            <div className="mt-8">
              <button
                id={`price-btn-${plan.id}`}
                onClick={handleOrderClick}
                className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5 ${
                  plan.id === '2-pound'
                    ? 'bg-rose-gold-gradient hover:bg-rose-gold-hover text-brand-brown-dark border border-white/25 shadow-md hover:scale-102'
                    : 'bg-brand-pink/15 hover:bg-brand-pink/30 text-brand-brown dark:text-zinc-300'
                }`}
              >
                {plan.isCustomized ? 'Request Custom Quote' : 'Order This Size'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Helper Customization details */}
      <section className="mt-16 bg-brand-cream/40 dark:bg-zinc-900/40 rounded-3xl p-8 border border-brand-brown/5 text-left max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-1 text-xs font-bold text-brand-pink-dark uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Do You Have Special Dietary Needs?</span>
          </div>
          <h3 className="font-serif text-lg font-bold text-brand-brown dark:text-zinc-200">
            Eggless, Gluten-Free, and Sugar-Reduced Options
          </h3>
          <p className="text-xs text-brand-brown-light dark:text-zinc-400 leading-relaxed">
            We understand dietary constraints! We offer premium eggless recipes, organic sugar substitutes, and certified gluten-free flour sponges on demand. Tell us your preference in the custom instructions block.
          </p>
        </div>
        <button
          id="pricing-dietary-cta"
          onClick={handleOrderClick}
          className="px-6 py-3.5 bg-brand-brown-dark hover:bg-brand-brown text-white text-xs uppercase font-bold tracking-widest rounded-xl transition-all cursor-pointer whitespace-nowrap"
        >
          Customize My Ingredients
        </button>
      </section>
    </div>
  );
}
