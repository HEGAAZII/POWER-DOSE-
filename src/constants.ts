import { Product, Testimonial, Review } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'TESTO-CORE 500',
    category: 'steroids',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://picsum.photos/seed/testo/600/600',
    description: 'The ultimate testosterone booster for explosive muscle growth and strength. Engineered for elite athletes seeking maximum performance.',
    benefits: ['Rapid Muscle Gain', 'Explosive Strength', 'Enhanced Recovery', 'Increased Libido'],
    usage: 'Inject 1ml twice per week for 12 weeks. Consult with a professional before use.',
    stock: 7,
    rating: 4.9,
    reviewsCount: 128,
    isBestSeller: true,
  },
  {
    id: '2',
    name: 'SHRED-X FAT BURNER',
    category: 'fat-burners',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://picsum.photos/seed/shred/600/600',
    description: 'Incinerate body fat while preserving lean muscle mass. SHRED-X targets stubborn fat areas and boosts metabolic rate.',
    benefits: ['Extreme Fat Loss', 'Metabolic Boost', 'Appetite Suppression', 'Mental Focus'],
    usage: 'Take 2 capsules daily with water before your morning workout.',
    stock: 15,
    rating: 4.7,
    reviewsCount: 85,
    isBestSeller: true,
  },
  {
    id: '3',
    name: 'WHEY-ISO PRO 2KG',
    category: 'protein',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://picsum.photos/seed/whey/600/600',
    description: 'Pure whey isolate with 28g of protein per scoop. Zero sugar, low carb, and fast-absorbing for post-workout recovery.',
    benefits: ['Muscle Repair', 'Fast Absorption', 'Low Calorie', 'Great Taste'],
    usage: 'Mix 1 scoop with 300ml of cold water or milk after training.',
    stock: 24,
    rating: 4.8,
    reviewsCount: 210,
    isBestSeller: false,
  },
  {
    id: '4',
    name: 'ANABOL-MAX 50',
    category: 'steroids',
    price: 74.99,
    originalPrice: 99.99,
    image: 'https://picsum.photos/seed/anabol/600/600',
    description: 'Powerful oral anabolic for rapid bulk and strength gains. Perfect for off-season cycles.',
    benefits: ['Massive Bulk', 'Strength Surge', 'Nitrogen Retention', 'Protein Synthesis'],
    usage: 'Take 1 tablet daily for 6-8 weeks. Do not exceed recommended dosage.',
    stock: 4,
    rating: 4.9,
    reviewsCount: 92,
    isBestSeller: true,
  },
  {
    id: '5',
    name: 'TRENBOL-ELITE',
    category: 'steroids',
    price: 119.99,
    originalPrice: 159.99,
    image: 'https://picsum.photos/seed/tren/600/600',
    description: 'The most powerful injectable for lean muscle and extreme vascularity. For advanced users only.',
    benefits: ['Lean Muscle Gain', 'Extreme Vascularity', 'Fat Loss', 'Hard Physique'],
    usage: 'Inject 75mg every other day for 8-10 weeks.',
    stock: 3,
    rating: 5.0,
    reviewsCount: 56,
    isBestSeller: false,
  },
  {
    id: '6',
    name: 'CASEIN NIGHT-REPAIR',
    category: 'protein',
    price: 54.99,
    originalPrice: 64.99,
    image: 'https://picsum.photos/seed/casein/600/600',
    description: 'Slow-digesting protein for overnight muscle recovery. Prevents muscle breakdown during sleep.',
    benefits: ['8-Hour Release', 'Anti-Catabolic', 'Muscle Satiety', 'Rich Texture'],
    usage: 'Mix 1 scoop with water before bed.',
    stock: 18,
    rating: 4.6,
    reviewsCount: 74,
    isBestSeller: false,
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Mark S.',
    beforeImage: 'https://picsum.photos/seed/before1/400/500',
    afterImage: 'https://picsum.photos/seed/after1/400/500',
    quote: 'IRON CORE changed my life. I gained 8kg of lean muscle in just 12 weeks using the TESTO-CORE stack.',
    result: '+8kg Lean Muscle',
  },
  {
    id: 't2',
    name: 'David R.',
    beforeImage: 'https://picsum.photos/seed/before2/400/500',
    afterImage: 'https://picsum.photos/seed/after2/400/500',
    quote: 'I finally shredded that stubborn belly fat. SHRED-X is the only burner that actually worked for me.',
    result: '-12% Body Fat',
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'John Doe',
    rating: 5,
    comment: 'Incredible results. Strength went through the roof in the first 2 weeks.',
    date: '2024-03-15',
  },
  {
    id: 'r2',
    userName: 'Alex P.',
    rating: 4,
    comment: 'Fast shipping and authentic products. Highly recommend.',
    date: '2024-03-10',
  }
];

export const FAQ = [
  {
    question: 'Are your products authentic?',
    answer: 'Yes, all our products are 100% authentic and sourced directly from certified manufacturers. Each product comes with a verification code.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'We offer express shipping. Domestic orders arrive in 2-4 business days. International orders take 7-10 days.'
  },
  {
    question: 'Do you offer Cash on Delivery?',
    answer: 'Yes, we offer Cash on Delivery (COD) for most regions to ensure maximum trust and convenience.'
  }
];
