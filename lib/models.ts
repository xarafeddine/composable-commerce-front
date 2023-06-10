export type Product = {
  id: number | string;
  title: string;
  image: string;
  images?: string[];
  price: number;
  category?: string;
  rating?: number;
  isInCart?: boolean;
  slug?: string;
  details?: string;
};
export type cartItem = {
  productId: number;
  quantity: number;
};
