/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BlogPost, ActivePage } from '../types';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  Plus, 
  Edit2, 
  Trash2, 
  ArrowLeft, 
  Download, 
  Upload, 
  Check, 
  X, 
  RotateCcw, 
  Sparkles, 
  Settings,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Pre-seeded default blogs matching the "Geometric Balance" premium aesthetic
const DEFAULT_POSTS: BlogPost[] = [
  {
    id: 'art-of-wedding-cakes',
    title: 'The Art of Designing Modern Wedding Cakes',
    excerpt: 'From geometric architectural tiers to delicate fresh floral arrangements, discover the latest visual trends in premium bridal cake styling.',
    content: `When it comes to your wedding day, the cake is not just a dessert—it is a breathtaking centerpiece, an artistic expression of your journey, and a focal point of your reception celebration. Modern wedding cake design has shifted beautifully from traditional heavy royal icings to sleek, contemporary masterpieces.

### 1. Architectural Geometry
One of our signature aesthetics at Thecakebake is the fusion of sharp geometric lines with organic elements. Combining round tiers with a singular hexagonal base creates an eye-catching architectural contrast that pairs perfectly with modern venue layouts.

### 2. The Delicate Charm of Fresh Florals
While sugar flowers remain a classic craft, we love incorporating pesticide-free, organic fresh roses, eucalyptus leaves, and baby's breath. Strategically placing these blooms cascading down the side of white chocolate ganache tiers gives a romantic, ethereal vibe.

### 3. Sophisticated Flavor Pairings
Gone are the days of plain fruitcakes. Couples today are choosing complex, gourmet flavor layers:
- **Lavender Lemon Honey**: Light lemon sponge infused with organic lavender syrup and layered with sweet honey buttercream.
- **Earl Grey Blackberry**: Rich, fragrant tea-infused layers balanced by the tart, deep notes of home-cooked blackberry compote.
- **Belgian Chocolate Hazelnut Drip**: Decadent dark chocolate mud cake layered with hazelnut praline mousse and dark chocolate drips.

### 4. Setting up the Masterpiece
A successful wedding cake assembly requires immaculate timing and climate control. Because we bake fresh with pure butter and real cream, we transport our custom multi-tier creations in specialized air-conditioned vans and assemble them live on-site to guarantee perfection right before your guests arrive.`,
    category: 'Event Guide',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=1024&auto=format&fit=crop',
    author: 'Master Pastry Chef, Elena',
    date: 'July 15, 2026',
    readTime: '6 min read',
    views: 142
  },
  {
    id: 'secrets-of-moist-sponge',
    title: '5 Secrets to Baking the Perfect Moist Sponge Cake at Home',
    excerpt: 'Struggling with dry, dense sponges? Our expert pastry chef shares crucial oven temperature, creaming, and ingredient ratio tips.',
    content: `Baking is a beautiful blend of art and precise chemistry. Achieving a light, airy, yet deeply moist sponge cake at home is a milestone for every home baker. If your cakes often turn out dry, dense, or unevenly risen, here are five non-negotiable professional secrets from our bakery kitchen:

### 1. Temperature is Everything
Never use cold butter, eggs, or milk. Ingredients at room temperature (around 21°C / 70°F) form an emulsion easily, trapping air bubbles that expand gracefully during baking. Cold ingredients cause the batter to curdle and result in flat, heavy layers.

### 2. The Creaming Phase Done Right
Creaming butter and sugar is not just about mixing them; it is about physically creating thousands of tiny air pockets. Beat room-temperature unsalted butter with fine caster sugar for at least 5-7 minutes until the mixture turns exceptionally pale, fluffy, and cloud-like.

### 3. Sift Your Dry Ingredients Thrice
Sifting your flour, baking powder, and a pinch of salt aerates the mixture. Sifting it three times ensures the leavening agents are perfectly distributed, preventing localized holes or dense flour pockets in the final sponge.

### 4. Pay Attention to Liquid Ratios
Moisture doesn't just come from liquid. Fat (butter, vegetable oil, sour cream) plays a massive role in lubricating gluten strands. Adding a tablespoon of high-quality organic vegetable oil alongside your butter preserves the cake's tenderness and keeps it fresh and moist for days.

### 5. Stop Peeking into the Oven!
Opening the oven door during the first 25 minutes of baking releases a sudden gust of cool air, dropping the internal pressure and causing your beautifully rising cake to collapse in the center. Trust your timer, and only peek through the glass!`,
    category: 'Baking Tips',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1024&auto=format&fit=crop',
    author: 'Elena Parker',
    date: 'July 12, 2026',
    readTime: '4 min read',
    views: 98
  },
  {
    id: 'delivery-logistics-van',
    title: 'Why We Deliver Our Cakes Exclusively in Temp-Controlled AC Vans',
    excerpt: 'Ever wondered how a 3-tier delicate buttercream cake survives a summer drive? Inside our specialized cold-chain logistics.',
    content: `Designing a spectacular cake is only half the battle; transporting it safely to your celebration venue is where the real stress begins. For custom buttercream and fresh fruit cream cakes, heat and vibration are the absolute enemies.

A delicate custom cake sitting on a standard car seat is highly vulnerable:
- **Car Angle Slopes**: Normal passenger seats slope backward, placing your cake at an unstable 10-degree tilt that can cause layers to slip off.
- **Vibration Destabilization**: Bumps and sudden brakes put immense kinetic pressure on internal cake dowels and structures.
- **Frosting Melting**: In warm weather, premium real-butter buttercream starts softening in less than 15 minutes of non-AC exposure, ruining elaborate pipe work.

### Our Cold-Chain Logistics Solution
To respect your celebration and protect your investment, Thecakebake uses specialized, custom-fitted delivery vans.
- **100% Flat Air-Cushioned Decks**: Our van cabins feature perfectly level, non-slip, shock-absorbent platforms so the cake remains horizontally balanced.
- **Dedicated Temperature Calibration**: We run our AC units on a separate high-output generator, keeping the delivery hold at a precise 16°C (61°F). This keeps the butter molecules firm without drying out the moisture of the sponge inside.
- **Professional Cake Handlers**: Our drivers are trained pastry assistants who understand how to corner smoothly, decelerate slowly, and carry heavy boxes with perfect poise.

When you book with us, you can enjoy absolute peace of mind knowing your cake will arrive in pristine, gallery-worthy condition!`,
    category: 'Behind the Scenes',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1024&auto=format&fit=crop',
    author: 'Logistics Desk',
    date: 'July 8, 2026',
    readTime: '3 min read',
    views: 74
  }
];

