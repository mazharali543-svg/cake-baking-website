/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ActivePage = 'home' | 'about' | 'gallery' | 'services' | 'pricing' | 'order' | 'contact' | 'faq';

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
