import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Shop from './components/Shop';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import CurrentStock from './components/CurrentStock';
import NotFound from './components/NotFound';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import Analytics from './components/Analytics';
import { Router, useRouter } from './components/Router';
import { MOCK_PRODUCTS, COMPANY_INFO } from './constants';
import { Product, CartItem, Category } from './types';
import { ShoppingBag, X, Trash2, ArrowRight, Sparkles, Phone, ShieldCheck } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('abz_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('abz_cart', JSON.stringify(cart));
  }, [cart]);

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

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Home cart={cart} addToCart={addToCart} />;
      case '/shop':
        return <Shop cart={cart} addToCart={addToCart} />;
      case '/about':
        return <AboutUs />;
      case '/contact':
        return <ContactUs />;
      case '/current-stock':
        return <CurrentStock />;
      default:
        return <NotFound />;
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-600 selection:text-white">
      <Analytics />
      <Navbar cartCount={cart.reduce((a, b) => a + b.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />
      
      {renderPage()}

      <Footer />
      <AIAssistant />

      {/* Modern Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100]">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-serif font-bold text-slate-900">Your Bag</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ready for Checkout</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-3 hover:bg-slate-50 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30">
                    <ShoppingBag size={80} strokeWidth={1} />
                    <p className="font-bold uppercase tracking-[0.3em] text-xs">The bag is waiting...</p>
                    <button onClick={() => setIsCartOpen(false)} className="text-blue-600 font-bold underline">Start Shopping</button>
                  </div>
                ) : (
                  cart.map(item => (
                    <motion.div layout key={item.id} className="flex items-center space-x-6 group">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-sm">
                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 text-lg">{item.name}</h4>
                        <p className="text-xs text-blue-600 font-bold mb-2 uppercase tracking-widest">{item.category}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-slate-900">₦{item.price.toLocaleString()} <span className="text-slate-400">× {item.quantity}</span></p>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-10 bg-slate-50 space-y-8 rounded-t-[3rem] shadow-inner">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">Total Estimate</span>
                    <span className="text-3xl font-serif font-bold text-slate-900">₦{cartTotal.toLocaleString()}</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 animated-gradient-bg text-white rounded-2xl font-bold shadow-2xl hover:shadow-blue-500/20 transition-all text-sm uppercase tracking-[0.2em]"
                  >
                    Complete Purchase
                  </motion.button>
                  <div className="flex items-center justify-center space-x-2 text-[9px] uppercase tracking-widest font-bold text-slate-400">
                    <ShieldCheck size={12} className="text-blue-500" />
                    <span>Secure Encrypted Checkout</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;