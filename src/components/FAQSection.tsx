/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FAQItem } from '../types';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'How do I place an order on Thecakebake?',
      answer: 'Placing an order is extremely easy! Go to our "Order Online" page, fill in your details, preferred size, flavor, decoration theme, and optionally upload a reference sketch. Submit the form, and then tap the "Forward to WhatsApp" button to instantly send your draft reference number directly to our chefs. We will immediately confirm date availability and payment links!'
    },
    {
      id: 'faq-2',
      question: 'What is the minimum advance booking timeline?',
      answer: 'For standard 1-pound or 2-pound celebration cakes, we recommend booking at least 3 days in advance. For elaborate 3-tier customized wedding cakes or kids theme sculpting, we require at least 5 to 7 days of advance notice to design toppers, source matching botanical decorations, and run structural testing.'
    },
    {
      id: 'faq-3',
      question: 'What are your delivery coverage areas and fees?',
      answer: 'We deliver throughout Pastry Hills, Beverly Glen, Sweetwater, and surrounding cities within a 25-mile radius. Because our cakes are transported in AC vans with temperature-controlled cooling boxes, there is a flat delivery fee of $10 for addresses within 10 miles, and $1.50 per additional mile. Pickup at our Bakery Studio is completely free.'
    },
    {
      id: 'faq-4',
      question: 'What payment methods do you accept?',
      answer: 'We accept major Credit & Debit cards (Visa, MasterCard, American Express), Apple Pay, Google Pay, and direct secure bank transfers. To secure custom celebration orders, we require a 50% advance deposit at the time of design confirmation, with the remaining 50% payable upon delivery.'
    },
    {
      id: 'faq-5',
      question: 'Can you bake eggless, gluten-free, or sugar-free cakes?',
      answer: 'Absolutely! We pride ourselves on dietary inclusivity. We can formulate 100% eggless recipes, organic sugar substitutes (Stevia/Monkfruit), and gluten-free sponges. Please mention your requirements in the "Baking Instructions" section of the order form so our head baker can coordinate safe raw material lines.'
    },
    {
      id: 'faq-6',
      question: 'What is your refund and cancellation policy?',
      answer: 'Since custom orders require baking custom sponges and purchasing tailored fresh items (e.g. berries, organic flowers), cancellations made up to 48 hours before the delivery date qualify for a 100% refund (or studio credit). Cancellations within 48 hours will retain the 50% deposit to cover preparation costs.'
    }
  ];

  const toggleFaq = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div id="faq-section" className="pb-16 pt-24 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-pink-dark font-sans">
          Curious Mind
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-brown dark:text-zinc-100">
          Frequently Asked Questions
        </h1>
        <div className="w-20 h-1 bg-brand-pink mx-auto rounded-full" />
        <p className="text-brand-brown-light dark:text-zinc-400 text-sm">
          Everything you need to understand about customized baking preparation speeds, secure checkout methods, and delivery preservation safety.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4 text-left">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              id={faq.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-brand-cream/40 dark:bg-zinc-900 border-brand-pink-dark/40 shadow-xs'
                  : 'bg-white/70 dark:bg-zinc-800/70 border-brand-brown/5 dark:border-zinc-700 hover:border-brand-pink/40'
              }`}
            >
              {/* Trigger Button */}
              <button
                id={`trigger-${faq.id}`}
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-3.5 pr-4">
                  <HelpCircle className="w-5 h-5 text-brand-pink-dark shrink-0 mt-0.5" />
                  <span className="font-serif text-sm sm:text-base font-bold text-brand-brown dark:text-zinc-100 leading-snug">
                    {faq.question}
                  </span>
                </div>
                <div className="text-brand-brown-light dark:text-zinc-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Answer Box */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-brand-brown-light dark:text-zinc-300 leading-relaxed pl-12">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
