import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ShoppingBag, MessageCircle, Filter, Grid, List } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import SEOHead from './SEOHead';

interface StockItem {
  id: string;
  name: string;
  category: string;
  priceRange: string;
  image: string;
  description: string;
  availability: 'In Stock' | 'Limited' | 'Pre-Order';
}

const CurrentStock: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);

  // Stock items using the images from pic folder
  const stockItems: StockItem[] = [
    {
      id: '1',
      name: 'Premium Perfume Collection',
      category: 'Perfumes',
      priceRange: '₦25,000 - ₦85,000',
      image: '/pic/WhatsApp Image 2026-01-30 at 2.53.19 PM.jpeg',
      description: 'Luxury fragrances from top international brands. Long-lasting and authentic.',
      availability: 'In Stock'
    },
    {
      id: '2',
      name: 'Elegant Jewelry Set',
      category: 'Jewelry',
      priceRange: '₦30,000 - ₦100,000',
      image: '/pic/WhatsApp Image 2026-01-30 at 2.53.19 PM (1).jpeg',
      description: 'Stunning jewelry pieces perfect for special occasions and everyday elegance.',
      availability: 'In Stock'
    },
    {
      id: '3',
      name: 'Couple Accessories',
      category: 'Couple Items',
      priceRange: '₦21,000 - ₦65,000',
      image: '/pic/WhatsApp Image 2026-01-30 at 2.53.19 PM (2).jpeg',
      description: 'Matching accessories for couples. Express your bond with style.',
      availability: 'Limited'
    },
    {
      id: '4',
      name: 'Beauty Essentials',
      category: 'Beauty',
      priceRange: '₦15,000 - ₦45,000',
      image: '/pic/WhatsApp Image 2026-01-30 at 2.53.20 PM.jpeg',
      description: 'High-quality beauty products including lip glosses and skincare items.',
      availability: 'In Stock'
    },
    {
      id: '5',
      name: 'Luxury Watch Collection',
      category: 'Accessories',
      priceRange: '₦40,000 - ₦100,000',
      image: '/pic/WhatsApp Image 2026-01-30 at 2.53.20 PM (1).jpeg',
      description: 'Premium timepieces that combine functionality with sophisticated design.',
      availability: 'Pre-Order'
    }
  ];

  const categories = ['All', ...Array.from(new Set(stockItems.map(item => item.category)))];
  
  const filteredItems = selectedCategory === 'All' 
    ? stockItems 
    : stockItems.filter(item => item.category === selectedCategory);

  const handleInquiry = (item: StockItem) => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the ${item.name} from your current stock.\n\nCategory: ${item.category}\nPrice Range: ${item.priceRange}\n\nCould you please provide more details and availability?`
    );
    const whatsappUrl = `https://wa.me/234${COMPANY_INFO.phones[0].slice(1)}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Limited': return 'bg-yellow-100 text-yellow-800';
      case 'Pre-Order': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <SEOHead 
        title="Current Stock | Live Inventory | ABZ&ELLIE'S Place | Available Now"
        description="View ABZ&ELLIE'S Place current stock - live inventory updated daily. Premium perfumes, jewelry, couple items, and beauty products available now. Price range ₦21,000 - ₦100,000."
        url="https://abz-ellie-s-place.vercel.app/current-stock"
        keywords="current stock, live inventory, available products, in stock Nigeria, perfumes available, jewelry in stock, beauty products inventory"
      />
      {/* Hero Section */}
      <section className="py-20 animated-gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold">Current Stock</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Discover our latest collection of premium products, all available now
            </p>
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold">Live Inventory • Updated Daily</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 border-b border-slate-100 sticky top-20 bg-white/90 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Category Filters */}
            <div className="flex items-center space-x-4">
              <Filter size={20} className="text-slate-400" />
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      selectedCategory === category
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-slate-400'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'text-slate-400'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stock Items */}
      <section className="py-16 max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          layout
          className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            : 'space-y-6'
          }
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all ${
                  viewMode === 'list' ? 'flex items-center' : ''
                }`}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-48 h-32' : 'aspect-square'}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getAvailabilityColor(item.availability)}`}>
                      {item.availability}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <motion.button
                      onClick={() => setSelectedItem(item)}
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-sm"
                    >
                      <Eye size={18} />
                    </motion.button>
                  </div>
                </div>

                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-slate-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-blue-600 font-bold uppercase tracking-wider">{item.category}</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Price Range</p>
                      <p className="text-lg font-bold text-slate-900">{item.priceRange}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <motion.button
                        onClick={() => handleInquiry(item)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-green-500 text-white rounded-xl font-bold text-sm flex items-center space-x-2 shadow-sm hover:shadow-md transition-all"
                      >
                        <MessageCircle size={16} />
                        <span>Inquire</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} className="text-slate-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">No items found</h3>
            <p className="text-slate-600">Try selecting a different category or check back later for new arrivals.</p>
          </motion.div>
        )}
      </section>

      {/* Quick Contact Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-serif font-bold text-slate-900">
              Don't See What You're Looking For?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We're constantly updating our inventory. Contact us for custom orders or to check availability of specific items.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => {
                  const message = encodeURIComponent("Hi! I'd like to inquire about custom orders or specific items not shown in your current stock.");
                  window.open(`https://wa.me/234${COMPANY_INFO.phones[0].slice(1)}?text=${message}`, '_blank');
                }}
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 animated-gradient-bg text-white rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg"
              >
                <MessageCircle size={20} />
                <span>Custom Order</span>
              </motion.button>
              <motion.button
                onClick={() => {
                  const message = encodeURIComponent("Hi! I'd like to be notified about new arrivals and stock updates.");
                  window.open(`https://wa.me/234${COMPANY_INFO.phones[1].slice(1)}?text=${message}`, '_blank');
                }}
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-2xl font-bold hover:border-slate-400 transition-all"
              >
                Get Stock Updates
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-64 md:h-80 object-cover rounded-t-3xl"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900"
                >
                  ×
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">{selectedItem.name}</h2>
                    <p className="text-blue-600 font-bold uppercase tracking-wider">{selectedItem.category}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getAvailabilityColor(selectedItem.availability)}`}>
                    {selectedItem.availability}
                  </span>
                </div>
                
                <p className="text-slate-600 mb-6 leading-relaxed">{selectedItem.description}</p>
                
                <div className="bg-slate-50 rounded-2xl p-6 mb-6">
                  <p className="text-sm text-slate-500 uppercase tracking-wider font-bold mb-2">Price Range</p>
                  <p className="text-2xl font-bold text-slate-900">{selectedItem.priceRange}</p>
                </div>
                
                <div className="flex space-x-4">
                  <motion.button
                    onClick={() => handleInquiry(selectedItem)}
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 py-4 bg-green-500 text-white rounded-2xl font-bold flex items-center justify-center space-x-2"
                  >
                    <MessageCircle size={20} />
                    <span>Inquire via WhatsApp</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CurrentStock;