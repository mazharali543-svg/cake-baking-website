/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { SiteContent, CakeCategory, Testimonial, GalleryItem, PricingPlan, ContactSubmission } from '../types';

const STORAGE_KEY = 'thecakebake_site_content_v1';

// Initial defaults matching original premium website designs
const DEFAULT_CONTENT: SiteContent = {
  brandName: 'Thecakebake',
  phone: '+92 300 1234567',
  whatsapp: '923053623409',
  email: 'elena@thecakebake.com',
  address: 'Suite 4B, Pastry Hills Blvd, Beverly Glen, California',
  hours: 'Mon - Sat: 9:00 AM - 9:00 PM, Sun: 11:00 AM - 6:00 PM',
  instagramUrl: 'https://instagram.com/thecakebake',
  facebookUrl: 'https://www.facebook.com/Thecakebake33',

  // Home Section
  heroTitle: 'Exquisite Celebration Cakes',
  heroHighlight: 'Baked from Scratch',
  heroSubtitle: 'Hand-crafted multi-layered custom masterpieces, whipped cream swirls, and premium local ingredients. Elena\'s studio caters to birthdays, weddings, and anniversaries with hospital-grade sanitation protocols.',
  heroCtaText: 'Customize My Dream Cake',
  heroImage: '/src/assets/images/homepage_hero_cake_1784453038791.jpg',
  benefitsTitle: 'Our Baking Quality Guarantees',
  benefitsList: [
    { id: 'b1', title: '100% From Scratch', desc: 'No pre-mix packages, no artificial gels. Sponges are baked freshly with pure farm dairy and organic vanilla.' },
    { id: 'b2', title: 'Pristine Hygiene Protocol', desc: 'Surgical hygiene standards with daily chemical workstation sanitization, hourly hand-washes, and face masks.' },
    { id: 'b3', title: 'Fresh Premium Sourcing', desc: 'Genuine Belgian block chocolates, organic berries, real pasteurized butter, and edible gold leafing.' },
  ],
  categories: [
    {
      id: 'birthday',
      name: 'Birthday Cakes',
      description: 'Customized creations with vibrant colors, themes, and personalized touches to celebrate birthdays beautifully.',
      image: '/src/assets/images/birthday_cake_1784453057938.jpg',
    },
    {
      id: 'wedding',
      name: 'Wedding Cakes',
      description: 'Elegant multi-tiered masterpieces with hand-crafted floral details to celebrate eternal unions.',
      image: '/src/assets/images/wedding_cake_1784453075817.jpg',
    },
    {
      id: 'cupcakes',
      name: 'Gourmet Cupcakes',
      description: 'Delectable, individually styled mini-treats topped with premium cream swirls and gourmet sprinkles.',
      image: '/src/assets/images/cupcake_collection_1784453094801.jpg',
    },
    {
      id: 'custom',
      name: 'Customized Artistry',
      description: 'Bespoke designs shaped exactly according to your theme, mood boards, and favorite flavor combinations.',
      image: '/src/assets/images/homepage_hero_cake_1784453038791.jpg',
    },
  ],
  testimonials: [
    {
      id: '1',
      name: 'Sophia Carter',
      role: 'Mother of Two',
      comment: 'The custom birthday cake for my daughter was absolutely stunning and tasted like a slice of heaven. The blush cream icing was delicate, not overly sweet. Highly recommend!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: '2',
      name: 'Alexander Sterling',
      role: 'Wedding Groom',
      comment: 'For our wedding, we wanted a cake that matched our floral theme. Thecakebake delivered an absolute masterpiece. The 3-tier rose gold roses were so realistic, and guests kept praising the moist layers!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: '3',
      name: 'Diana Prince',
      role: 'Marketing Coordinator',
      comment: 'Booked cupcakes for our corporate rebranding launch. Clean branding, pure hygiene standards, and divine chocolate flavors. It was a huge success!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
  ],

  // About Section
  aboutTitle: 'The Bakery Behind the Magic',
  aboutSubtitle: 'Our Baking Journey & Philosophy',
  aboutStoryHeading: 'How Thecakebake Was Kneaded Into Life',
  aboutStoryParagraph1: 'Our story started in a modest family kitchen with a single hand-mixer and a mother\'s dream of baking cakes that were both visually spectacular and tasted profoundly moist. Elena Rostova grew frustrated by commercial bakeries that sacrificed rich homemade textures for mass-produced stability.',
  aboutStoryParagraph2: 'She began baking for friends, family, and local baby showers. Word of her exquisite buttercream styling, fluffy crumb texture, and strict sanitation standards spread rapidly. In 2024, Elena co-founded Thecakebake, converting her workspace into a professional-grade custom bakery laboratory.',
  aboutQuote: '"To us, a cake is not just dessert. It is the glowing centerpiece of some of life\'s most precious memories. We bake that honor into every layer."',
  aboutValues: [
    {
      title: 'Baked with Deep Love',
      desc: 'Baking is not a mechanical assembly line for us. We pour absolute devotion, artistry, and passion into whipping, layering, and painting every custom masterwork.'
    },
    {
      title: 'Sterile Hygiene Protocol',
      desc: 'Our baking workstations undergo rigorous daily chemical sanitization. Hand-washing is hourly, hairnets and sterile masks are mandatory, ensuring absolute pure safety.'
    },
    {
      title: 'Premium Raw Ingredients',
      desc: 'We strictly reject compound chocolate or hydrogenated fats. We source genuine Belgian chocolate blocks, organic madagascar vanilla pods, and fresh farm-direct dairy.'
    }
  ],
  team: [
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
  ],

  // Services Section
  services: [
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
  ],

  // Pricing Section
  pricingTiers: [
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
  ],
  customDecorations: [
    { name: 'Elegant Floral & Gold Leaves', price: '$10' },
    { name: 'Minimalist Semi-Naked & Berries', price: '$5' },
    { name: 'Kids Pastel Unicorn/Cartoon', price: '$20' },
    { name: 'Corporate Edible Branding', price: '$15' },
    { name: 'Fully Customized Sculpting', price: '$30' },
  ],
  sizingGuidelines: [
    { size: '1-Pound Cake', servings: '4 - 6 slices', price: '$35', desc: 'Single tier. Ideal for romantic couples and small families.' },
    { size: '2-Pound Cake', servings: '10 - 12 slices', price: '$65', desc: 'Two layers. Our signature option for standard family gatherings.' },
    { size: '3-Pound Cake', servings: '18 - 22 slices', price: '$95', desc: 'Double tier option. Hand-crafted for grand milestone parties.' },
  ],
  flavors: [
    'Chocolate Fudge Decadence',
    'Red Velvet Silky Cheese',
    'Madagascar Vanilla Cream',
    'Salted Caramel Praline',
    'Fresh Strawberry Buttercream',
    'Hazelnut Fudge Mirror',
  ],

  // Gallery Section
  galleryItems: [
    {
      id: 'b1',
      title: 'Blush Velvet Birthday Cake',
      category: 'Birthday Cakes',
      image: '/src/assets/images/birthday_cake_1784453057938.jpg',
      description: 'Elegant vanilla buttercream frosting, white chocolate drips, edible pearls, and custom rose gold details. Extremely moist.'
    },
    {
      id: 'w1',
      title: 'Majestic Blush Wedding Cake',
      category: 'Wedding Cakes',
      image: '/src/assets/images/wedding_cake_1784453075817.jpg',
      description: 'Magnificent 3-tier custom wedding cake decorated with realistic hand-sculpted sugar roses and real gold leaf accents.'
    },
    {
      id: 'cp1',
      title: 'Vanilla Pastel Dream Cupcakes',
      category: 'Cupcakes',
      image: '/src/assets/images/cupcake_collection_1784453094801.jpg',
      description: 'Gourmet vanilla cupcakes piped with dual-shaded pink and cream buttercream swirls, decorated with mini edible pearls.'
    },
    {
      id: 'ch1',
      title: 'Decadent Fudge Chocolate Drip',
      category: 'Chocolate Cakes',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
      description: 'Rich dark Belgian chocolate sponge filled with premium fudge ganache and topped with cascading dark chocolate drips.'
    },
    {
      id: 'k1',
      title: 'Whimsical Pastel Unicorn',
      category: 'Kids Theme Cakes',
      image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=600&q=80',
      description: 'Whimsical birthday cake for kids with pastel rainbow buttercream layers, edible golden horn, and custom sleeping eyes.'
    },
    {
      id: 'f1',
      title: 'Secret Garden Floral Meadow',
      category: 'Floral Cakes',
      image: 'https://images.unsplash.com/photo-1464349172961-10492ec86537?auto=format&fit=crop&w=600&q=80',
      description: 'Intricately iced pastel cream cake loaded with pressed organic edible flowers, lavender sprigs, and dried berry dust.'
    },
    {
      id: 'c1',
      title: 'Rustic Caramel Drip Celebration',
      category: 'Customized Cakes',
      image: '/src/assets/images/homepage_hero_cake_1784453038791.jpg',
      description: 'Beautiful multi-tiered rustic cake with dynamic salted caramel splashes, fresh strawberries, raspberries, and white roses.'
    },
    {
      id: 'b2',
      title: 'Pastel Confetti Balloon Cake',
      category: 'Birthday Cakes',
      image: 'https://images.unsplash.com/photo-1518047601542-79f18c655718?auto=format&fit=crop&w=600&q=80',
      description: 'Vibrant confetti-filled cake layered with vanilla frosting and featuring a miniature balloon cake topper arrangement.'
    },
    {
      id: 'ch2',
      title: 'Hazelnut Praline Ganache',
      category: 'Chocolate Cakes',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
      description: 'Luxury milk chocolate cake covered in toasted organic hazelnuts, praline mousse, and a glossy chocolate mirror glaze.'
    },
  ],

  // FAQ Section
  faqs: [
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
  ]
};

// Event emitter to coordinate real-time updates across multiple active component instances
type Listener = (content: SiteContent) => void;
const listeners = new Set<Listener>();

const emitChange = (newContent: SiteContent) => {
  listeners.forEach(listener => listener(newContent));
};

export const getSiteContent = (): SiteContent => {
  if (typeof window === 'undefined') return DEFAULT_CONTENT;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CONTENT));
    return DEFAULT_CONTENT;
  }
  try {
    const parsed = JSON.parse(stored);
    // Deep-merge default keys just in case structure updates or keys are missing
    return { ...DEFAULT_CONTENT, ...parsed };
  } catch (e) {
    return DEFAULT_CONTENT;
  }
};

