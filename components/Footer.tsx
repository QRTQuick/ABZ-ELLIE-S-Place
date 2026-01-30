
import React from 'react';
import { Sparkles, Instagram, Facebook, Twitter, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import { Link } from './Router';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-400 py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 via-red-500 to-yellow-400 rounded-lg flex items-center justify-center text-white">
                <Sparkles size={24} />
              </div>
              <h2 className="text-2xl font-bold font-serif text-white uppercase tracking-tight">ABZ&ELLIE</h2>
            </div>
            <p className="text-sm leading-relaxed">
              {COMPANY_INFO.description}
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Shop Categories</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Jewelry & Accessories</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Luxury Perfumes</a></li>
              <li><a href="#" className="hover:text-yellow-500 transition-colors">Couple Sets</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Beauty & Lipglosses</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/current-stock" className="hover:text-white transition-colors">Current Stock</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Get in Touch</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-500" />
                <span>{COMPANY_INFO.phones[0]}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-red-500" />
                <span>{COMPANY_INFO.phones[1]}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-[10px] uppercase tracking-[0.2em] font-bold">
          <p>© 2026 ABZ&ELLIE'S Place. All Rights Reserved.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-white">Privacy</a>
            <a href="/terms" className="hover:text-white">Terms</a>
            <a href="/sitemap.xml" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
