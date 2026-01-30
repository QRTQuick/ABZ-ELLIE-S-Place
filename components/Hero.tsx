
import React from 'react';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-24 overflow-hidden bg-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-10 animated-gradient-bg -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10 relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200 shadow-sm"
          >
            <Sparkles size={16} className="text-yellow-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Pure Elegance, Affordable Luxury</span>
          </motion.div>
          
          <h2 className="text-6xl md:text-8xl font-serif font-bold text-slate-900 leading-[1.05] tracking-tight">
            Elevate Your <br />
            <span className="animated-gradient-text italic">Scent & Style</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-light">
            Luxury perfumes, designer jewelry, and beauty essentials curated for the modern individual who refuses to compromise on quality.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#shop" 
              className="px-10 py-5 animated-gradient-bg text-white rounded-2xl font-bold flex items-center justify-center shadow-2xl hover:shadow-blue-500/20 transition-all group"
            >
              Shop Collection
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a 
              whileHover={{ backgroundColor: "#f8fafc" }}
              href="#about" 
              className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold flex items-center justify-center shadow-md"
            >
              Our Vision
            </motion.a>
          </div>

          <div className="flex items-center space-x-12 pt-10 border-t border-slate-100">
            <div>
              <p className="text-4xl font-serif font-bold text-slate-900">12k+</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">Orders Delivered</p>
            </div>
            <div>
              <p className="text-4xl font-serif font-bold text-slate-900">4.9/5</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">Customer Rating</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl z-20 group">
            <img 
              src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=800" 
              alt="Luxury Boutique"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
          </div>
          
          {/* Floating Accents */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 -bottom-8 w-40 h-40 bg-white p-2 rounded-3xl shadow-2xl z-30"
          >
            <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover rounded-2xl" alt="Featured Ring" />
          </motion.div>
          
          <div className="absolute -left-12 top-12 w-24 h-24 bg-yellow-400 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-pulse"></div>
          <div className="absolute -right-12 bottom-12 w-24 h-24 bg-blue-400 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-pulse"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