export const saveSiteContent = (content: SiteContent) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  emitChange(content);
};

export const resetSiteContent = () => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CONTENT));
  emitChange(DEFAULT_CONTENT);
};

// Dynamic hook for full visual synchronization in real-time
export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContent>(getSiteContent);

  useEffect(() => {
    const handleChange = (newContent: SiteContent) => {
      setContent(newContent);
    };
    listeners.add(handleChange);
    return () => {
      listeners.delete(handleChange);
    };
  }, []);

  return {
    content,
    updateContent: (newContent: SiteContent) => saveSiteContent(newContent),
    resetToDefault: resetSiteContent
  };
};

const SUBMISSIONS_STORAGE_KEY = 'thecakebake_contact_submissions_v1';

type SubmissionsListener = (submissions: ContactSubmission[]) => void;
const submissionsListeners = new Set<SubmissionsListener>();

const emitSubmissionsChange = (newSubmissions: ContactSubmission[]) => {
  submissionsListeners.forEach(listener => listener(newSubmissions));
};

export const getContactSubmissions = (): ContactSubmission[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
};

export const saveContactSubmissions = (submissions: ContactSubmission[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(submissions));
  emitSubmissionsChange(submissions);
};

export const addContactSubmission = (submission: Omit<ContactSubmission, 'id' | 'submittedAt' | 'status'>) => {
  const submissions = getContactSubmissions();
  const newSubmission: ContactSubmission = {
    ...submission,
    id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    submittedAt: new Date().toLocaleString(),
    status: 'unread',
  };
  const updated = [newSubmission, ...submissions];
  saveContactSubmissions(updated);
};

