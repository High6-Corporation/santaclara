// Global type definitions

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  features?: string[];
  thickness?: string;
  dimensions?: string;
  plyCount?: string;
  weight?: string;
  boilTested?: string;
  applications?: string[];
  gallery?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
  image?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category?: string;
}

export interface CompanyStat {
  label: string;
  value: string | number;
  suffix?: string;
}
