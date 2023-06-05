import { create } from "zustand";
import { Product, cartItem } from "../models";
// import { getProducts } from "../contentfull";
import { getProducts } from "../client";
import data from "./products.json";

const INITIAL_PRODUCTS: Product[] = getProducts();

export interface ProductState {
  productsList: Product[];
  categories: string[];
  cart: cartItem[];
  showCart: boolean;
  getCartItem: (id: number) => cartItem | undefined;
  getTotalQuantities: () => number;
  setShowCart: (showCart: boolean) => void;
  fetchProducts: () => void;
  addToCart: (id: number) => void;
  setCartItems: (cart: cartItem[]) => void;
  removeFromCart: (id: number) => void;
  updateProducts: (prod: Product[]) => void;
  updateCart: (tem: cartItem) => void;
}
export const useProductsStore = create<ProductState>()((set, get) => ({
  productsList: INITIAL_PRODUCTS,
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
  getCartItem: (id) => {
    return get().cart.find((item) => (item.productId = id));
  },
  fetchProducts: () => {
    // getProducts().then((prods) => {
    //   set(() => {
    //     return { productsList: prods };
    //   });
    // });
  },

  addToCart: (id) => {
    const itemInCart = get().cart.find((item) => item.productId === id);
    if (!itemInCart) {
      return set((state) => {
        return { cart: [...state.cart, { productId: id, quantity: 1 }] };
      });
    }
    const newCartitem = {
      ...itemInCart,
      quantity: itemInCart.quantity + 1,
    };
    get().updateCart(newCartitem);
  },

  setCartItems: (cart) => {
    set(() => {
      return { cart };
    });
  },

  updateCart: (item) => {
    get().removeFromCart(item.productId);
    set((state) => {
      return {
        cart: [...state.cart, item],
      };
    });
  },

  removeFromCart: (id: number) => {
    set((state) => {
      return { cart: state.cart.filter((item) => item.productId !== id) };
    });
  },

  updateProducts: (products: Product[]) =>
    set(() => {
      return { productsList: products };
    }),
}));

export default useProductsStore;