export const useContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(getContactSubmissions);

  useEffect(() => {
    const handleChange = (newSubmissions: ContactSubmission[]) => {
      setSubmissions(newSubmissions);
    };
    submissionsListeners.add(handleChange);
    return () => {
      submissionsListeners.delete(handleChange);
    };
  }, []);

  const addSubmission = (sub: Omit<ContactSubmission, 'id' | 'submittedAt' | 'status'>) => {
    addContactSubmission(sub);
  };

  const updateSubmissionStatus = (id: string, status: 'unread' | 'read' | 'replied') => {
    const list = getContactSubmissions();
    const updated = list.map(item => (item.id === id ? { ...item, status } : item));
    saveContactSubmissions(updated);
  };

  const deleteSubmission = (id: string) => {
    const list = getContactSubmissions();
    const updated = list.filter(item => item.id !== id);
    saveContactSubmissions(updated);
  };

  const clearAllSubmissions = () => {
    saveContactSubmissions([]);
  };

  return {
    submissions,
    addSubmission,
    updateSubmissionStatus,
    deleteSubmission,
    clearAllSubmissions
  };
};

// Admin authentication shared state
type AuthListener = (isAdmin: boolean) => void;
const authListeners = new Set<AuthListener>();

export const getAdminAuth = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('thecakebake_admin_authenticated') === 'true';
};

export const setAdminAuth = (value: boolean) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('thecakebake_admin_authenticated', String(value));
  authListeners.forEach(listener => listener(value));
};

export const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(getAdminAuth);

  useEffect(() => {
    const handleChange = (newValue: boolean) => {
      setIsAdmin(newValue);
    };
    authListeners.add(handleChange);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'thecakebake_admin_authenticated') {
        setIsAdmin(e.newValue === 'true');
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      authListeners.delete(handleChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return {
    isAdmin,
    loginAdmin: () => setAdminAuth(true),
    logoutAdmin: () => setAdminAuth(false),
  };
};


