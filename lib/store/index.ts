import { create } from "zustand";
import { Product, cartItem } from "../models";
// import { getProducts } from "../contentfull";
import { getProducts } from "../client";
import data from "./products.json";

const INITIAL_PRODUCTS: Product[] = data.products;

export interface ProductState {
  productsList: Product[];
  categories: string[];
  cart: cartItem[];
  showCart: boolean;
  getTotalQuantities: () => number;
  setShowCart: (showCart: boolean) => void;
  fetchProducts: () => void;
  addToCart: (item: cartItem) => void;
  removeFromCart: (id: number) => void;
  updateProducts: (prod: Product[]) => void;
  updateCart: (tem: cartItem) => void;
}
export const useProductsStore = create<ProductState>()((set, get) => ({
  productsList: INITIAL_PRODUCTS.map(
    (prod) =>
      ({
        ...prod,
        rating: Math.round(Math.random() * 5),
        isInCart: false,
      } as Product)
  ),
  categories: INITIAL_PRODUCTS.reduce((accu: string[], curr) => {
    if (curr.category && !accu.includes(curr.category)) {
      return [...accu, curr.category];
    }
    return accu;
  }, []),

  cart: [],
  showCart: false,
  setShowCart: (showCart: boolean) => {
    return set(() => {
      return { showCart };
    });
  },

  getTotalQuantities: () => {
    return get().cart.reduce((accu, curr) => {
      return accu + curr.quantity;
    }, 0);
  },

  fetchProducts: () => {
    getProducts().then((prods) => {
      set(() => {
        return { productsList: prods };
      });
    });
  },

  addToCart: (item) =>
    set((state) => {
      return { cart: [...state.cart, item] };
    }),

  updateCart: (item) =>
    set((state) => {
      state.removeFromCart(item.productId);
      state.addToCart(item);
      return {};
    }),

  removeFromCart: (id: number) =>
    set((state) => {
      return { cart: state.cart.filter((item) => item.productId !== id) };
    }),

  updateProducts: (products: Product[]) =>
    set(() => {
      return { productsList: products };
    }),
}));

export default useProductsStore;
