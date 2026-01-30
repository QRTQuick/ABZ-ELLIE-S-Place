import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Star, Award, Sparkles, Phone } from 'lucide-react';
import SEOHead from './SEOHead';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pt-24">
      <SEOHead 
        title="About ABZ&ELLIE'S Place | Our Story & Values | Premium Beauty Products Nigeria"
        description="Learn about ABZ&ELLIE'S Place - founded by two friends passionate about bringing authentic perfumes, jewelry, and beauty products to Nigeria. Discover our story and values."
        url="https://abz-ellie-s-place.vercel.app/about"
        keywords="about ABZ ELLIE, founders story, authentic products Nigeria, premium beauty products, friendship business, quality guarantee"
      />
      {/* Hero Section */}
      <section className="py-20 animated-gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold">About ABZ&ELLIE'S</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Where friendship meets business, and sparkle meets style
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-bold uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">
                Built on Friendship
              </h2>
            </div>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p className="text-lg">
                ABZ&ELLIE'S Place was born from the beautiful friendship between two passionate entrepreneurs 
                who shared a vision: to bring authentic, quality products to people who appreciate the finer things in life.
              </p>
              <p>
                What started as casual conversations about our love for perfumes, jewelry, and beauty products 
                evolved into a mission to curate the most exquisite collection of items that make people feel special.
              </p>
              <p>
                Today, we're proud to serve customers across Nigeria with our carefully selected range of 
                perfumes, jewelry, couple items, and lip glosses - all backed by our commitment to authenticity and quality.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800&h=600" 
                className="w-full h-96 object-cover"
                alt="Beautiful beach representing friendship and dreams - the foundation of ABZ&ELLIE'S Place"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-medium opacity-90">Where dreams meet the horizon</p>
                <p className="text-xs opacity-75">Just like our friendship-built business</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 animated-gradient-bg rounded-full flex items-center justify-center text-white shadow-2xl">
              <Heart size={32} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
              What We Stand For
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our values guide everything we do, from product selection to customer service
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Star />,
                title: "Authenticity",
                description: "Every product is verified for 100% authenticity. We never compromise on quality or genuineness."
              },
              {
                icon: <Users />,
                title: "Community",
                description: "We're more than a store - we're a community of people who appreciate beauty and quality."
              },
              {
                icon: <Award />,
                title: "Excellence",
                description: "From our curated selection to our customer service, we strive for excellence in everything."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 animated-gradient-bg text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {React.cloneElement(value.icon as React.ReactElement<any>, { size: 24 })}
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center bg-slate-900 rounded-[3rem] p-16 text-white"
        >
          <Sparkles className="w-16 h-16 mx-auto mb-8 text-yellow-400" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to Sparkle?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust ABZ&ELLIE'S Place for their beauty and style needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-all"
            >
              Get in Touch
            </motion.a>
            <motion.a
              href="#shop"
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 border-2 border-white text-white rounded-2xl font-bold hover:bg-white hover:text-slate-900 transition-all"
            >
              Shop Now
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;