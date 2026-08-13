export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

export interface ProductSummary {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

export interface Recommendation extends ProductSummary {
  sharedBuyers: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface Brand {
  id: string;
  name: string;
}