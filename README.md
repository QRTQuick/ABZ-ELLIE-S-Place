# ABZ&ELLIE'S Place - Premium E-commerce Website

A modern, fully-featured e-commerce website for ABZ&ELLIE'S Place, specializing in premium perfumes, jewelry, couple items, and beauty products in Nigeria.

## 🌟 Features

### 🛍️ Core E-commerce Features
- **Product Catalog**: Curated collection of perfumes, jewelry, couple items, and lip glosses
- **Current Stock Page**: Live inventory with real product images from the business
- **Shopping Cart**: Persistent cart with local storage
- **Product Categories**: Filterable product categories
- **Search & Filter**: Advanced product search and filtering
- **Responsive Design**: Mobile-first, fully responsive design

### 📱 Modern User Experience
- **Single Page Application**: Fast, smooth navigation with custom routing
- **Animated UI**: Beautiful animations using Framer Motion
- **Progressive Web App**: PWA support with offline capabilities
- **AI Assistant**: Integrated AI chat assistant for customer support
- **WhatsApp Integration**: Direct WhatsApp contact for inquiries and orders

### 🎯 Business Features
- **Dual Contact System**: Two WhatsApp numbers for the business partners
- **Contact Forms**: Integrated contact forms that open WhatsApp with pre-filled messages
- **Price Range Display**: Products priced between ₦21,000 - ₦100,000
- **Business Hours**: Clear business hours and availability information
- **Service Areas**: Nationwide delivery across Nigeria

### 🔍 SEO & Performance
- **Comprehensive SEO**: Meta tags, Open Graph, Twitter Cards, structured data
- **Dynamic SEO**: Page-specific SEO optimization
- **Sitemap Generation**: Automated sitemap.xml generation
- **Robots.txt**: Search engine crawling optimization
- **Performance Monitoring**: Built-in analytics and performance tracking
- **Core Web Vitals**: Optimized for Google's Core Web Vitals

### 📄 Complete Page Structure
- **Home Page**: Hero section, featured products, company values
- **Shop Page**: Complete product catalog with search and filters
- **Current Stock**: Live inventory with actual product images
- **About Us**: Company story, founders' journey, values
- **Contact Us**: Multiple contact methods, business information
- **404 Page**: Custom not found page with navigation

## 🛠️ Technical Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **PWA**: Service Worker with caching strategies

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Set the GEMINI_API_KEY in .env.local to your Gemini API key
# (for AI assistant functionality)

# Start development server
npm run dev

# Build for production
npm run build

# Generate sitemap
npm run generate-sitemap
```

## 📁 Project Structure

```
├── components/
│   ├── AboutUs.tsx          # About page component
│   ├── AIAssistant.tsx      # AI chat assistant
│   ├── Analytics.tsx        # Analytics tracking
│   ├── ContactUs.tsx        # Contact page with WhatsApp integration
│   ├── CurrentStock.tsx     # Live inventory page
│   ├── Footer.tsx           # Site footer with navigation
│   ├── Hero.tsx             # Homepage hero section
│   ├── Home.tsx             # Homepage component
│   ├── Navbar.tsx           # Navigation header
│   ├── NotFound.tsx         # 404 error page
│   ├── ProductCard.tsx      # Product display component
│   ├── Router.tsx           # Custom routing system
│   ├── SEOHead.tsx          # Dynamic SEO component
│   └── Shop.tsx             # Shop page with filters
├── pic/                     # Product images
├── public/
│   ├── robots.txt           # Search engine directives
│   └── sitemap.xml          # Site structure for search engines
├── services/
│   └── geminiService.ts     # AI service integration
├── App.tsx                  # Main application component
├── constants.tsx            # Business information and product data
├── generate-sitemap.js      # Sitemap generation script
├── index.html               # HTML template with comprehensive SEO
├── manifest.json            # PWA configuration
├── package.json             # Dependencies and scripts
├── sw.js                    # Service worker for PWA
├── types.ts                 # TypeScript type definitions
└── vite.config.ts           # Build configuration
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue (#2563eb)
- **Secondary**: Red (#ef4444)  
- **Accent**: Yellow (#f59e0b)
- **Neutral**: Slate grays

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Animations
- Gradient animations on hero sections
- Smooth page transitions
- Hover effects on interactive elements
- Loading animations

## 📞 Contact Integration

### WhatsApp Integration
- **Primary**: +234-903-356-4255
- **Secondary**: +234-903-210-5964
- Pre-filled messages for different inquiry types
- Direct links to WhatsApp Web/App

### Business Hours
- **Monday-Friday**: 9:00 AM - 8:00 PM
- **Saturday**: 10:00 AM - 6:00 PM  
- **Sunday**: 12:00 PM - 5:00 PM

## 🔧 SEO Optimization

### Meta Tags
- Comprehensive meta descriptions
- Keywords optimization for Nigerian market
- Open Graph tags for social sharing
- Twitter Card integration

### Structured Data
- Organization schema
- Local business schema
- Product schema
- Breadcrumb navigation

### Performance
- Image optimization
- Code splitting
- Lazy loading
- Service worker caching

## 📱 PWA Features

- **Offline Support**: Service worker with caching
- **Install Prompt**: Add to home screen functionality
- **App Shortcuts**: Quick access to key pages
- **Responsive Icons**: Adaptive icons for different devices

## 🌍 Deployment

The site is optimized for deployment on:
- **Vercel** (recommended): `abz-ellie-s-place.vercel.app`
- **Netlify**: Static site deployment
- **GitHub Pages**: With custom domain support

### Build Process
```bash
npm run build
```
This will:
1. Build the React application
2. Generate the sitemap.xml
3. Optimize assets for production

## 📈 Analytics & Tracking

- Page view tracking
- Performance monitoring
- Core Web Vitals measurement
- User interaction tracking
- WhatsApp click tracking

## 🛡️ Security Features

- **Content Security Policy**: Implemented in service worker
- **HTTPS Only**: All external links use HTTPS
- **Input Validation**: Form validation and sanitization
- **XSS Protection**: React's built-in XSS protection

## 🎯 Business Goals

1. **Increase Online Presence**: Professional website for the business
2. **Customer Engagement**: Easy contact through WhatsApp
3. **Product Showcase**: Beautiful display of current inventory
4. **Trust Building**: About page showing founders' story
5. **Sales Conversion**: Clear pricing and contact methods

## 📞 Support

For technical support or business inquiries:
- **WhatsApp**: +234-903-356-4255 or +234-903-210-5964
- **Website**: https://abz-ellie-s-place.vercel.app

## 📄 License

This project is proprietary software owned by ABZ&ELLIE'S Place.

---

**Built with ❤️ for ABZ&ELLIE'S Place - Where Sparkle Meets Style**