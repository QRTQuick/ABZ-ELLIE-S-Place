
import React from 'react';
import { ShoppingCart, Plus, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        
        {/* Modern Badges */}
        <div className="absolute top-5 left-5 flex flex-col space-y-2">
          {product.isNew && (
            <span className="bg-blue-600/90 backdrop-blur-md text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">New Arrival</span>
          )}
          {product.isFeatured && (
            <span className="bg-yellow-400/90 backdrop-blur-md text-slate-900 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center">
              <Sparkles size={10} className="mr-1" /> Best Seller
            </span>
          )}
        </div>

        {/* Action Tray */}
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center space-x-3">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-white text-slate-900 rounded-full shadow-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
          >
            <Heart size={20} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAddToCart(product)}
            className="w-12 h-12 animated-gradient-bg text-white rounded-full shadow-xl flex items-center justify-center"
          >
            <Plus size={20} />
          </motion.button>
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">{product.category}</p>
          <div className="h-[1px] flex-1 mx-4 bg-slate-100"></div>
          <p className="text-lg font-serif font-bold text-slate-900">₦{product.price.toLocaleString()}</p>
        </div>
        <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{product.name}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-8 flex-1 leading-relaxed">{product.description}</p>
        
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToCart(product)}
          className="w-full py-4 px-6 bg-slate-900 text-white font-bold rounded-2xl flex items-center justify-center space-x-3 hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/20"
        >
          <ShoppingCart size={18} />
          <span className="uppercase text-xs tracking-widest">Secure Order</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
