/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { OrderFormState } from '../types';
import { Upload, CheckCircle2, ShoppingBag, DollarSign, Calendar, MessageSquare, PhoneCall, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function OrderSection() {
  const [formData, setFormData] = useState<OrderFormState>({
    customerName: '',
    phoneNumber: '',
    email: '',
    deliveryAddress: '',
    eventDate: '',
    cakeWeight: '2-pound',
    flavor: 'Chocolate Fudge Decadence',
    theme: 'Elegant Floral & Gold Leaves',
    customInstructions: '',
    referenceImage: null,
  });

  const [dragActive, setDragActive] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState(65);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Recalculate price estimate dynamically based on form selections
  const calculatePriceEstimate = (weight: string, theme: string) => {
    let base = 35;
    if (weight === '2-pound') base = 65;
    else if (weight === '3-pound') base = 95;
    else if (weight === 'custom') base = 120;

    let themeAddon = 0;
    if (theme === 'Fully Customized Sculpting') themeAddon = 30;
    else if (theme === 'Corporate Edible Branding') themeAddon = 15;
    else if (theme === 'Elegant Floral & Gold Leaves') themeAddon = 10;

    return base + themeAddon;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'cakeWeight' || name === 'theme') {
        const est = calculatePriceEstimate(updated.cakeWeight, updated.theme);
        setEstimatedPrice(est);
      }
      return updated;
    });
  };

  // Drag and Drop File Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFormData(prev => ({
        ...prev,
        referenceImage: file,
        referenceImageUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        referenceImage: file,
        referenceImageUrl: URL.createObjectURL(file),
      }));
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate core fields
    if (!formData.customerName || !formData.phoneNumber || !formData.deliveryAddress || !formData.eventDate) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    // Generate simulated order receipt number
    const generatedId = `TCB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setIsSubmitted(true);
  };

  const triggerWhatsAppRedirect = () => {
    // Construct pre-filled conversion text
    const message = `*NEW CAKE ORDER: ${orderId}*%0A` +
      `*Name:* ${encodeURIComponent(formData.customerName)}%0A` +
      `*Phone:* ${encodeURIComponent(formData.phoneNumber)}%0A` +
      `*Event Date:* ${encodeURIComponent(formData.eventDate)}%0A` +
      `*Size:* ${encodeURIComponent(formData.cakeWeight)}%0A` +
      `*Flavor:* ${encodeURIComponent(formData.flavor)}%0A` +
      `*Theme:* ${encodeURIComponent(formData.theme)}%0A` +
      `*Estimated Price:* $${estimatedPrice}%0A` +
      `*Instructions:* ${encodeURIComponent(formData.customInstructions || 'None')}%0A%0A` +
      `_Please confirm delivery slot and payment details!_`;

    window.open(`https://wa.me/923053623409?text=${message}`, '_blank');
  };

  return (
    <div id="order-section" className="pb-16 pt-24 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-pink-dark font-sans">
          Bake My Dream
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-brown dark:text-zinc-100">
          Place Your Custom Order
        </h1>
        <div className="w-20 h-1 bg-brand-pink mx-auto rounded-full" />
        <p className="text-brand-brown-light dark:text-zinc-400 text-sm">
          Submit your celebration theme below. Once submitted, tap the WhatsApp redirection button to instantly coordinate the final design with our master chefs!
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="order-form-container"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="glass-card p-6 sm:p-10 rounded-3xl border border-brand-brown/5 shadow-xl text-left"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Form Grid Section 1: Customer Details */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-brand-brown dark:text-zinc-200 border-b border-brand-brown/5 pb-2">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-brown dark:text-zinc-300">
                      Customer Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      required
                      value={formData.customerName}
                      onChange={handleInputChange}
                      placeholder="e.g. Elena Parker"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-brown/15 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800 text-sm text-brand-brown dark:text-zinc-200 focus:outline-hidden focus:ring-1 focus:ring-brand-pink-dark focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-brown dark:text-zinc-300">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. +92 300 1234567"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-brown/15 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800 text-sm text-brand-brown dark:text-zinc-200 focus:outline-hidden focus:ring-1 focus:ring-brand-pink-dark focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-brown dark:text-zinc-300">
                      Email Address <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="elena@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-brown/15 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800 text-sm text-brand-brown dark:text-zinc-200 focus:outline-hidden focus:ring-1 focus:ring-brand-pink-dark focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-brown dark:text-zinc-300">
                      Celebration Event Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="eventDate"
                        required
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-brown/15 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800 text-sm text-brand-brown dark:text-zinc-200 focus:outline-hidden focus:ring-1 focus:ring-brand-pink-dark focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-brown dark:text-zinc-300">
                    Precise Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="deliveryAddress"
                    required
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    placeholder="Street, Apartment No, Zip Code, City"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-brown/15 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800 text-sm text-brand-brown dark:text-zinc-200 focus:outline-hidden focus:ring-1 focus:ring-brand-pink-dark focus:bg-white"
                  />
                </div>
              </div>

              {/* Form Grid Section 2: Cake Configuration */}
              <div className="space-y-4 pt-2">
                <h3 className="font-serif text-lg font-bold text-brand-brown dark:text-zinc-200 border-b border-brand-brown/5 pb-2">
                  2. Cake Parameters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-brown dark:text-zinc-300">
                      Cake Size / Weight <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="cakeWeight"
                      value={formData.cakeWeight}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-brown/15 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-brand-brown dark:text-zinc-200 focus:outline-hidden focus:ring-1 focus:ring-brand-pink-dark"
                    >
                      <option value="1-pound">1 Pound (Approx 0.5 kg)</option>
                      <option value="2-pound">2 Pounds (Approx 1.0 kg)</option>
                      <option value="3-pound">3 Pounds (Approx 1.5 kg)</option>
                      <option value="custom">Bespoke Size / Multi-Tier</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-brown dark:text-zinc-300">
                      Mouthwatering Flavor <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="flavor"
                      value={formData.flavor}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-brown/15 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-brand-brown dark:text-zinc-200 focus:outline-hidden focus:ring-1 focus:ring-brand-pink-dark"
                    >
                      <option value="Chocolate Fudge Decadence">Chocolate Fudge Decadence</option>
                      <option value="Red Velvet Silky Cheese">Red Velvet Silky Cheese</option>
                      <option value="Madagascar Vanilla Cream">Madagascar Vanilla Cream</option>
                      <option value="Salted Caramel Praline">Salted Caramel Praline</option>
                      <option value="Fresh Strawberry Buttercream">Fresh Strawberry Buttercream</option>
                      <option value="Hazelnut Fudge Mirror">Hazelnut Fudge Mirror</option>
                      <option value="Bespoke Mix (Described below)">Bespoke Mix (Described below)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-brown dark:text-zinc-300">
                      Design Theme <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="theme"
                      value={formData.theme}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-brown/15 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-brand-brown dark:text-zinc-200 focus:outline-hidden focus:ring-1 focus:ring-brand-pink-dark"
                    >
                      <option value="Elegant Floral & Gold Leaves">Elegant Floral & Gold Leaves</option>
                      <option value="Minimalist Semi-Naked & Berries">Minimalist Semi-Naked & Berries</option>
                      <option value="Kids Pastel Unicorn/Cartoon">Kids Pastel Unicorn/Cartoon</option>
                      <option value="Corporate Edible Branding">Corporate Edible Branding</option>
                      <option value="Fully Customized Sculpting">Fully Customized Sculpting</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-brown dark:text-zinc-300">
                    Baking Instructions or Custom Text <span className="text-gray-400">(Optional)</span>
                  </label>
                  <textarea
                    name="customInstructions"
                    rows={3}
                    value={formData.customInstructions}
                    onChange={handleInputChange}
                    placeholder="e.g. Please print 'Happy 30th Sophia' on a pink ribbon topper. Eggless sponge recipe is strictly required."
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-brown/15 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800 text-sm text-brand-brown dark:text-zinc-200 focus:outline-hidden focus:ring-1 focus:ring-brand-pink-dark focus:bg-white"
                  />
                </div>
              </div>

              {/* Form Grid Section 3: Usability Compliant File Upload */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-brand-brown dark:text-zinc-300 block">
                  Reference Design Image <span className="text-gray-400">(Optional)</span>
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={triggerFileSelect}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center space-y-2 ${
                    dragActive
                      ? 'border-brand-pink-dark bg-brand-pink/15 scale-[0.99]'
                      : 'border-brand-brown/15 dark:border-zinc-700 hover:border-brand-pink hover:bg-brand-pink/5'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {formData.referenceImageUrl ? (
                    <div className="space-y-3 w-full max-w-xs">
                      <img
                        src={formData.referenceImageUrl}
                        alt="Design Reference Preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-32 object-cover rounded-xl border border-brand-pink shadow-xs mx-auto"
                      />
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Reference loaded: {formData.referenceImage?.name}</span>
                      </p>
                      <span className="text-[9px] text-brand-brown-light underline">
                        Tap here to select a different image
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="p-3 rounded-full bg-brand-pink/20 text-brand-brown dark:text-brand-pink animate-float">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-medium text-brand-brown dark:text-zinc-300">
                        Drag and drop your reference sketch here, or <span className="text-brand-pink-dark underline">browse files</span>
                      </p>
                      <p className="text-[9px] text-brand-brown-light dark:text-zinc-400">
                        Supports JPEG, PNG, or PDF. Max file size: 5MB
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Dynamic Cost Estimator Column */}
              <div className="p-4 rounded-2xl bg-brand-cream dark:bg-zinc-900 border border-brand-brown/10 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-full bg-brand-pink/20 text-brand-brown dark:text-brand-pink">
                    <ShoppingBag className="w-4.5 h-4.5 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-brand-brown dark:text-zinc-200">
                      Interactive Estimated Total
                    </h4>
                    <p className="text-[10px] text-brand-brown-light dark:text-zinc-400">
                      Basic ingredients + chosen decoration difficult levels.
                    </p>
                  </div>
                </div>
                <div className="flex items-baseline text-rose-gold-gradient font-bold">
                  <span className="text-xl">$</span>
                  <span className="text-3xl font-serif">{estimatedPrice}</span>
                </div>
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                id="order-submit-btn"
                className="w-full py-4 rounded-2xl bg-rose-gold-gradient hover:bg-rose-gold-hover text-brand-brown-dark font-bold text-sm uppercase tracking-wider shadow-lg hover:scale-101 transition-all cursor-pointer border border-white/20"
              >
                Submit Custom Design Draft
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="order-success-receipt"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 sm:p-12 rounded-3xl border border-brand-pink/30 text-center max-w-2xl mx-auto space-y-6 shadow-2xl relative overflow-hidden"
          >
            {/* Success particles decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-pink/20 -mr-12 -mt-12 blur-xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-brand-pink/20 -ml-12 -mb-12 blur-xl pointer-events-none" />

            <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto text-3xl animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-brand-pink-dark uppercase tracking-widest block font-sans">
                Masterpiece Draft Saved Successfully
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-brand-brown dark:text-zinc-100">
                Draft Reference: {orderId}
              </h2>
              <p className="text-xs text-brand-brown-light dark:text-zinc-300 max-w-md mx-auto leading-relaxed">
                Thank you **{formData.customerName}**! Your cake draft was logged under our secure baking registry. To secure your delivery slot, tap the button below to instantly forward your specifications to our WhatsApp help desk.
              </p>
            </div>

            {/* Custom Draft Parameters */}
            <div className="p-5 rounded-2xl bg-brand-cream/40 dark:bg-zinc-900 border border-brand-brown/5 text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between border-b border-brand-brown/5 pb-1.5 dark:border-zinc-800">
                <span className="text-brand-brown-light dark:text-zinc-400">Flavor Profile:</span>
                <span className="font-semibold text-brand-brown dark:text-zinc-200">{formData.flavor}</span>
              </div>
              <div className="flex justify-between border-b border-brand-brown/5 pb-1.5 dark:border-zinc-800">
                <span className="text-brand-brown-light dark:text-zinc-400">Cake Weight:</span>
                <span className="font-semibold text-brand-brown dark:text-zinc-200 uppercase">{formData.cakeWeight}</span>
              </div>
              <div className="flex justify-between border-b border-brand-brown/5 pb-1.5 dark:border-zinc-800">
                <span className="text-brand-brown-light dark:text-zinc-400">Delivery Date:</span>
                <span className="font-semibold text-brand-brown dark:text-zinc-200">{formData.eventDate}</span>
              </div>
              <div className="flex justify-between border-b border-brand-brown/5 pb-1.5 dark:border-zinc-800">
                <span className="text-brand-brown-light dark:text-zinc-400">Delivery Spot:</span>
                <span className="font-semibold text-brand-brown dark:text-zinc-200 truncate max-w-[200px]">{formData.deliveryAddress}</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm text-brand-brown dark:text-zinc-100">
                <span>Estimated Price:</span>
                <span className="text-rose-gold-gradient">${estimatedPrice}</span>
              </div>
            </div>

            {/* High-conversion redirection actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <button
                id="whatsapp-redirection-btn"
                onClick={triggerWhatsAppRedirect}
                className="flex-1 py-4 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                Forward to WhatsApp
              </button>
              <button
                id="reset-order-form-btn"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    customerName: '',
                    phoneNumber: '',
                    email: '',
                    deliveryAddress: '',
                    eventDate: '',
                    cakeWeight: '2-pound',
                    flavor: 'Chocolate Fudge Decadence',
                    theme: 'Elegant Floral & Gold Leaves',
                    customInstructions: '',
                    referenceImage: null,
                  });
                }}
                className="py-4 px-6 rounded-xl bg-brand-pink/15 hover:bg-brand-pink/30 text-brand-brown dark:text-zinc-300 text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Bake Another Cake
              </button>
            </div>

            <div className="flex items-center justify-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/10 py-2 rounded-xl">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>We recommend sending within 24 hours to secure date availability!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
