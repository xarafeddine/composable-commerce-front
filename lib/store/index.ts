import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Product, cartItem } from "../models";
// import { getProducts } from "../contentfull";
import { getBanner, getProducts } from "../client";
import data from "./products.json";

const INITIAL_PRODUCTS: Product[] = getProducts();
type chatbotMessage = { role: string; content: string };
export interface ProductState {
  bannerData: any;
  productsList: Product[];
  categories: string[];
  cart: cartItem[];
  showCart: boolean;
  chatbotMessages: chatbotMessage[];
  setChatbotMessages: (chatbotmessages: chatbotMessage) => void;
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

const createProductsStore = create<ProductState>();
const useProductsStore = createProductsStore(
  // persist(
  (set, get) => ({
    productsList: INITIAL_PRODUCTS,
    categories: [
      "men's clothing",
      "jewelery",
      "electronics",
      "women's clothing",
    ],
    bannerData: getBanner(),
    cart: [],
    showCart: false,
    setShowCart: (showCart: boolean) => {
      return set(() => {
        return { showCart };
      });
    },
    chatbotMessages: [
      {
        role: "assistant",
        content:
          "Welcome to our e-commerce platform I am you chatbot assistant!",
      },
    ],
    setChatbotMessages: (chatbotMessage: chatbotMessage) => {
      set((state) => {
        return {
          chatbotMessages: [...state.chatbotMessages, chatbotMessage],
        };
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
  })
  // {
  //   name: "product-store-cart",
  //   storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
  //   partialize: (state) => ({ cart: state.cart }),
  // }
  // )
);

export default useProductsStore;
