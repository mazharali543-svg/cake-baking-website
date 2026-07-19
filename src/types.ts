/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ActivePage = 'home' | 'about' | 'gallery' | 'services' | 'pricing' | 'order' | 'contact' | 'faq' | 'blog' | 'admin';

export interface CakeCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  weight: string;
  price: string;
  description: string;
  features: string[];
  isCustomized?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface OrderFormState {
  customerName: string;
  phoneNumber: string;
  email: string;
  deliveryAddress: string;
  eventDate: string;
  cakeWeight: string;
  flavor: string;
  theme: string;
  customInstructions: string;
  referenceImage: File | null;
  referenceImageUrl?: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  views: number;
}

export interface SiteContent {
  // General & Contact Info
  brandName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  instagramUrl: string;
  facebookUrl: string;

  // Home Section
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroCtaText: string;
  benefitsTitle: string;
  benefitsList: { id: string; title: string; desc: string }[];
  categories: CakeCategory[];
  testimonials: Testimonial[];

  // About Section
  aboutTitle: string;
  aboutSubtitle: string;
  aboutStoryHeading: string;
  aboutStoryParagraph1: string;
  aboutStoryParagraph2: string;
  aboutQuote: string;
  aboutValues: { title: string; desc: string }[];
  team: { name: string; role: string; bio: string; avatar: string }[];

  // Services Section
  services: { id: string; title: string; description: string; features: string[] }[];

  // Pricing Section
  pricingTiers: PricingPlan[];
  customDecorations: { name: string; price: string }[];
  sizingGuidelines: { size: string; servings: string; price: string; desc: string }[];
  flavors: string[];

  // Gallery Section
  galleryItems: GalleryItem[];

  // FAQ Section
  faqs: { id: string; question: string; answer: string }[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: 'unread' | 'read' | 'replied';
}


