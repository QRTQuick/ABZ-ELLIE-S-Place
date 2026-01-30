import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './Hero';
import ProductCard from './ProductCard';
import SEOHead from './SEOHead';
import { MOCK_PRODUCTS } from '../constants';
import { Product, CartItem, Category } from '../types';
import { ShoppingBag, ArrowRight, Sparkles, Phone, ShieldCheck } from 'lucide-react';

interface HomeProps {
  cart: CartItem[];
  addToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ cart, addToCart }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  const categories: (Category | 'All')[] = ['All', 'Jewelry', 'Perfumes', 'Couple Items', 'Lipglosses'];
  
  const filteredProducts = activeCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <main>
      <SEOHead 
        title="ABZ&ELLIE'S Place | Premium Perfumes, Jewelry & Beauty Products Nigeria"
        description="Discover authentic perfumes, elegant jewelry, couple items, and beauty products at ABZ&ELLIE'S Place. Premium quality, fast delivery across Nigeria."
        url="https://abz-ellie-s-place.vercel.app/"
      />
      <Hero />

      {/* Curated Shop */}
      <section id="shop" className="py-32 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 space-y-10 md:space-y-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-5xl font-serif font-bold text-slate-900 tracking-tight">Our Curated Shop</h2>
            <p className="text-slate-400 uppercase tracking-[0.3em] text-[10px] font-bold flex items-center">
              <ShieldCheck size={14} className="mr-2 text-blue-600" /> Authenticity Guaranteed
            </p>
          </motion.div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                    : 'bg-slate-50 text-slate-400 border border-slate-100 hover:text-slate-900 hover:bg-white'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Spectrum Promo Section */}
      <section className="py-32 animated-gradient-bg text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <span className="inline-block px-5 py-2 bg-white/20 backdrop-blur-md rounded-full font-bold text-[10px] uppercase tracking-[0.3em]">Special Gift Edition</span>
              <h2 className="text-6xl md:text-7xl font-serif font-bold leading-[1.1]">The Bond <br /> Collection</h2>
              <p className="text-xl text-white/80 max-w-md font-light leading-relaxed">
                Celebrate your unique connection with our matching sets. Designed to sparkle together, just like you.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                className="px-12 py-5 border-2 border-white text-white rounded-2xl font-bold flex items-center justify-center transition-all shadow-2xl"
              >
                View Couple Items <ArrowRight className="ml-2" />
              </motion.button>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6 rotate-3">
              <motion.img 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=300" 
                className="rounded-3xl shadow-3xl w-full aspect-square object-cover" 
              />
              <motion.img 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=300" 
                className="rounded-3xl shadow-3xl w-full aspect-[3/4] object-cover mt-12" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section id="about" className="py-32 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-3 gap-16">
          {[
            { icon: <Sparkles />, title: "Premium Origin", desc: "Every bottle and piece is verified for 100% authenticity and quality." },
            { icon: <ShoppingBag />, title: "Gift Couture", desc: "Complimentary luxury packaging with every purchase. Ready to delight." },
            { icon: <Phone />, title: "Stylist Support", desc: "Lux, our AI, and our human experts are available 24/7 for you." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-slate-50 rounded-[2.5rem] border border-white hover:border-blue-100 transition-all text-center"
            >
              <div className="w-20 h-20 animated-gradient-bg text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 32 })}
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-slate-900">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;