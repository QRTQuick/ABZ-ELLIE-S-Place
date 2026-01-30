import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import SEOHead from './SEOHead';
import { MOCK_PRODUCTS } from '../constants';
import { Product, CartItem, Category } from '../types';
import { Filter, Search, ShieldCheck, Star } from 'lucide-react';

interface ShopProps {
  cart: CartItem[];
  addToCart: (product: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ cart, addToCart }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'featured'>('featured');

  const categories: (Category | 'All')[] = ['All', 'Jewelry', 'Perfumes', 'Couple Items', 'Lipglosses'];
  
  let filteredProducts = activeCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  // Apply search filter
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply sorting
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'featured':
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white pt-24">
      <SEOHead 
        title="Shop Premium Products | ABZ&ELLIE'S Place | Perfumes, Jewelry, Beauty Nigeria"
        description="Shop authentic perfumes, elegant jewelry, couple items, and beauty products at ABZ&ELLIE'S Place. Browse our complete collection with prices from ₦21,000 - ₦100,000."
        url="https://abz-ellie-s-place.vercel.app/shop"
        keywords="shop perfumes Nigeria, buy jewelry online, beauty products Nigeria, couple accessories, authentic perfumes, premium jewelry, online shopping"
      />
      {/* Hero Section */}
      <section className="py-20 animated-gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold">Our Shop</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Discover our complete collection of premium products
            </p>
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3">
              <ShieldCheck size={16} className="text-white" />
              <span className="text-sm font-bold">100% Authentic • Free Shipping</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 border-b border-slate-100 sticky top-20 bg-white/90 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center space-x-4">
              <Filter size={20} className="text-slate-400" />
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      activeCategory === category
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              {activeCategory === 'All' ? 'All Products' : activeCategory}
            </h2>
            <p className="text-slate-600 mt-1">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-slate-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-600 mb-6">
              {searchTerm 
                ? `No products match "${searchTerm}". Try a different search term.`
                : 'No products found in this category. Try selecting a different category.'
              }
            </p>
            <motion.button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('All');
              }}
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck />,
                title: "Authenticity Guaranteed",
                description: "Every product is verified for 100% authenticity with certificates where applicable."
              },
              {
                icon: <Star />,
                title: "Premium Quality",
                description: "We source only the finest products from trusted suppliers and brands."
              },
              {
                icon: <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>🚚</motion.div>,
                title: "Fast Delivery",
                description: "Quick and secure delivery across Nigeria with tracking information."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-2xl shadow-sm"
              >
                <div className="w-16 h-16 animated-gradient-bg text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {typeof feature.icon === 'string' ? (
                    <span className="text-2xl">{feature.icon}</span>
                  ) : (
                    React.cloneElement(feature.icon as React.ReactElement<any>, { size: 24 })
                  )}
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;