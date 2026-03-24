export interface Product {
  id: string;
  name: string;
  category: 'steroids' | 'protein' | 'fat-burners';
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  benefits: string[];
  usage: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  beforeImage: string;
  afterImage: string;
  quote: string;
  result: string;
}
