import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import SEOHead from './SEOHead';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppContact = (phoneNumber: string) => {
    const message = encodeURIComponent(
      `Hello ABZ&ELLIE'S Place!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\n\nMessage: ${formData.message}`
    );
    const whatsappUrl = `https://wa.me/234${phoneNumber.slice(1)}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we'll use WhatsApp. You can choose which number to send to
    handleWhatsAppContact(COMPANY_INFO.phones[0]);
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <SEOHead 
        title="Contact ABZ&ELLIE'S Place | WhatsApp +234-903-356-4255 | Get in Touch"
        description="Contact ABZ&ELLIE'S Place for inquiries about perfumes, jewelry, and beauty products. WhatsApp: +234-903-356-4255, +234-903-210-5964. Fast response guaranteed."
        url="https://abz-ellie-s-place.vercel.app/contact"
        keywords="contact ABZ ELLIE, WhatsApp Nigeria, customer service, product inquiry, order status, beauty products support"
      />
      {/* Hero Section */}
      <section className="py-20 animated-gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold">Get in Touch</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Send us a Message</h2>
              <p className="text-slate-600">
                Fill out the form below and we'll get back to you via WhatsApp or email.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="080XXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="Product Inquiry">Product Inquiry</option>
                    <option value="Order Status">Order Status</option>
                    <option value="Custom Order">Custom Order</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Complaint">Complaint</option>
                    <option value="General">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 animated-gradient-bg text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all"
              >
                <Send size={20} />
                <span>Send via WhatsApp</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Contact Information</h2>
              <p className="text-slate-600">
                Reach out to us through any of these channels. We're here to help!
              </p>
            </div>

            <div className="space-y-6">
              {/* WhatsApp Numbers */}
              <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">WhatsApp</h3>
                    <p className="text-sm text-slate-600">Fastest way to reach us</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {COMPANY_INFO.phones.map((phone, index) => (
                    <motion.button
                      key={phone}
                      onClick={() => handleWhatsAppContact(phone)}
                      whileHover={{ scale: 1.02 }}
                      className="w-full p-3 bg-white border border-green-200 rounded-xl text-left hover:border-green-300 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-900">{phone}</span>
                        <span className="text-xs text-green-600 font-bold">
                          {index === 0 ? 'Primary' : 'Secondary'}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Business Hours</h3>
                    <p className="text-sm text-slate-600">When we're available</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Monday - Friday</span>
                    <span className="font-medium text-slate-900">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Saturday</span>
                    <span className="font-medium text-slate-900">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Sunday</span>
                    <span className="font-medium text-slate-900">12:00 PM - 5:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-500 text-white rounded-xl flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Service Area</h3>
                    <p className="text-sm text-slate-600">Where we deliver</p>
                  </div>
                </div>
                <p className="text-slate-700">
                  We deliver nationwide across Nigeria with special focus on Lagos, Abuja, and Port Harcourt.
                </p>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                onClick={() => handleWhatsAppContact(COMPANY_INFO.phones[0])}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-green-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg"
              >
                <MessageCircle size={20} />
                <span>WhatsApp</span>
              </motion.button>
              <motion.button
                onClick={() => window.location.href = `tel:${COMPANY_INFO.phones[0]}`}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg"
              >
                <Phone size={20} />
                <span>Call Now</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;