export default function BlogSection({ setActivePage }: { setActivePage: (page: ActivePage) => void }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Admin Mode Controls & Password Gate
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formError, setFormError] = useState('');

  const handleToggleAdminMode = () => {
    if (isAdminMode) {
      setIsAdminMode(false);
    } else {
      setShowLoginModal(true);
      setPasswordInput('');
      setLoginError('');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123') {
      setIsAdminMode(true);
      setShowLoginModal(false);
      setLoginError('');
    } else {
      setLoginError('Incorrect password! The default password is admin123.');
    }
  };
  
  // Blog Post Form Fields
  const [formId, setFormId] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCategory, setFormCategory] = useState('Baking Tips');
  const [formImage, setFormImage] = useState('');
  const [formAuthor, setFormAuthor] = useState('Master Pastry Chef');
  const [formReadTime, setFormReadTime] = useState('4 min read');

  // Load posts from localStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('thecakebake-blog-posts');
      if (saved) {
        try {
          setPosts(JSON.parse(saved));
        } catch (e) {
          console.error("Error parsing blog posts", e);
          setPosts(DEFAULT_POSTS);
        }
      } else {
        setPosts(DEFAULT_POSTS);
        localStorage.setItem('thecakebake-blog-posts', JSON.stringify(DEFAULT_POSTS));
      }
    }
  }, []);

  // Sync to localStorage on update
  const savePostsToStorage = (updatedPosts: BlogPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem('thecakebake-blog-posts', JSON.stringify(updatedPosts));
  };

  // Predefined gorgeous Unsplash images for quick selection in Admin Form
  const PRESET_IMAGES = [
    { label: 'Chocolate Drip Cake', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1024&auto=format&fit=crop' },
    { label: 'Bridal Floral Cake', url: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=1024&auto=format&fit=crop' },
    { label: 'Gourmet Cupcakes', url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1024&auto=format&fit=crop' },
    { label: 'Baker Studio Mix', url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1024&auto=format&fit=crop' }
  ];

  // Post view tracker (increment view count)
  const handleSelectPost = (post: BlogPost) => {
    const updated = posts.map(p => p.id === post.id ? { ...p, views: p.views + 1 } : p);
    savePostsToStorage(updated);
    setSelectedPost({ ...post, views: post.views + 1 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Category listing
  const categories = ['All', 'Baking Tips', 'Event Guide', 'Behind the Scenes', 'Recipes'];

  // Filtering logic
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Open Form to Add Post
  const handleOpenAddForm = () => {
    setFormId('');
    setFormTitle('');
    setFormExcerpt('');
    setFormContent('');
    setFormCategory('Baking Tips');
    setFormImage(PRESET_IMAGES[0].url);
    setFormAuthor('Master Pastry Chef');
    setFormReadTime('4 min read');
    setIsEditing(false);
    setFormError('');
    setShowFormModal(true);
  };

  // Open Form to Edit Post
  const handleOpenEditForm = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card select click
    setFormId(post.id);
    setFormTitle(post.title);
    setFormExcerpt(post.excerpt);
    setFormContent(post.content);
    setFormCategory(post.category);
    setFormImage(post.image || PRESET_IMAGES[0].url);
    setFormAuthor(post.author);
    setFormReadTime(post.readTime);
    setIsEditing(true);
    setFormError('');
    setShowFormModal(true);
  };

  // Delete Post
  const handleDeletePost = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this blog post? This action is irreversible.")) {
      const updated = posts.filter(p => p.id !== id);
      savePostsToStorage(updated);
      if (selectedPost && selectedPost.id === id) {
        setSelectedPost(null);
      }
    }
  };

  // Reset to Default Posts
  const handleResetDefaults = () => {
    if (window.confirm("Are you sure you want to reset all blog posts to default demo articles? All custom additions will be lost.")) {
      savePostsToStorage(DEFAULT_POSTS);
      setSelectedPost(null);
    }
  };

  // Save/Create Post Submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formExcerpt.trim() || !formContent.trim()) {
      setFormError('Please fill out Title, Short Excerpt, and Full Content.');
      return;
    }

    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    if (isEditing) {
      // Edit mode
      const updated = posts.map(p => p.id === formId ? {
        ...p,
        title: formTitle,
        excerpt: formExcerpt,
        content: formContent,
        category: formCategory,
        image: formImage || PRESET_IMAGES[0].url,
        author: formAuthor,
        readTime: formReadTime,
      } : p);
      savePostsToStorage(updated);
    } else {
      // Create mode
      const newId = formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || String(Date.now());
      // Check for duplicate id
      if (posts.some(p => p.id === newId)) {
        setFormError('A blog post with this title/URL slug already exists. Please choose a different title.');
        return;
      }

      const newPost: BlogPost = {
        id: newId,
        title: formTitle,
        excerpt: formExcerpt,
        content: formContent,
        category: formCategory,
        image: formImage || PRESET_IMAGES[0].url,
        author: formAuthor,
        date: today,
        readTime: formReadTime,
        views: 1
      };
      savePostsToStorage([newPost, ...posts]);
    }

    setShowFormModal(false);
  };

  // Export Blogs as JSON file
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(posts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `thecakebake_blogs_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import Blogs from JSON file
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].title && parsed[0].content) {
            savePostsToStorage(parsed);
            alert(`Successfully imported ${parsed.length} blog posts!`);
          } else {
            alert("Invalid format! The JSON must be an array of blog posts containing title and content fields.");
          }
        } catch (error) {
          alert("Failed to parse file! Ensure it is a valid JSON file exported from this app.");
        }
      };
    }
  };

  // Custom safe parser for rendering paragraphs and headers within markdown style text
  const renderRichContent = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return null;

      // Render Markdown Headers
      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={index} className="text-xl font-serif font-bold text-[#5D4037] dark:text-zinc-100 mt-6 mb-3 tracking-tight">
            {trimmed.substring(4)}
          </h4>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h3 key={index} className="text-2xl font-serif font-bold text-[#5D4037] dark:text-zinc-100 mt-8 mb-4 tracking-tight border-b border-[#F8BBD0]/20 pb-2">
            {trimmed.substring(3)}
          </h3>
        );
      }
      if (trimmed.startsWith('# ')) {
        return (
          <h2 key={index} className="text-3xl font-serif font-bold text-[#5D4037] dark:text-zinc-100 mt-10 mb-5 tracking-tight">
            {trimmed.substring(2)}
          </h2>
        );
      }

      // Render bullet list
      if (trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map(line => line.replace(/^-\s*/, ''));
        return (
          <ul key={index} className="list-disc pl-6 my-4 space-y-2 text-[#5D4037]/90 dark:text-zinc-300 font-sans">
            {items.map((item, i) => {
              // Simple bold check inside bullets e.g. **bold**: text
              const parts = item.split('**');
              if (parts.length >= 3) {
                return (
                  <li key={i}>
                    <strong>{parts[1]}</strong>
                    {parts.slice(2).join('')}
                  </li>
                );
              }
              return <li key={i}>{item}</li>;
            })}
          </ul>
        );
      }

      // Render blockquotes
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={index} className="border-l-4 border-brand-pink bg-[#FFF8E7]/60 dark:bg-zinc-900/40 p-4 rounded-r-xl italic text-[#5D4037]/80 dark:text-zinc-400 my-6 pl-5 font-sans">
            {trimmed.substring(2).replace(/\*\*/g, '')}
          </blockquote>
        );
      }

      // Render normal paragraph with basic bold parser (**bold text**)
      const boldParts = trimmed.split('**');
      if (boldParts.length >= 3) {
        return (
          <p key={index} className="text-base text-[#5D4037]/90 dark:text-zinc-300 leading-relaxed font-sans mb-4">
            {boldParts.map((chunk, chunkIdx) => {
              return chunkIdx % 2 === 1 ? <strong key={chunkIdx} className="font-semibold text-brand-brown-dark dark:text-zinc-100">{chunk}</strong> : chunk;
            })}
          </p>
        );
      }

      return (
        <p key={index} className="text-base text-[#5D4037]/90 dark:text-zinc-300 leading-relaxed font-sans mb-4">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[85vh]">
      
      {/* 1. Header Banner of Blog */}
      {!selectedPost && (
        <div className="text-center space-y-4 mb-12">
          <div className="inline-block px-4 py-1 bg-[#F8BBD0]/20 text-[#5D4037] dark:text-brand-pink text-xs font-bold rounded-full w-fit tracking-widest font-sans uppercase">
            🍰 Articles & Inspiration
          </div>
          <h1 className="text-4.5xl sm:text-5xl font-serif font-bold text-[#5D4037] dark:text-zinc-100 leading-tight">
            The Bakehouse <span className="text-brand-pink-dark dark:text-brand-pink italic">Journal</span>
          </h1>
          <p className="text-base text-[#5D4037]/75 dark:text-zinc-400 max-w-xl mx-auto font-sans">
            Delicious recipes, artisanal cake decorating tips, corporate event planning insights, and behind-the-scenes diaries from our hygienic home baking laboratory.
          </p>
          
          {/* Quick Management Access Toggle */}
          <div className="flex justify-center gap-3 pt-3">
            <button
              onClick={handleToggleAdminMode}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                isAdminMode 
                  ? 'bg-[#5D4037] text-white border-[#5D4037] shadow-md' 
                  : 'bg-white dark:bg-zinc-900 text-[#5D4037] dark:text-zinc-300 border-[#F8BBD0]/30 hover:border-[#F8BBD0] hover:bg-[#FFF8E7]/30'
              }`}
            >
              <Settings className={`w-3.5 h-3.5 ${isAdminMode ? 'animate-spin-slow' : ''}`} />
              {isAdminMode ? 'Disable Admin Panel' : 'Enable Admin Panel'}
            </button>
            
            {isAdminMode && (
              <div className="flex gap-2">
                <button
                  onClick={handleOpenAddForm}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Write Post
                </button>
                <button
                  onClick={handleExportJSON}
                  title="Download blogs JSON backup"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  Backup
                </button>
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-600 text-white hover:bg-amber-700 text-xs font-bold shadow-xs cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  Restore
                  <input 
                    type="file" 
                    accept=".json" 
                    onChange={handleImportJSON} 
                    className="hidden" 
                  />
                </label>
                <button
                  onClick={handleResetDefaults}
                  title="Reset to original posts"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/90 text-white hover:bg-red-700 text-xs font-bold shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Detailed Single Blog Reader View */}
      {selectedPost ? (
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          {/* Back Action Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-[#F8BBD0]/10">
            <button
              onClick={() => setSelectedPost(null)}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[#5D4037]/80 dark:text-zinc-300 hover:text-brand-pink-dark dark:hover:text-brand-pink transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Journal
            </button>
            
            <div className="flex items-center gap-4 text-xs font-medium text-[#5D4037]/60 dark:text-zinc-400">
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {selectedPost.views} views</span>
              <span>ID: {selectedPost.id}</span>
            </div>
          </div>

          {/* Heading Metadata */}
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-pink text-[#5D4037] text-xs font-bold">
              {selectedPost.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#5D4037] dark:text-zinc-100 tracking-tight leading-[1.15]">
              {selectedPost.title}
            </h1>
            
            {/* Author Profile and Date */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-2 text-sm text-[#5D4037]/70 dark:text-zinc-400 border-t border-b border-[#F8BBD0]/10 py-3 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#F8BBD0]/40 flex items-center justify-center text-xs text-[#5D4037] font-bold">
                  {selectedPost.author.charAt(0)}
                </div>
                <span>By {selectedPost.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-pink-dark" />
                <span>{selectedPost.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-pink-dark" />
                <span>{selectedPost.readTime}</span>
              </div>
            </div>
          </div>

          {/* Featured Large Image */}
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-zinc-800 z-10">
            <img 
              src={selectedPost.image} 
              alt={selectedPost.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Post Rich Content Body */}
          <div className="prose prose-stone dark:prose-invert max-w-none pt-4">
            {renderRichContent(selectedPost.content)}
          </div>

          {/* Call-to-action banner underneath post */}
          <div className="bg-gradient-to-br from-[#FFF8E7] to-[#F8BBD0]/10 dark:from-zinc-900/30 dark:to-zinc-900/10 rounded-3xl p-8 border border-[#F8BBD0]/20 flex flex-col md:flex-row items-center justify-between gap-6 mt-16 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#F8BBD0]/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="space-y-2 text-left">
              <h4 className="font-serif text-xl font-bold text-[#5D4037] dark:text-zinc-100">
                Inspired by our Baking Journal?
              </h4>
              <p className="text-sm text-[#5D4037]/75 dark:text-zinc-400 max-w-md">
                Bring your dream celebration cake to life. Place a customized order directly through WhatsApp today.
              </p>
            </div>
            <button
              onClick={() => setActivePage('order')}
              className="px-6 py-3.5 rounded-full bg-[#5D4037] hover:bg-brand-brown-dark text-white font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              Order This Cake Theme
            </button>
          </div>
        </motion.article>
      ) : (
        // 3. Grid List of All Blogs
        <div className="space-y-10">
          
          {/* Controls Bar: Categories & Search */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-6 border-b border-[#F8BBD0]/15">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    selectedCategory === cat
                      ? 'bg-brand-pink text-[#5D4037] border-brand-pink shadow-xs font-semibold'
                      : 'bg-white/50 dark:bg-zinc-900/40 text-[#5D4037]/70 dark:text-zinc-300 border-[#F8BBD0]/10 hover:border-[#F8BBD0]/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search filter input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-brand-pink/20 dark:border-zinc-700 bg-white/70 dark:bg-zinc-800 text-sm focus:outline-hidden focus:ring-1 focus:ring-brand-pink text-[#5D4037] dark:text-zinc-200"
              />
              <Search className="w-4 h-4 text-[#5D4037]/50 dark:text-zinc-400 absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3.5 text-xs text-brand-pink-dark hover:text-[#5D4037]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Grid Layout */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-[#FFF8E7] dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto text-3xl">📭</div>
              <p className="text-base text-[#5D4037]/70 dark:text-zinc-400">No blog posts found matching your search parameters.</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="px-5 py-2 rounded-full bg-brand-pink/20 text-[#5D4037] font-bold text-xs uppercase"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <motion.div
                  key={post.id}
                  layoutId={`post-container-${post.id}`}
                  onClick={() => handleSelectPost(post)}
                  className="group bg-white/60 dark:bg-zinc-900/35 rounded-3xl overflow-hidden border border-[#F8BBD0]/15 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-brand-pink-dark/35 transition-all duration-300 flex flex-col cursor-pointer relative"
                >
                  {/* Category overlay label */}
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-[#FFF8E7] text-[#5D4037] rounded-full shadow-md border border-[#F8BBD0]/30">
                    {post.category}
                  </span>

                  {/* Admin Post Actions overlay */}
                  {isAdminMode && (
                    <div className="absolute top-4 right-4 z-10 flex gap-1">
                      <button
                        onClick={(e) => handleOpenEditForm(post, e)}
                        className="p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 hover:scale-110 transition-all cursor-pointer"
                        title="Edit post"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDeletePost(post.id, e)}
                        className="p-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 hover:scale-110 transition-all cursor-pointer"
                        title="Delete post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Image container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Text Information card */}
                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Date & Read time */}
                      <div className="flex items-center gap-4 text-xs font-semibold text-[#5D4037]/65 dark:text-zinc-400 font-sans">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-brand-pink-dark" /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-brand-pink-dark" /> {post.readTime}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-serif font-bold text-[#5D4037] dark:text-zinc-100 line-clamp-2 leading-snug group-hover:text-brand-pink-dark dark:group-hover:text-brand-pink transition-colors">
                        {post.title}
                      </h3>

                      {/* Short excerpt description */}
                      <p className="text-sm text-[#5D4037]/75 dark:text-zinc-400 line-clamp-3 font-sans leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Bottom Bar: read counter & read link */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#F8BBD0]/10 text-xs font-semibold">
                      <span className="text-[#5D4037]/50 dark:text-zinc-500 flex items-center gap-1 font-sans">
                        <Eye className="w-3 h-3" /> {post.views} views
                      </span>
                      <span className="text-brand-pink-dark dark:text-brand-pink font-bold flex items-center gap-1 uppercase tracking-wider group-hover:translate-x-1.5 transition-transform">
                        Read Article &rarr;
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. Overlay Admin Form Modal Dialog for Writing/Editing Posts */}
      <AnimatePresence>
        {showFormModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-[#F8BBD0]/30 text-left space-y-6 relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F8BBD0]/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-pink/30 flex items-center justify-center text-[#5D4037]">
                    <Sparkles className="w-4 h-4 text-brand-pink-dark" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#5D4037] dark:text-zinc-100">
                    {isEditing ? 'Edit Bakehouse Post' : 'Compose New Post'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-zinc-800 text-neutral-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Error Warning */}
              {formError && (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/20 border border-red-500/20 text-red-700 dark:text-red-400 rounded-xl text-xs flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Form Content */}
              <form onSubmit={handleFormSubmit} className="space-y-5">
                
                {/* 1. Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037]/70 dark:text-zinc-300">
                    Article Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Baking Secrets of Real Buttercream"
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-pink/20 dark:border-zinc-700 bg-transparent text-[#5D4037] dark:text-zinc-100 focus:ring-1 focus:ring-brand-pink"
                  />
                </div>

                {/* 2. Short Excerpt */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037]/70 dark:text-zinc-300">
                    Short Excerpt
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Brief description showing on the grid (1-2 sentences)"
                    value={formExcerpt}
                    onChange={e => setFormExcerpt(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-pink/20 dark:border-zinc-700 bg-transparent text-[#5D4037] dark:text-zinc-100 focus:ring-1 focus:ring-brand-pink"
                  />
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Category select */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037]/70 dark:text-zinc-300">
                      Category
                    </label>
                    <select
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-pink/20 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[#5D4037] dark:text-zinc-100"
                    >
                      <option value="Baking Tips">Baking Tips</option>
                      <option value="Event Guide">Event Guide</option>
                      <option value="Behind the Scenes">Behind the Scenes</option>
                      <option value="Recipes">Recipes</option>
                    </select>
                  </div>

                  {/* Author input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037]/70 dark:text-zinc-300">
                      Author Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formAuthor}
                      onChange={e => setFormAuthor(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-pink/20 dark:border-zinc-700 bg-transparent text-[#5D4037] dark:text-zinc-100"
                    />
                  </div>

                  {/* Read time */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037]/70 dark:text-zinc-300">
                      Read Time estimate
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5 min read"
                      value={formReadTime}
                      onChange={e => setFormReadTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-pink/20 dark:border-zinc-700 bg-transparent text-[#5D4037] dark:text-zinc-100"
                    />
                  </div>
                </div>

                {/* 3. Image Selector URL */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037]/70 dark:text-zinc-300">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={formImage}
                    onChange={e => setFormImage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-pink/20 dark:border-zinc-700 bg-transparent text-[#5D4037] dark:text-zinc-100 font-mono text-xs"
                  />
                  
                  {/* Preset Unsplash quick picks */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">Quick Preset Image Options:</span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {PRESET_IMAGES.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setFormImage(img.url)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                            formImage === img.url 
                              ? 'bg-brand-pink text-brand-brown border-brand-pink-dark' 
                              : 'bg-[#FFF8E7]/40 text-neutral-500 border-neutral-200'
                          }`}
                        >
                          {img.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Full Markdown Content */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#5D4037]/70 dark:text-zinc-300">
                      Article Body (Markdown Content)
                    </label>
                    <span className="text-[10px] text-[#5D4037]/50 flex items-center gap-1"><HelpCircle className="w-3 h-3" /> Supports # H1, ## H2, ### H3, - Bullets, &gt; Blockquotes</span>
                  </div>
                  <textarea
                    required
                    rows={9}
                    placeholder={`Write your article text here. Separate paragraphs with a blank line. For list formatting:
- First bullet item
- Second bullet item

Use ### Header to add subheaders inside.`}
                    value={formContent}
                    onChange={e => setFormContent(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-pink/20 dark:border-zinc-700 bg-transparent text-[#5D4037] dark:text-zinc-100 font-sans text-sm leading-relaxed"
                  />
                </div>

                {/* Form Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-[#F8BBD0]/10">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="px-5 py-2.5 rounded-full border border-neutral-200 hover:bg-neutral-50 text-neutral-500 text-xs font-bold uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#5D4037] hover:bg-brand-brown-dark text-white text-xs font-bold uppercase tracking-widest shadow-md flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    {isEditing ? 'Save Changes' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showLoginModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-sm p-6 md:p-8 shadow-2xl border border-[#F8BBD0]/30 text-left space-y-5 relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F8BBD0]/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-pink/30 flex items-center justify-center text-[#5D4037]">
                    <Settings className="w-4 h-4 text-brand-pink-dark animate-spin-slow" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#5D4037] dark:text-zinc-100">
                    Admin Portal
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-zinc-800 text-neutral-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Informative text */}
              <p className="text-xs text-[#5D4037]/70 dark:text-zinc-400 font-sans leading-relaxed">
                Enter your administrative passphrase to unlock writing, editing, backup, and deletion controls.
              </p>

              {/* Error Warning */}
              {loginError && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-500/20 text-red-700 dark:text-red-400 rounded-xl text-xs flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Password Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#5D4037]/75 dark:text-zinc-300">
                    Passphrase
                  </label>
                  <input
                    type="password"
                    required
                    autoFocus
                    placeholder="e.g. admin123"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-pink/20 dark:border-zinc-700 bg-transparent text-[#5D4037] dark:text-zinc-100 focus:ring-1 focus:ring-brand-pink text-sm"
                  />
                  <span className="text-[9px] text-neutral-400 block pt-0.5">
                    Hint: Use the default passcode <code className="bg-neutral-100 dark:bg-zinc-800 px-1 py-0.5 rounded font-mono font-bold text-brand-pink-dark">admin123</code> to access.
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2.5 pt-2 border-t border-[#F8BBD0]/10">
                  <button
                    type="button"
                    onClick={() => setShowLoginModal(false)}
                    className="px-4 py-2 rounded-full border border-neutral-200 dark:border-zinc-700 hover:bg-neutral-50 dark:hover:bg-zinc-800 text-neutral-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#5D4037] hover:bg-brand-brown-dark text-white text-xs font-bold uppercase tracking-widest shadow-md flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Authorize
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
