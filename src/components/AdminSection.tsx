/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSiteContent, useContactSubmissions } from '../lib/cmsStore';
import { SiteContent, CakeCategory, Testimonial, GalleryItem, PricingPlan } from '../types';
import {
  Lock, Settings, Save, Plus, Trash, Edit, RotateCcw, FileText,
  LayoutDashboard, Image, Tag, HelpCircle, Briefcase, DollarSign,
  Users, CheckCircle2, AlertCircle, Eye, EyeOff, Info, ArrowLeft,
  X, Check, HeartHandshake, PhoneCall
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminSection() {
  const { content, updateContent, resetToDefault } = useSiteContent();
  const { submissions, updateSubmissionStatus, deleteSubmission, clearAllSubmissions } = useContactSubmissions();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<'general' | 'hero' | 'about' | 'gallery' | 'services' | 'pricing' | 'faqs' | 'inquiries'>('general');

  // Success Notification state
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  // Local Form States
  const [brandName, setBrandName] = useState(content.brandName);
  const [phone, setPhone] = useState(content.phone);
  const [whatsapp, setWhatsapp] = useState(content.whatsapp);
  const [email, setEmail] = useState(content.email);
  const [address, setAddress] = useState(content.address);
  const [hours, setHours] = useState(content.hours);
  const [instagramUrl, setInstagramUrl] = useState(content.instagramUrl);
  const [facebookUrl, setFacebookUrl] = useState(content.facebookUrl);

  // Hero States
  const [heroTitle, setHeroTitle] = useState(content.heroTitle);
  const [heroHighlight, setHeroHighlight] = useState(content.heroHighlight);
  const [heroSubtitle, setHeroSubtitle] = useState(content.heroSubtitle);
  const [heroCtaText, setHeroCtaText] = useState(content.heroCtaText);

  // Story States
  const [aboutTitle, setAboutTitle] = useState(content.aboutTitle);
  const [aboutSubtitle, setAboutSubtitle] = useState(content.aboutSubtitle);
  const [aboutStoryHeading, setAboutStoryHeading] = useState(content.aboutStoryHeading);
  const [aboutStoryParagraph1, setAboutStoryParagraph1] = useState(content.aboutStoryParagraph1);
  const [aboutStoryParagraph2, setAboutStoryParagraph2] = useState(content.aboutStoryParagraph2);
  const [aboutQuote, setAboutQuote] = useState(content.aboutQuote);

  // CRUD modal states
  const [editingItem, setEditingItem] = useState<{ type: string; index: number } | null>(null);

  // Testimonials Modals & Fields
  const [testimonials, setTestimonials] = useState<Testimonial[]>(content.testimonials);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [testId, setTestId] = useState('');
  const [testName, setTestName] = useState('');
  const [testRole, setTestRole] = useState('');
  const [testComment, setTestComment] = useState('');
  const [testRating, setTestRating] = useState(5);
  const [testAvatar, setTestAvatar] = useState('');

  // Gallery Modals & Fields
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(content.galleryItems);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galId, setGalId] = useState('');
  const [galTitle, setGalTitle] = useState('');
  const [galCategory, setGalCategory] = useState('Birthday Cakes');
  const [galImage, setGalImage] = useState('');
  const [galDesc, setGalDesc] = useState('');

  // Services State
  const [services, setServices] = useState(content.services);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [servId, setServId] = useState('');
  const [servTitle, setServTitle] = useState('');
  const [servDesc, setServDesc] = useState('');
  const [servFeatures, setServFeatures] = useState<string[]>([]);
  const [newFeatureInput, setNewFeatureInput] = useState('');

  // Pricing State
  const [pricingTiers, setPricingTiers] = useState<PricingPlan[]>(content.pricingTiers);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [priceId, setPriceId] = useState('');
  const [priceName, setPriceName] = useState('');
  const [priceWeight, setPriceWeight] = useState('');
  const [priceVal, setPriceVal] = useState('');
  const [priceDesc, setPriceDesc] = useState('');
  const [priceFeatures, setPriceFeatures] = useState<string[]>([]);
  const [newPriceFeatureInput, setNewPriceFeatureInput] = useState('');

  // Sizing State
  const [sizingGuidelines, setSizingGuidelines] = useState(content.sizingGuidelines);

  // Flavors List State
  const [flavors, setFlavors] = useState<string[]>(content.flavors);
  const [newFlavorInput, setNewFlavorInput] = useState('');

  // FAQs State
  const [faqs, setFaqs] = useState(content.faqs);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [faqId, setFaqId] = useState('');
  const [faqQuest, setFaqQuest] = useState('');
  const [faqAns, setFaqAns] = useState('');

  // Handle Authentication
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Access Denied: Incorrect administrator passphrase.');
    }
  };

  const triggerNotification = (msg: string) => {
    setNotificationMsg(msg);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  // Central Save
  const handleSaveChanges = () => {
    const updatedContent: SiteContent = {
      ...content,
      brandName,
      phone,
      whatsapp,
      email,
      address,
      hours,
      instagramUrl,
      facebookUrl,
      heroTitle,
      heroHighlight,
      heroSubtitle,
      heroCtaText,
      aboutTitle,
      aboutSubtitle,
      aboutStoryHeading,
      aboutStoryParagraph1,
      aboutStoryParagraph2,
      aboutQuote,
      testimonials,
      galleryItems,
      services,
      pricingTiers,
      sizingGuidelines,
      flavors,
      faqs,
    };
    updateContent(updatedContent);
    triggerNotification('Website content successfully saved and published!');
  };

  const handleResetDefaults = () => {
    if (confirm('Are you absolute sure you want to revert all changes to the original default bakery content? This cannot be undone.')) {
      resetToDefault();
      const reset = useSiteContent().content; // Load latest
      // Reset local states
      setBrandName(reset.brandName);
      setPhone(reset.phone);
      setWhatsapp(reset.whatsapp);
      setEmail(reset.email);
      setAddress(reset.address);
      setHours(reset.hours);
      setInstagramUrl(reset.instagramUrl);
      setFacebookUrl(reset.facebookUrl);
      setHeroTitle(reset.heroTitle);
      setHeroHighlight(reset.heroHighlight);
      setHeroSubtitle(reset.heroSubtitle);
      setHeroCtaText(reset.heroCtaText);
      setAboutTitle(reset.aboutTitle);
      setAboutSubtitle(reset.aboutSubtitle);
      setAboutStoryHeading(reset.aboutStoryHeading);
      setAboutStoryParagraph1(reset.aboutStoryParagraph1);
      setAboutStoryParagraph2(reset.aboutStoryParagraph2);
      setAboutQuote(reset.aboutQuote);
      setTestimonials(reset.testimonials);
      setGalleryItems(reset.galleryItems);
      setServices(reset.services);
      setPricingTiers(reset.pricingTiers);
      setSizingGuidelines(reset.sizingGuidelines);
      setFlavors(reset.flavors);
      setFaqs(reset.faqs);
      triggerNotification('Website successfully reverted to system defaults!');
    }
  };

  // CRUD Handlers for Testimonials
  const openTestimonialAdd = () => {
    setEditingItem(null);
    setTestId(`test-${Date.now()}`);
    setTestName('');
    setTestRole('');
    setTestComment('');
    setTestRating(5);
    setTestAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80');
    setShowTestimonialModal(true);
  };

  const openTestimonialEdit = (idx: number) => {
    setEditingItem({ type: 'testimonial', index: idx });
    const t = testimonials[idx];
    setTestId(t.id);
    setTestName(t.name);
    setTestRole(t.role);
    setTestComment(t.comment);
    setTestRating(t.rating);
    setTestAvatar(t.avatar);
    setShowTestimonialModal(true);
  };

  const handleTestimonialSave = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Testimonial = {
      id: testId,
      name: testName,
      role: testRole,
      comment: testComment,
      rating: testRating,
      avatar: testAvatar,
    };
    if (editingItem && editingItem.type === 'testimonial') {
      const updated = [...testimonials];
      updated[editingItem.index] = payload;
      setTestimonials(updated);
    } else {
      setTestimonials([...testimonials, payload]);
    }
    setShowTestimonialModal(false);
    triggerNotification('Testimonial staged successfully. Save changes to publish!');
  };

  const deleteTestimonial = (idx: number) => {
    if (confirm('Delete this customer testimonial?')) {
      const updated = testimonials.filter((_, i) => i !== idx);
      setTestimonials(updated);
      triggerNotification('Testimonial staged for deletion.');
    }
  };

  // CRUD Handlers for Gallery Items
  const openGalleryAdd = () => {
    setEditingItem(null);
    setGalId(`gal-${Date.now()}`);
    setGalTitle('');
    setGalCategory('Birthday Cakes');
    setGalImage('https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80');
    setGalDesc('');
    setShowGalleryModal(true);
  };

  const openGalleryEdit = (idx: number) => {
    setEditingItem({ type: 'gallery', index: idx });
    const g = galleryItems[idx];
    setGalId(g.id);
    setGalTitle(g.title);
    setGalCategory(g.category);
    setGalImage(g.image);
    setGalDesc(g.description);
    setShowGalleryModal(true);
  };

  const handleGallerySave = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: GalleryItem = {
      id: galId,
      title: galTitle,
      category: galCategory,
      image: galImage,
      description: galDesc,
    };
    if (editingItem && editingItem.type === 'gallery') {
      const updated = [...galleryItems];
      updated[editingItem.index] = payload;
      setGalleryItems(updated);
    } else {
      setGalleryItems([...galleryItems, payload]);
    }
    setShowGalleryModal(false);
    triggerNotification('Gallery photo staged successfully. Save changes to publish!');
  };

  const deleteGallery = (idx: number) => {
    if (confirm('Delete this cake design from the gallery?')) {
      const updated = galleryItems.filter((_, i) => i !== idx);
      setGalleryItems(updated);
      triggerNotification('Gallery item staged for deletion.');
    }
  };

  // CRUD Handlers for Services
  const openServiceEdit = (idx: number) => {
    setEditingItem({ type: 'service', index: idx });
    const s = services[idx];
    setServId(s.id);
    setServTitle(s.title);
    setServDesc(s.description);
    setServFeatures(s.features || []);
    setShowServiceModal(true);
  };

  const handleServiceSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem && editingItem.type === 'service') {
      const updated = [...services];
      updated[editingItem.index] = {
        id: servId,
        title: servTitle,
        description: servDesc,
        features: servFeatures,
      };
      setServices(updated);
      setShowServiceModal(false);
      triggerNotification('Service details staged. Save changes to publish!');
    }
  };

  const handleAddServiceFeature = () => {
    if (newFeatureInput.trim()) {
      setServFeatures([...servFeatures, newFeatureInput.trim()]);
      setNewFeatureInput('');
    }
  };

  const handleRemoveServiceFeature = (fIdx: number) => {
    setServFeatures(servFeatures.filter((_, i) => i !== fIdx));
  };

  // CRUD Handlers for Pricing Plans
  const openPricingEdit = (idx: number) => {
    setEditingItem({ type: 'pricing', index: idx });
    const p = pricingTiers[idx];
    setPriceId(p.id);
    setPriceName(p.name);
    setPriceWeight(p.weight);
    setPriceVal(p.price);
    setPriceDesc(p.description);
    setPriceFeatures(p.features || []);
    setShowPricingModal(true);
  };

  const handlePricingSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem && editingItem.type === 'pricing') {
      const updated = [...pricingTiers];
      updated[editingItem.index] = {
        ...updated[editingItem.index],
        name: priceName,
        weight: priceWeight,
        price: priceVal,
        description: priceDesc,
        features: priceFeatures,
      };
      setPricingTiers(updated);
      setShowPricingModal(false);
      triggerNotification('Pricing package staged. Save changes to publish!');
    }
  };

  const handleAddPriceFeature = () => {
    if (newPriceFeatureInput.trim()) {
      setPriceFeatures([...priceFeatures, newPriceFeatureInput.trim()]);
      setNewPriceFeatureInput('');
    }
  };

  const handleRemovePriceFeature = (fIdx: number) => {
    setPriceFeatures(priceFeatures.filter((_, i) => i !== fIdx));
  };

  // Sizing updates
  const handleSizingChange = (idx: number, field: string, val: string) => {
    const updated = [...sizingGuidelines];
    updated[idx] = { ...updated[idx], [field]: val };
    setSizingGuidelines(updated);
  };

  // Flavor helpers
  const handleAddFlavor = () => {
    if (newFlavorInput.trim() && !flavors.includes(newFlavorInput.trim())) {
      setFlavors([...flavors, newFlavorInput.trim()]);
      setNewFlavorInput('');
      triggerNotification('Baking flavor staged.');
    }
  };

  const handleRemoveFlavor = (val: string) => {
    setFlavors(flavors.filter(f => f !== val));
    triggerNotification('Flavor staged for deletion.');
  };

  // CRUD FAQ Handlers
  const openFaqAdd = () => {
    setEditingItem(null);
    setFaqId(`faq-${Date.now()}`);
    setFaqQuest('');
    setFaqAns('');
    setShowFaqModal(true);
  };

  const openFaqEdit = (idx: number) => {
    setEditingItem({ type: 'faq', index: idx });
    const f = faqs[idx];
    setFaqId(f.id);
    setFaqQuest(f.question);
    setFaqAns(f.answer);
    setShowFaqModal(true);
  };

  const handleFaqSave = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: faqId,
      question: faqQuest,
      answer: faqAns,
    };
    if (editingItem && editingItem.type === 'faq') {
      const updated = [...faqs];
      updated[editingItem.index] = payload;
      setFaqs(updated);
    } else {
      setFaqs([...faqs, payload]);
    }
    setShowFaqModal(false);
    triggerNotification('FAQ staged successfully. Save changes to publish!');
  };

  const deleteFaq = (idx: number) => {
    if (confirm('Delete this FAQ entry?')) {
      setFaqs(faqs.filter((_, i) => i !== idx));
      triggerNotification('FAQ staged for deletion.');
    }
  };

  // Render Authentication Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 border border-[#F8BBD0]/30 rounded-3xl w-full max-w-md p-8 md:p-10 shadow-2xl text-center space-y-6"
        >
          {/* Padlock Icon */}
          <div className="w-16 h-16 bg-brand-pink/20 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-[#5D4037] dark:text-[#F8BBD0]">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-serif font-bold text-brand-brown dark:text-zinc-100">
              Admin Access Gate
            </h1>
            <p className="text-xs text-brand-brown-light dark:text-zinc-400 max-w-sm mx-auto">
              Please input your administrator key password below to access the dynamic live Content Management Panel.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-500/20 text-red-700 dark:text-red-400 rounded-xl text-xs flex items-center justify-center gap-1.5 font-semibold">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div className="space-y-1 text-left relative">
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-brown-light dark:text-zinc-300">
                Security Password Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="e.g. admin123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-brand-brown/15 dark:border-zinc-700 bg-transparent text-brand-brown dark:text-zinc-100 text-sm focus:ring-1 focus:ring-brand-pink-dark"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-[#5D4037]/60 dark:text-zinc-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <span className="text-[9px] text-zinc-400 block pt-1">
                Hint: Use the system password <code className="bg-brand-pink/20 dark:bg-zinc-800 px-1 py-0.5 rounded font-bold text-brand-pink-dark">admin123</code> to login.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#5D4037] hover:bg-brand-brown text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Unlock Administration
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-8">
      {/* Dynamic Toast Success */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[150] bg-emerald-600 text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 font-sans text-xs font-bold uppercase tracking-wider"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{notificationMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Panel Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-brand-brown/10 pb-6">
        <div className="space-y-1 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-pink/20 text-brand-brown-dark rounded-full text-[10px] font-bold uppercase tracking-wider">
            <Settings className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Live CMS Active</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-brand-brown dark:text-zinc-100">
            Control Center
          </h1>
          <p className="text-xs text-brand-brown-light dark:text-zinc-400">
            Modify any text, graphics, pricing plans, service features, cake menus, and FAQs instantly.
          </p>
        </div>

        {/* Master Control Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleResetDefaults}
            className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-zinc-700 text-neutral-500 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            System Default
          </button>
          <button
            onClick={handleSaveChanges}
            className="px-6 py-3 rounded-xl bg-[#5D4037] hover:bg-brand-brown text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-all shadow-md"
          >
            <Save className="w-4 h-4" />
            Publish Updates
          </button>
        </div>
      </div>

      {/* Main Admin layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 flex flex-col gap-1.5 bg-white/40 dark:bg-zinc-900/40 p-4 rounded-3xl border border-brand-brown/5">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-brown-light dark:text-zinc-400 px-3 pb-2 border-b border-brand-brown/5 text-left">
            CMS Divisions
          </h3>

          {[
            { id: 'general', label: 'Contact & Settings', icon: <Settings className="w-4 h-4" /> },
            { id: 'hero', label: 'Home Page Hero', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'about', label: 'About Elena & Story', icon: <Users className="w-4 h-4" /> },
            { id: 'gallery', label: 'Cake Gallery CRUD', icon: <Image className="w-4 h-4" /> },
            { id: 'services', label: 'Bakery Services', icon: <Briefcase className="w-4 h-4" /> },
            { id: 'pricing', label: 'Pricing & Sizing', icon: <DollarSign className="w-4 h-4" /> },
            { id: 'faqs', label: 'Frequently Asked FAQs', icon: <HelpCircle className="w-4 h-4" /> },
            { id: 'inquiries', label: 'User Inquiries', icon: <FileText className="w-4 h-4" />, badge: submissions.filter(s => s.status === 'unread').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all text-left ${
                activeTab === tab.id
                  ? 'bg-brand-pink/20 text-brand-brown dark:bg-zinc-800 dark:text-brand-pink shadow-xs'
                  : 'text-brand-brown-light dark:text-zinc-400 hover:bg-brand-pink/5 hover:text-brand-brown-dark dark:hover:bg-zinc-800/40'
              }`}
            >
              <div className="flex items-center gap-3">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
              {tab.badge !== undefined && tab.badge > 0 ? (
                <span className="px-2 py-0.5 rounded-full bg-brand-pink-dark text-white text-[10px] font-bold">
                  {tab.badge}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {/* CMS Configuration Forms Workspace */}
        <div className="lg:col-span-3 bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border border-brand-brown/5 shadow-md">
          
          {/* TAB 1: GENERAL & CONTACT */}
          {activeTab === 'general' && (
            <div className="space-y-6 text-left">
              <div>
                <h2 className="text-xl font-serif font-bold text-brand-brown dark:text-zinc-100">
                  Global Contact & Bakery Info
                </h2>
                <p className="text-xs text-neutral-400">
                  Manage core brand strings, location, direct WhatsApp forwarding handles, and opening schedules.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-brown dark:text-zinc-300">Brand Name</label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-brown dark:text-zinc-300">Phone Hotline</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-brown dark:text-zinc-300">WhatsApp Dispatch (Number Only)</label>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm"
                  />
                  <span className="text-[10px] text-zinc-400 block">Provide number with country code, e.g. 923053623409. No spaces or symbols.</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-brown dark:text-zinc-300">Official Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-brand-brown dark:text-zinc-300">Bakery Studio Physical Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-brand-brown dark:text-zinc-300">Working Operating Hours</label>
                  <input
                    type="text"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-brown dark:text-zinc-300">Instagram Handle URL</label>
                  <input
                    type="text"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-brown dark:text-zinc-300">Facebook Page URL</label>
                  <input
                    type="text"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO & TESTIMONIALS */}
          {activeTab === 'hero' && (
            <div className="space-y-6 text-left">
              <div>
                <h2 className="text-xl font-serif font-bold text-brand-brown dark:text-zinc-100">
                  Homepage Hero Banner & Feedback
                </h2>
                <p className="text-xs text-neutral-400">
                  Change titles, marketing descriptions, or manage the customer review carousel.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-brown dark:text-zinc-300">Hero Main Title</label>
                  <input
                    type="text"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-brown dark:text-zinc-300">Hero Colored Highlight Text</label>
                  <input
                    type="text"
                    value={heroHighlight}
                    onChange={(e) => setHeroHighlight(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-brown dark:text-zinc-300">Hero Subtitle Paragraph</label>
                  <textarea
                    rows={3}
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-brown dark:text-zinc-300">Call-To-Action Button Label</label>
                  <input
                    type="text"
                    value={heroCtaText}
                    onChange={(e) => setHeroCtaText(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm"
                  />
                </div>
              </div>

              {/* Testimonials List */}
              <div className="pt-6 border-t border-brand-brown/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-serif font-bold text-brand-brown dark:text-zinc-100">
                    Client Testimonials ({testimonials.length})
                  </h3>
                  <button
                    onClick={openTestimonialAdd}
                    className="px-3 py-1.5 bg-brand-pink/20 hover:bg-brand-pink/35 text-brand-brown-dark rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Add New
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testimonials.map((test, index) => (
                    <div key={test.id} className="p-4 rounded-2xl border border-[#F8BBD0]/20 bg-[#FFF8E7]/40 dark:bg-zinc-800/40 text-left flex justify-between items-start gap-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <img src={test.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <h4 className="text-xs font-bold text-[#5D4037] dark:text-zinc-200">{test.name}</h4>
                            <span className="text-[10px] text-zinc-400 block">{test.role}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-zinc-500 line-clamp-2 italic leading-relaxed">"{test.comment}"</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => openTestimonialEdit(index)}
                          className="p-1.5 bg-neutral-100 dark:bg-zinc-700 rounded-lg text-[#5D4037] hover:bg-brand-pink/20 transition-all"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteTestimonial(index)}
                          className="p-1.5 bg-red-50 dark:bg-red-950/20 text-red-600 rounded-lg hover:bg-red-100"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ABOUT STORY */}
          {activeTab === 'about' && (
            <div className="space-y-6 text-left">
              <div>
                <h2 className="text-xl font-serif font-bold text-brand-brown dark:text-zinc-100">
                  About Elena & Story Layouts
                </h2>
                <p className="text-xs text-neutral-400">
                  Edit narrative copy, custom blockquotes, and the baker profile listings.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-brown dark:text-zinc-300">About Section Tagline</label>
                  <input
                    type="text"
                    value={aboutTitle}
                    onChange={(e) => setAboutTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-brown dark:text-zinc-300">About Section Main Heading</label>
                  <input
                    type="text"
                    value={aboutSubtitle}
                    onChange={(e) => setAboutSubtitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-brown dark:text-zinc-300">Story Title Heading</label>
                  <input
                    type="text"
                    value={aboutStoryHeading}
                    onChange={(e) => setAboutStoryHeading(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-brown dark:text-zinc-300">Story Paragraph 1</label>
                  <textarea
                    rows={4}
                    value={aboutStoryParagraph1}
                    onChange={(e) => setAboutStoryParagraph1(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-brown dark:text-zinc-300">Story Paragraph 2</label>
                  <textarea
                    rows={4}
                    value={aboutStoryParagraph2}
                    onChange={(e) => setAboutStoryParagraph2(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-brand-brown dark:text-zinc-300">Quote Text Banner</label>
                  <textarea
                    rows={2}
                    value={aboutQuote}
                    onChange={(e) => setAboutQuote(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GALLERY CRUD */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-brand-brown dark:text-zinc-100">
                    Cake Design Gallery CRUD
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Add new masterpieces, rewrite descriptions, or delete old designs from the search categories.
                  </p>
                </div>
                <button
                  onClick={openGalleryAdd}
                  className="px-4 py-2 bg-brand-pink/25 hover:bg-brand-pink/40 text-brand-brown-dark rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer self-start sm:self-center transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Cake Photo
                </button>
              </div>

              {/* Gallery Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {galleryItems.map((gal, idx) => (
                  <div key={gal.id} className="p-4 rounded-2xl border border-[#F8BBD0]/20 bg-white dark:bg-zinc-800 text-left flex items-start gap-4 shadow-xs">
                    <img src={gal.image} alt={gal.title} className="w-20 h-20 rounded-xl object-cover border border-brand-pink/10 shrink-0" />
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-brand-pink-dark px-1.5 py-0.5 bg-brand-pink/15 rounded-md">
                          {gal.category}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => openGalleryEdit(idx)}
                            className="p-1.5 bg-neutral-100 dark:bg-zinc-700 rounded-lg text-[#5D4037] hover:bg-brand-pink/20 transition-all"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => deleteGallery(idx)}
                            className="p-1.5 bg-red-50 dark:bg-red-950/20 text-red-600 rounded-lg hover:bg-red-100"
                          >
                            <Trash className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <h4 className="text-xs font-bold text-brand-brown dark:text-zinc-200 truncate">{gal.title}</h4>
                      <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed">{gal.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6 text-left">
              <div>
                <h2 className="text-xl font-serif font-bold text-brand-brown dark:text-zinc-100">
                  Bakery Service Management
                </h2>
                <p className="text-xs text-neutral-400">
                  Edit specialized offerings, descriptions, and highlights displayed in the services area.
                </p>
              </div>

              <div className="space-y-4">
                {services.map((service, idx) => (
                  <div key={service.id} className="p-5 rounded-2xl border border-[#F8BBD0]/15 bg-[#FFF8E7]/20 dark:bg-zinc-800/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1.5 flex-1 text-left">
                      <h4 className="text-sm font-bold text-brand-brown dark:text-zinc-200">
                        {service.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
                        {service.description}
                      </p>
                      {service.features && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {service.features.map((f, i) => (
                            <span key={i} className="text-[9px] bg-neutral-100 dark:bg-zinc-700 text-neutral-500 dark:text-zinc-300 px-2 py-0.5 rounded-full font-semibold">
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => openServiceEdit(idx)}
                      className="px-3.5 py-1.5 bg-neutral-100 dark:bg-zinc-700 rounded-xl text-xs font-bold text-brand-brown dark:text-zinc-200 flex items-center gap-1 cursor-pointer hover:bg-brand-pink/25 transition-all self-start sm:self-center"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      Edit Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PRICING & SIZES */}
          {activeTab === 'pricing' && (
            <div className="space-y-8 text-left">
              <div className="space-y-1">
                <h2 className="text-xl font-serif font-bold text-brand-brown dark:text-zinc-100">
                  Pricing Plans, Sizing Guides & Flavors
                </h2>
                <p className="text-xs text-neutral-400">
                  Configure starting rates, dimensions guidelines, and the primary dynamic flavor inventory dropdown values.
                </p>
              </div>

              {/* Pricing Cards CRUD */}
              <div className="space-y-4">
                <h3 className="text-sm font-serif font-bold text-brand-brown dark:text-zinc-200 border-b pb-1">
                  1. Tiered Packaging Plans
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pricingTiers.map((tier, idx) => (
                    <div key={tier.id} className="p-4 rounded-2xl border border-brand-pink/15 bg-white dark:bg-zinc-800 flex justify-between items-start gap-3 shadow-xs">
                      <div className="space-y-1 text-left flex-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-[#5D4037] dark:text-zinc-200">{tier.name}</h4>
                          <span className="text-[10px] font-bold text-brand-pink-dark">{tier.price}</span>
                        </div>
                        <p className="text-[10px] text-zinc-400">{tier.weight}</p>
                        <p className="text-[10px] text-zinc-500 leading-relaxed line-clamp-2">{tier.description}</p>
                      </div>
                      <button
                        onClick={() => openPricingEdit(idx)}
                        className="p-1.5 bg-neutral-100 dark:bg-zinc-700 rounded-lg text-brand-brown hover:bg-brand-pink/20 transition-all"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizing Guidelines Table */}
              <div className="space-y-4">
                <h3 className="text-sm font-serif font-bold text-brand-brown dark:text-zinc-200 border-b pb-1">
                  2. Detailed Sizing Guidelines
                </h3>
                <div className="space-y-3">
                  {sizingGuidelines.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3 bg-[#FFF8E7]/30 dark:bg-zinc-800/30 rounded-xl border border-neutral-100 dark:border-zinc-800">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase text-zinc-400">Size Title</span>
                        <input
                          type="text"
                          value={item.size}
                          onChange={(e) => handleSizingChange(idx, 'size', e.target.value)}
                          className="w-full px-2 py-1 bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 text-xs rounded-lg"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase text-zinc-400">Serves</span>
                        <input
                          type="text"
                          value={item.servings}
                          onChange={(e) => handleSizingChange(idx, 'servings', e.target.value)}
                          className="w-full px-2 py-1 bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 text-xs rounded-lg"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase text-zinc-400">Starting Price</span>
                        <input
                          type="text"
                          value={item.price}
                          onChange={(e) => handleSizingChange(idx, 'price', e.target.value)}
                          className="w-full px-2 py-1 bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 text-xs rounded-lg"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase text-zinc-400">Description</span>
                        <input
                          type="text"
                          value={item.desc}
                          onChange={(e) => handleSizingChange(idx, 'desc', e.target.value)}
                          className="w-full px-2 py-1 bg-white dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 text-xs rounded-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flavors List */}
              <div className="space-y-4">
                <h3 className="text-sm font-serif font-bold text-brand-brown dark:text-zinc-200 border-b pb-1">
                  3. Dynamic Baking Flavors List
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Lemon Blueberry Drizzle"
                    value={newFlavorInput}
                    onChange={(e) => setNewFlavorInput(e.target.value)}
                    className="flex-1 px-4 py-2 border border-neutral-200 dark:border-zinc-700 bg-transparent text-sm rounded-xl focus:outline-hidden"
                  />
                  <button
                    onClick={handleAddFlavor}
                    className="px-4 py-2 bg-brand-pink hover:bg-brand-pink-dark text-brand-brown-dark text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
                  >
                    Add Flavor
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {flavors.map((flav) => (
                    <span key={flav} className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-pink/15 text-brand-brown-dark rounded-xl text-xs font-semibold">
                      <span>{flav}</span>
                      <button
                        onClick={() => handleRemoveFlavor(flav)}
                        className="p-0.5 hover:bg-brand-pink/30 rounded-full text-brand-pink-dark"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: FAQS */}
          {activeTab === 'faqs' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-brand-brown dark:text-zinc-100">
                    Frequently Asked Questions CRUD
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Maintain helpful information about pre-orders, schedules, refunds, allergy controls, or delivery operations.
                  </p>
                </div>
                <button
                  onClick={openFaqAdd}
                  className="px-4 py-2 bg-brand-pink/25 hover:bg-brand-pink/40 text-brand-brown-dark rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer self-start sm:self-center transition-all shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  Add New FAQ
                </button>
              </div>

              {/* FAQs accordion lists */}
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={faq.id} className="p-4 rounded-2xl border border-brand-brown/5 bg-white dark:bg-zinc-800 text-left flex justify-between items-start gap-4 shadow-2xs">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-brand-brown dark:text-zinc-200">{faq.question}</h4>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">{faq.answer}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => openFaqEdit(idx)}
                        className="p-1.5 bg-neutral-100 dark:bg-zinc-700 rounded-lg text-[#5D4037] hover:bg-brand-pink/20 transition-all"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteFaq(idx)}
                        className="p-1.5 bg-red-50 dark:bg-red-950/20 text-red-600 rounded-lg hover:bg-red-100"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: CONTACT INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-brown/5 pb-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-brand-brown dark:text-zinc-100">
                    Contact Inquiries Database
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Review and reply to messages sent by customers from the Contact Form. Clicking on an email lets you reply instantly.
                  </p>
                </div>
                {submissions.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to permanently clear all contact submissions? This cannot be undone.')) {
                        clearAllSubmissions();
                        triggerNotification('All inquiries cleared successfully.');
                      }
                    }}
                    className="px-4 py-2 bg-red-50 dark:bg-red-950/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border border-red-200/10"
                  >
                    <Trash className="w-4 h-4" />
                    Clear All
                  </button>
                )}
              </div>

              {submissions.length === 0 ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-brand-pink/10 rounded-full flex items-center justify-center mx-auto text-brand-pink-dark">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-brand-brown dark:text-zinc-200">No Inquiries Found</h3>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                      Any client letters submitted via the contact form will instantly appear here. Try submitting a test inquiry!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        sub.status === 'unread'
                          ? 'border-brand-pink-dark/30 bg-brand-pink/5 dark:bg-zinc-800/20 shadow-sm'
                          : 'border-brand-brown/5 bg-white dark:bg-zinc-800/40'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="space-y-1 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="text-sm font-bold text-brand-brown dark:text-zinc-100">
                              {sub.name}
                            </span>
                            <span className="text-[10px] text-zinc-400">
                              • {sub.submittedAt}
                            </span>
                            <span
                              className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                                sub.status === 'unread'
                                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                                  : sub.status === 'read'
                                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                                  : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              }`}
                            >
                              {sub.status}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                            <a
                              href={`mailto:${sub.email}`}
                              className="text-brand-pink-dark hover:underline font-semibold flex items-center gap-1"
                              title="Click to email reply"
                            >
                              <span className="font-mono text-zinc-500 dark:text-zinc-400">To:</span> {sub.email}
                            </a>
                            <span className="text-zinc-300">|</span>
                            <span className="font-medium text-brand-brown/70 dark:text-zinc-300">
                              Subject: {sub.subject}
                            </span>
                          </div>
                          
                          <div className="pt-3 text-xs text-brand-brown dark:text-zinc-300 whitespace-pre-wrap leading-relaxed bg-black/5 dark:bg-black/20 p-3 rounded-xl border border-black/5">
                            {sub.message}
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-stretch gap-2 shrink-0 w-full sm:w-auto">
                          {sub.status === 'unread' && (
                            <button
                              onClick={() => {
                                updateSubmissionStatus(sub.id, 'read');
                                triggerNotification('Marked inquiry as read');
                              }}
                              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-all border border-blue-200/10"
                            >
                              <Check className="w-3.5 h-3.5" />
                              Mark Read
                            </button>
                          )}
                          
                          {sub.status !== 'replied' && (
                            <a
                              href={`mailto:${sub.email}?subject=RE: ${encodeURIComponent(sub.subject)}`}
                              onClick={() => {
                                updateSubmissionStatus(sub.id, 'replied');
                              }}
                              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-all text-center border border-emerald-200/10"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 inline" />
                              Reply / Replied
                            </a>
                          )}

                          <button
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this inquiry?')) {
                                deleteSubmission(sub.id);
                                triggerNotification('Inquiry deleted successfully.');
                              }
                            }}
                            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-all border border-red-200/10"
                          >
                            <Trash className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* CRUD MODALS BLOCK */}
      <AnimatePresence>
        {/* Testimonial Form Modal */}
        {showTestimonialModal && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md p-6 space-y-5 text-left border shadow-2xl relative"
            >
              <h3 className="font-serif text-lg font-bold text-brand-brown dark:text-zinc-100">
                {editingItem ? 'Edit Testimonial' : 'Add New Client Review'}
              </h3>
              <form onSubmit={handleTestimonialSave} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Client Name</label>
                  <input
                    type="text"
                    required
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    className="w-full px-3 py-2 border dark:border-zinc-700 rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">Client Subtext/Role</label>
                  <input
                    type="text"
                    required
                    value={testRole}
                    onChange={(e) => setTestRole(e.target.value)}
                    placeholder="e.g. Birthday Party Host"
                    className="w-full px-3 py-2 border dark:border-zinc-700 rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">Comment Message</label>
                  <textarea
                    rows={3}
                    required
                    value={testComment}
                    onChange={(e) => setTestComment(e.target.value)}
                    className="w-full px-3 py-2 border dark:border-zinc-700 rounded-xl text-sm text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold">Rating Star (1-5)</label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      required
                      value={testRating}
                      onChange={(e) => setTestRating(parseInt(e.target.value) || 5)}
                      className="w-full px-3 py-2 border dark:border-zinc-700 rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold">Avatar URL</label>
                    <input
                      type="text"
                      value={testAvatar}
                      onChange={(e) => setTestAvatar(e.target.value)}
                      className="w-full px-3 py-2 border dark:border-zinc-700 rounded-xl text-xs"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2.5 pt-3 border-t">
                  <button
                    type="button"
                    onClick={() => setShowTestimonialModal(false)}
                    className="px-4 py-2 border dark:border-zinc-700 rounded-xl text-xs font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#5D4037] text-white rounded-xl text-xs font-bold uppercase"
                  >
                    Confirm Stage
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Gallery CRUD Form Modal */}
        {showGalleryModal && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md p-6 space-y-5 text-left border shadow-2xl relative"
            >
              <h3 className="font-serif text-lg font-bold text-brand-brown dark:text-zinc-100">
                {editingItem ? 'Edit Cake Details' : 'Add New Masterpiece'}
              </h3>
              <form onSubmit={handleGallerySave} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Cake Title Name</label>
                  <input
                    type="text"
                    required
                    value={galTitle}
                    onChange={(e) => setGalTitle(e.target.value)}
                    className="w-full px-3 py-2 border dark:border-zinc-700 rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">Gallery Category Division</label>
                  <select
                    value={galCategory}
                    onChange={(e) => setGalCategory(e.target.value)}
                    className="w-full px-3 py-2 border dark:border-zinc-700 rounded-xl text-sm"
                  >
                    <option value="Birthday Cakes">Birthday Cakes</option>
                    <option value="Wedding Cakes">Wedding Cakes</option>
                    <option value="Customized Cakes">Customized Cakes</option>
                    <option value="Cupcakes">Cupcakes</option>
                    <option value="Chocolate Cakes">Chocolate Cakes</option>
                    <option value="Kids Theme Cakes">Kids Theme Cakes</option>
                    <option value="Floral Cakes">Floral Cakes</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">Display Image URL</label>
                  <input
                    type="text"
                    required
                    value={galImage}
                    onChange={(e) => setGalImage(e.target.value)}
                    className="w-full px-3 py-2 border dark:border-zinc-700 rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">Delectable Copy Description</label>
                  <textarea
                    rows={3}
                    required
                    value={galDesc}
                    onChange={(e) => setGalDesc(e.target.value)}
                    className="w-full px-3 py-2 border dark:border-zinc-700 rounded-xl text-sm text-xs"
                  />
                </div>
                <div className="flex justify-end gap-2.5 pt-3 border-t">
                  <button
                    type="button"
                    onClick={() => setShowGalleryModal(false)}
                    className="px-4 py-2 border dark:border-zinc-700 rounded-xl text-xs font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#5D4037] text-white rounded-xl text-xs font-bold uppercase"
                  >
                    Stage Gallery item
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Service Form Modal */}
        {showServiceModal && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md p-6 space-y-5 text-left border shadow-2xl relative"
            >
              <h3 className="font-serif text-lg font-bold text-brand-brown dark:text-zinc-100">
                Edit Offering Details
              </h3>
              <form onSubmit={handleServiceSave} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Service Title</label>
                  <input
                    type="text"
                    required
                    value={servTitle}
                    onChange={(e) => setServTitle(e.target.value)}
                    className="w-full px-3 py-2 border dark:border-zinc-700 rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">Detailed Copy Description</label>
                  <textarea
                    rows={3}
                    required
                    value={servDesc}
                    onChange={(e) => setServDesc(e.target.value)}
                    className="w-full px-3 py-2 border dark:border-zinc-700 rounded-xl text-sm text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold">Highlight Bullet Feature points</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Free gold tier box"
                      value={newFeatureInput}
                      onChange={(e) => setNewFeatureInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 border dark:border-zinc-700 text-xs rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={handleAddServiceFeature}
                      className="px-3 bg-[#5D4037] text-white rounded-xl text-xs uppercase font-bold"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1.5">
                    {servFeatures.map((f, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-300 rounded-lg text-[10px] font-semibold">
                        <span>{f}</span>
                        <button type="button" onClick={() => handleRemoveServiceFeature(idx)} className="text-red-500 hover:text-red-700 font-bold ml-1">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-3 border-t">
                  <button
                    type="button"
                    onClick={() => setShowServiceModal(false)}
                    className="px-4 py-2 border dark:border-zinc-700 rounded-xl text-xs font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#5D4037] text-white rounded-xl text-xs font-bold uppercase"
                  >
                    Confirm Stage
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Pricing Tier Modal */}
        {showPricingModal && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md p-6 space-y-5 text-left border shadow-2xl relative"
            >
              <h3 className="font-serif text-lg font-bold text-brand-brown dark:text-zinc-100">
                Edit Package Tier Info
              </h3>
              <form onSubmit={handlePricingSave} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Package Name</label>
                  <input
                    type="text"
                    required
                    value={priceName}
                    onChange={(e) => setPriceName(e.target.value)}
                    className="w-full px-3 py-2 border dark:border-zinc-700 rounded-xl text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold">Weight & Servings</label>
                    <input
                      type="text"
                      required
                      value={priceWeight}
                      onChange={(e) => setPriceWeight(e.target.value)}
                      className="w-full px-3 py-2 border dark:border-zinc-700 rounded-xl text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold">Starting Price Tag</label>
                    <input
                      type="text"
                      required
                      value={priceVal}
                      onChange={(e) => setPriceVal(e.target.value)}
                      className="w-full px-3 py-2 border dark:border-zinc-700 rounded-xl text-xs"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">Short Subheading description</label>
                  <textarea
                    rows={2}
                    required
                    value={priceDesc}
                    onChange={(e) => setPriceDesc(e.target.value)}
                    className="w-full px-3 py-2 border dark:border-zinc-700 rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold">Included Package Bullet features</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Eco candles pack"
                      value={newPriceFeatureInput}
                      onChange={(e) => setNewPriceFeatureInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 border dark:border-zinc-700 text-xs rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={handleAddPriceFeature}
                      className="px-3 bg-[#5D4037] text-white rounded-xl text-xs uppercase font-bold"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1.5">
                    {priceFeatures.map((f, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-300 rounded-lg text-[10px] font-semibold">
                        <span>{f}</span>
                        <button type="button" onClick={() => handleRemovePriceFeature(idx)} className="text-red-500 hover:text-red-700 font-bold ml-1">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-3 border-t">
                  <button
                    type="button"
                    onClick={() => setShowPricingModal(false)}
                    className="px-4 py-2 border dark:border-zinc-700 rounded-xl text-xs font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#5D4037] text-white rounded-xl text-xs font-bold uppercase"
                  >
                    Confirm Stage
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* FAQ Form Modal */}
        {showFaqModal && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md p-6 space-y-5 text-left border shadow-2xl relative"
            >
              <h3 className="font-serif text-lg font-bold text-brand-brown dark:text-zinc-100">
                {editingItem ? 'Edit FAQ Entry' : 'Add New FAQ Question'}
              </h3>
              <form onSubmit={handleFaqSave} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Frequently Asked Question</label>
                  <input
                    type="text"
                    required
                    value={faqQuest}
                    onChange={(e) => setFaqQuest(e.target.value)}
                    className="w-full px-3 py-2 border dark:border-zinc-700 rounded-xl text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">Helpful Answer Response</label>
                  <textarea
                    rows={4}
                    required
                    value={faqAns}
                    onChange={(e) => setFaqAns(e.target.value)}
                    className="w-full px-3 py-2 border dark:border-zinc-700 rounded-xl text-sm text-xs leading-relaxed"
                  />
                </div>
                <div className="flex justify-end gap-2.5 pt-3 border-t">
                  <button
                    type="button"
                    onClick={() => setShowFaqModal(false)}
                    className="px-4 py-2 border dark:border-zinc-700 rounded-xl text-xs font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#5D4037] text-white rounded-xl text-xs font-bold uppercase"
                  >
                    Stage FAQ Entry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
