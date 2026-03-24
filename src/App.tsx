/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Star, 
  CheckCircle, 
  Truck, 
  ShieldCheck, 
  Flame, 
  ArrowRight, 
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  ChevronRight,
  Clock,
  Zap,
  Package,
  CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem, Testimonial } from './types';
import { PRODUCTS, TESTIMONIALS, FAQ } from './constants';

// --- Components ---

const Navbar = ({ cartCount, onOpenCart, onNavigate }: { cartCount: number, onOpenCart: () => void, onNavigate: (page: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-bg/90 backdrop-blur-md border-b border-dark-border py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-10 h-10 bg-neon-green rounded-lg flex items-center justify-center neon-glow-green">
            <Zap className="text-black fill-current" size={24} />
          </div>
          <span className="text-2xl font-display tracking-tighter italic">IRON CORE</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest">
          <button onClick={() => onNavigate('home')} className="hover:text-neon-green transition-colors">Home</button>
          <button onClick={() => onNavigate('shop')} className="hover:text-neon-green transition-colors">Shop All</button>
          <button onClick={() => onNavigate('category:steroids')} className="hover:text-neon-green transition-colors">Steroids</button>
          <button onClick={() => onNavigate('category:protein')} className="hover:text-neon-green transition-colors">Protein</button>
          <button onClick={() => onNavigate('category:fat-burners')} className="hover:text-neon-green transition-colors">Fat Burners</button>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={onOpenCart} className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-neon-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full neon-glow-red">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 bg-dark-bg z-[60] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-display italic">IRON CORE</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-8 text-3xl font-display uppercase">
              <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="text-left hover:text-neon-green transition-colors">Home</button>
              <button onClick={() => { onNavigate('shop'); setIsMobileMenuOpen(false); }} className="text-left hover:text-neon-green transition-colors">Shop All</button>
              <button onClick={() => { onNavigate('category:steroids'); setIsMobileMenuOpen(false); }} className="text-left hover:text-neon-green transition-colors">Steroids</button>
              <button onClick={() => { onNavigate('category:protein'); setIsMobileMenuOpen(false); }} className="text-left hover:text-neon-green transition-colors">Protein</button>
              <button onClick={() => { onNavigate('category:fat-burners'); setIsMobileMenuOpen(false); }} className="text-left hover:text-neon-green transition-colors">Fat Burners</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProductCard = ({ product, onAddToCart, onNavigate }: { 
  product: Product, 
  onAddToCart: (p: Product) => void, 
  onNavigate: (id: string) => void,
  key?: string
}) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-dark-surface border border-dark-border rounded-2xl overflow-hidden group relative"
    >
      {product.isBestSeller && (
        <div className="absolute top-4 left-4 z-10 bg-neon-green text-black text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">
          Best Seller
        </div>
      )}
      <div className="aspect-square overflow-hidden cursor-pointer" onClick={() => onNavigate(`product:${product.id}`)}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-display tracking-tight group-hover:text-neon-green transition-colors cursor-pointer" onClick={() => onNavigate(`product:${product.id}`)}>
            {product.name}
          </h3>
          <div className="flex items-center gap-1 text-neon-green">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>
        <p className="text-gray-400 text-xs mb-4 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-display text-white">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-white text-black hover:bg-neon-green transition-colors p-3 rounded-xl font-bold"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
        
        {product.stock < 10 && (
          <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-neon-red uppercase">
            <Clock size={12} />
            Only {product.stock} Left in Stock
          </div>
        )}
      </div>
    </motion.div>
  );
};

const CartDrawer = ({ isOpen, onClose, items, onUpdateQty, onRemove, onCheckout }: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[], 
  onUpdateQty: (id: string, delta: number) => void,
  onRemove: (id: string) => void,
  onCheckout: () => void
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-dark-bg border-l border-dark-border z-[80] flex flex-col"
          >
            <div className="p-6 border-b border-dark-border flex justify-between items-center">
              <h2 className="text-2xl font-display italic">Your Arsenal</h2>
              <button onClick={onClose}><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingCart size={64} className="mb-4" />
                  <p className="text-xl font-display uppercase">Empty Arsenal</p>
                  <button onClick={onClose} className="mt-4 text-neon-green font-bold underline">Go Shop Now</button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-display text-sm uppercase">{item.name}</h4>
                        <button onClick={() => onRemove(item.id)} className="text-gray-500 hover:text-neon-red"><Trash2 size={16} /></button>
                      </div>
                      <p className="text-neon-green font-bold text-sm mb-3">${item.price}</p>
                      <div className="flex items-center gap-3">
                        <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 border border-dark-border rounded hover:bg-white/10"><Minus size={12} /></button>
                        <span className="text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 border border-dark-border rounded hover:bg-white/10"><Plus size={12} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-dark-border bg-dark-surface/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400 uppercase text-xs font-bold tracking-widest">Total Value</span>
                  <span className="text-3xl font-display text-neon-green">${total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-neon-green text-black py-4 rounded-xl font-display text-xl italic hover:scale-[1.02] transition-transform neon-glow-green flex items-center justify-center gap-2"
                >
                  Deploy Arsenal <ChevronRight size={24} />
                </button>
                <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-widest">Secure Checkout • Fast Shipping • Discreet Packaging</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 45, s: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-2">
      {[timeLeft.h, timeLeft.m, timeLeft.s].map((val, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="bg-neon-red text-white font-display text-xl w-10 h-10 flex items-center justify-center rounded neon-glow-red">
            {val.toString().padStart(2, '0')}
          </div>
        </div>
      ))}
    </div>
  );
};

const SocialProof = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSale, setCurrentSale] = useState({ name: 'James from London', product: 'TESTO-CORE 500' });

  useEffect(() => {
    const show = () => {
      const names = ['Mike from NY', 'Chris from Berlin', 'David from Sydney', 'Alex from Paris'];
      const products = ['SHRED-X FAT BURNER', 'TESTO-CORE 500', 'WHEY-ISO PRO', 'ANABOL-MAX 50'];
      setCurrentSale({
        name: names[Math.floor(Math.random() * names.length)],
        product: products[Math.floor(Math.random() * products.length)]
      });
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 5000);
    };

    const interval = setInterval(show, 15000);
    setTimeout(show, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="fixed bottom-6 left-6 z-[100] bg-dark-surface border border-dark-border p-4 rounded-2xl flex items-center gap-4 shadow-2xl max-w-xs"
        >
          <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center text-neon-green">
            <Package size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">New Order Verified</p>
            <p className="text-sm font-bold"><span className="text-neon-green">{currentSale.name}</span> just bought <span className="italic">{currentSale.product}</span></p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Pages ---

const HomePage = ({ onAddToCart, onNavigate }: { onAddToCart: (p: Product) => void, onNavigate: (id: string) => void }) => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/gym/1920/1080?grayscale" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/80 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/20 px-4 py-2 rounded-full text-neon-green text-xs font-black uppercase tracking-widest mb-6">
              <Flame size={16} /> Elite Performance Only
            </div>
            <h1 className="text-6xl md:text-8xl font-display italic leading-[0.9] mb-6">
              BUILD MUSCLE <span className="text-neon-green">FASTER.</span><br />
              BURN FAT <span className="text-neon-red">HARDER.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-lg">
              The world's most powerful performance enhancers. Engineered for those who refuse to be average. 
              Real results. Zero excuses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate('shop')}
                className="bg-neon-green text-black px-10 py-5 rounded-xl font-display text-2xl italic hover:scale-105 transition-transform neon-glow-green flex items-center justify-center gap-2"
              >
                Shop The Arsenal <ArrowRight size={24} />
              </button>
              <div className="flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-dark-bg" referrerPolicy="no-referrer" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-neon-green">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest">12k+ Elite Athletes</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y border-dark-border bg-dark-surface/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <Truck />, title: 'Fast Shipping', desc: 'Discreet 48h Delivery' },
            { icon: <ShieldCheck />, title: '100% Authentic', desc: 'Lab Tested Quality' },
            { icon: <CreditCard />, title: 'Secure Payment', desc: 'SSL Encrypted' },
            { icon: <Package />, title: 'Discreet', desc: 'No Brand Markings' },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="text-neon-green">{badge.icon}</div>
              <div>
                <h4 className="font-display text-sm tracking-tight">{badge.title}</h4>
                <p className="text-[10px] text-gray-500 uppercase font-bold">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-5xl font-display italic mb-2">Best Sellers</h2>
            <p className="text-gray-400 uppercase text-xs font-bold tracking-[0.2em]">The most deployed gear this month</p>
          </div>
          <button onClick={() => onNavigate('shop')} className="hidden md:flex items-center gap-2 text-neon-green font-bold uppercase text-sm hover:gap-4 transition-all">
            View All Products <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.filter(p => p.isBestSeller).map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      {/* Transformations */}
      <section className="py-24 bg-dark-surface/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display italic mb-4">REAL RESULTS. NO BULLSHIT.</h2>
            <p className="text-gray-400 max-w-xl mx-auto">See the elite transformations achieved by our athletes using IRON CORE protocols.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="bg-dark-bg border border-dark-border p-8 rounded-3xl">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="relative">
                    <img src={t.beforeImage} alt="Before" className="w-full aspect-[4/5] object-cover rounded-xl grayscale" referrerPolicy="no-referrer" />
                    <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-1 text-[10px] font-bold uppercase rounded">Before</div>
                  </div>
                  <div className="relative">
                    <img src={t.afterImage} alt="After" className="w-full aspect-[4/5] object-cover rounded-xl" referrerPolicy="no-referrer" />
                    <div className="absolute bottom-2 left-2 bg-neon-green text-black px-2 py-1 text-[10px] font-bold uppercase rounded">After</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-neon-green mb-4">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-xl italic font-semibold mb-6">"{t.quote}"</p>
                <div className="flex justify-between items-center">
                  <span className="font-display text-lg">{t.name}</span>
                  <span className="bg-neon-green/10 text-neon-green px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">{t.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-display italic text-center mb-12">Intelligence Report (FAQ)</h2>
        <div className="space-y-4">
          {FAQ.map((item, i) => (
            <div key={i} className="bg-dark-surface border border-dark-border p-6 rounded-2xl">
              <h4 className="font-display text-lg mb-2 flex items-center gap-3">
                <span className="text-neon-green">Q:</span> {item.question}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                <span className="text-neon-red font-bold">A:</span> {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ShopPage = ({ category, onAddToCart, onNavigate }: { category?: string, onAddToCart: (p: Product) => void, onNavigate: (id: string) => void }) => {
  const filteredProducts = category ? PRODUCTS.filter(p => p.category === category) : PRODUCTS;
  
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      <div className="mb-12">
        <h1 className="text-6xl font-display italic mb-4">
          {category ? category.replace('-', ' ') : 'The Arsenal'}
        </h1>
        <div className="flex flex-wrap gap-4">
          <button onClick={() => onNavigate('shop')} className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${!category ? 'bg-neon-green text-black' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>All Gear</button>
          <button onClick={() => onNavigate('category:steroids')} className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${category === 'steroids' ? 'bg-neon-green text-black' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>Steroids</button>
          <button onClick={() => onNavigate('category:protein')} className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${category === 'protein' ? 'bg-neon-green text-black' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>Protein</button>
          <button onClick={() => onNavigate('category:fat-burners')} className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${category === 'fat-burners' ? 'bg-neon-green text-black' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>Fat Burners</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
};

const ProductDetailPage = ({ id, onAddToCart, onNavigate }: { id: string, onAddToCart: (p: Product) => void, onNavigate: (id: string) => void }) => {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return <div>Product not found</div>;

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      <button onClick={() => window.history.back()} className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors uppercase text-xs font-bold">
        <ArrowLeft size={16} /> Back to Arsenal
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-6">
          <div className="aspect-square rounded-3xl overflow-hidden bg-dark-surface border border-dark-border">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden border border-dark-border opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                <img src={product.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 text-neon-green">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <span className="text-sm font-bold text-gray-400">({product.reviewsCount} Verified Reviews)</span>
          </div>
          
          <h1 className="text-6xl font-display italic mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl font-display text-neon-green">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
            )}
            <span className="bg-neon-red/10 text-neon-red px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">Save ${ (product.originalPrice! - product.price).toFixed(2) }</span>
          </div>
          
          <div className="bg-dark-surface border border-dark-border p-6 rounded-2xl mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-neon-red font-bold uppercase text-xs">
                <Clock size={16} /> Flash Sale Ends In:
              </div>
              <CountdownTimer />
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-neon-red h-full w-[85%]" />
            </div>
            <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">85% of stock claimed. Only {product.stock} units remain.</p>
          </div>
          
          <p className="text-gray-400 mb-8 text-lg leading-relaxed">{product.description}</p>
          
          <div className="space-y-4 mb-10">
            <h4 className="font-display text-xl italic">Key Benefits:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-bold">
                  <CheckCircle size={18} className="text-neon-green flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          </div>
          
          <div className="sticky bottom-6 lg:static z-40">
            <button 
              onClick={() => onAddToCart(product)}
              className="w-full bg-neon-green text-black py-6 rounded-2xl font-display text-2xl italic hover:scale-[1.02] transition-transform neon-glow-green flex items-center justify-center gap-3"
            >
              Add to Arsenal <ShoppingCart size={28} />
            </button>
          </div>
          
          <div className="mt-12 space-y-6">
            <div className="border-t border-dark-border pt-8">
              <h4 className="font-display text-xl italic mb-4">Usage Protocol:</h4>
              <p className="text-gray-400 text-sm italic border-l-2 border-neon-green pl-4">{product.usage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = ({ items, onComplete }: { items: CartItem[], onComplete: () => void }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [formData, setFormData] = useState({ name: '', email: '', address: '', phone: '' });

  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-4">
      <h1 className="text-5xl font-display italic mb-12 text-center">Final Deployment</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="bg-dark-surface border border-dark-border p-8 rounded-3xl">
            <h3 className="text-2xl font-display italic mb-6 flex items-center gap-3">
              <Package className="text-neon-green" /> Shipping Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 focus:border-neon-green outline-none transition-colors"
                  placeholder="John 'The Beast' Doe"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 focus:border-neon-green outline-none transition-colors"
                  placeholder="john@muscle.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Delivery Address</label>
                <textarea 
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 focus:border-neon-green outline-none transition-colors h-24"
                  placeholder="123 Gains Street, Fitness City"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-3 focus:border-neon-green outline-none transition-colors"
                  placeholder="+1 234 567 890"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>
          
          <div className="bg-dark-surface border border-dark-border p-8 rounded-3xl">
            <h3 className="text-2xl font-display italic mb-6 flex items-center gap-3">
              <CreditCard className="text-neon-green" /> Payment Method
            </h3>
            <div className="p-4 border-2 border-neon-green bg-neon-green/5 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-4 border-neon-green" />
                <span className="font-bold">Cash on Delivery (COD)</span>
              </div>
              <span className="text-[10px] font-black bg-neon-green text-black px-2 py-1 rounded uppercase">Recommended</span>
            </div>
            <p className="text-xs text-gray-500 mt-4">Pay when your package arrives at your doorstep. Maximum security.</p>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="bg-dark-surface border border-dark-border p-8 rounded-3xl sticky top-32">
            <h3 className="text-2xl font-display italic mb-6">Order Summary</h3>
            <div className="space-y-4 mb-8">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{item.quantity}x {item.name}</span>
                  <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-dark-border pt-4 flex justify-between items-center">
                <span className="text-gray-400 uppercase text-xs font-bold">Shipping</span>
                <span className="text-neon-green font-bold uppercase">Free</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-xl font-display">Total</span>
                <span className="text-3xl font-display text-neon-green">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={onComplete}
              disabled={!formData.name || !formData.address}
              className="w-full bg-neon-green text-black py-5 rounded-2xl font-display text-2xl italic hover:scale-[1.02] transition-transform neon-glow-green flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100"
            >
              Confirm Order <CheckCircle size={24} />
            </button>
            <div className="mt-6 flex items-center justify-center gap-4 opacity-50">
              <ShieldCheck size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">100% Encrypted & Secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessPage = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  return (
    <div className="pt-32 pb-24 flex flex-col items-center justify-center text-center px-4">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-24 h-24 bg-neon-green rounded-full flex items-center justify-center text-black mb-8 neon-glow-green"
      >
        <CheckCircle size={64} />
      </motion.div>
      <h1 className="text-6xl font-display italic mb-4">ORDER DEPLOYED!</h1>
      <p className="text-xl text-gray-400 max-w-md mb-12">
        Your arsenal is being prepared for dispatch. You will receive a confirmation SMS shortly. Get ready for the gains.
      </p>
      <button 
        onClick={() => onNavigate('home')}
        className="bg-white text-black px-10 py-4 rounded-xl font-display text-2xl italic hover:bg-neon-green transition-colors"
      >
        Back to Base
      </button>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);

  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem('exit_popup_shown')) {
        setShowExitPopup(true);
        localStorage.setItem('exit_popup_shown', 'true');
      }
    };
    document.addEventListener('mouseout', handleMouseOut);
    return () => document.removeEventListener('mouseout', handleMouseOut);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    if (currentPage === 'home') return <HomePage onAddToCart={addToCart} onNavigate={navigate} />;
    if (currentPage === 'shop') return <ShopPage onAddToCart={addToCart} onNavigate={navigate} />;
    if (currentPage.startsWith('category:')) return <ShopPage category={currentPage.split(':')[1]} onAddToCart={addToCart} onNavigate={navigate} />;
    if (currentPage.startsWith('product:')) return <ProductDetailPage id={currentPage.split(':')[1]} onAddToCart={addToCart} onNavigate={navigate} />;
    if (currentPage === 'checkout') return <CheckoutPage items={cart} onComplete={() => { setCart([]); navigate('success'); }} />;
    if (currentPage === 'success') return <SuccessPage onNavigate={navigate} />;
    return <HomePage onAddToCart={addToCart} onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen selection:bg-neon-green selection:text-black">
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
        onNavigate={navigate}
      />
      
      <main>
        {renderPage()}
      </main>

      <footer className="bg-dark-surface border-t border-dark-border py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-neon-green rounded-lg flex items-center justify-center">
                <Zap className="text-black fill-current" size={24} />
              </div>
              <span className="text-3xl font-display italic">IRON CORE</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-8">
              The elite source for performance enhancement and high-grade supplements. 
              We don't just build bodies; we build machines.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Twitter', 'Telegram'].map(social => (
                <a key={social} href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-neon-green hover:text-black transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current rounded-sm opacity-20" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-display text-xl mb-6">The Arsenal</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-bold uppercase tracking-widest">
              <li><button onClick={() => navigate('category:steroids')} className="hover:text-neon-green transition-colors">Steroids</button></li>
              <li><button onClick={() => navigate('category:protein')} className="hover:text-neon-green transition-colors">Protein</button></li>
              <li><button onClick={() => navigate('category:fat-burners')} className="hover:text-neon-green transition-colors">Fat Burners</button></li>
              <li><button onClick={() => navigate('shop')} className="hover:text-neon-green transition-colors">New Arrivals</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-xl mb-6">Support</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-bold uppercase tracking-widest">
              <li><a href="#" className="hover:text-neon-green transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-neon-green transition-colors">Authenticity Check</a></li>
              <li><a href="#" className="hover:text-neon-green transition-colors">Contact Intel</a></li>
              <li><a href="#" className="hover:text-neon-green transition-colors">Privacy Protocol</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-24 pt-8 border-t border-dark-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">© 2024 IRON CORE PERFORMANCE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 opacity-30 grayscale">
            <div className="w-12 h-8 bg-white rounded" />
            <div className="w-12 h-8 bg-white rounded" />
            <div className="w-12 h-8 bg-white rounded" />
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onCheckout={() => { setIsCartOpen(false); navigate('checkout'); }}
      />

      <SocialProof />

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExitPopup(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-dark-surface border-2 border-neon-green p-12 rounded-3xl max-w-2xl text-center neon-glow-green"
            >
              <button onClick={() => setShowExitPopup(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={32} /></button>
              <h2 className="text-7xl font-display italic mb-4 leading-none">WAIT! DON'T LEAVE <span className="text-neon-green">WEAK.</span></h2>
              <p className="text-2xl text-gray-400 mb-8">Get <span className="text-white font-black">15% OFF</span> your first deployment. Use code:</p>
              <div className="bg-dark-bg border-2 border-dashed border-neon-green p-6 rounded-2xl mb-8">
                <span className="text-5xl font-display tracking-widest text-neon-green">IRON15</span>
              </div>
              <button 
                onClick={() => setShowExitPopup(false)}
                className="w-full bg-neon-green text-black py-6 rounded-2xl font-display text-3xl italic hover:scale-105 transition-transform"
              >
                Claim My Gains Now
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
