
import { Product } from './types';

export const COMPANY_INFO = {
  name: "ABZ&ELLIE'S Place",
  tagline: "Where Sparkle meets Style",
  description: "ABZ& ELLIE'S Place is an online store specializing in quality perfumes, beauty products, and stylish jewelry for men, women, and couples. We provide affordable, trendy, and elegant items suitable for gifting and personal use.",
  phones: ["09033564255"]
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Midnight Bloom Oud',
    category: 'Perfumes',
    price: 45000,
    description: 'A deep, mysterious blend of agarwood and dark roses.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400',
    isFeatured: true
  },
  {
    id: '2',
    name: 'Eternal Bond Necklace Set',
    category: 'Couple Items',
    price: 25000,
    description: 'Matching sterling silver necklaces for soulmates.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400',
    isNew: true
  },
  {
    id: '3',
    name: 'Starlight Diamond Ring',
    category: 'Jewelry',
    price: 85000,
    description: 'Handcrafted white gold ring with a brilliant-cut centerpiece.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400',
    isFeatured: true
  },
  {
    id: '4',
    name: 'Crystal Gloss Hydrator',
    category: 'Lipglosses',
    price: 8500,
    description: 'Non-sticky, ultra-shine gloss with vitamin E.',
    image: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37?auto=format&fit=crop&q=80&w=400',
    isNew: true
  },
  {
    id: '5',
    name: 'Sun-Kissed Citrus Mist',
    category: 'Perfumes',
    price: 32000,
    description: 'Bright citrus notes with a hint of warm vanilla.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '6',
    name: 'Men\'s Onyx Bracelet',
    category: 'Jewelry',
    price: 18000,
    description: 'Polished onyx stones with a secure magnetic clasp.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=400'
  }
];
