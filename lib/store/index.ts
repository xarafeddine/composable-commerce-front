import { create } from "zustand";
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
  wishlist: { productId: number | string }[];
  cart: cartItem[];
  showCart: boolean;
  showWishlist: boolean;
  chatbotMessages: chatbotMessage[];
  setChatbotMessages: (chatbotmessages: chatbotMessage) => void;
  getCartItem: (id: number) => cartItem | undefined;
  getTotalQuantities: () => number;
  setShowCart: (showCart: boolean) => void;
  setShowWishlist: (showWishlist: boolean) => void;
  // fetchProducts: () => void;
  addToCart: (id: number) => void;
  addToWishlist: (id: number) => void;
  setCartItems: (cart: cartItem[]) => void;
  setWishlistItems: (wishlist: []) => void;
  removeFromCart: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  updateProducts: (prod: Product[]) => void;
  updateCart: (tem: cartItem) => void;
  getProduct: (slug: string | undefined) => Product | undefined;
}

const createProductsStore = create<ProductState>();
const useProductsStore = createProductsStore((set, get) => ({
  productsList: INITIAL_PRODUCTS,
  categories: ["men's clothing", "jewelery", "electronics", "women's clothing"],
  bannerData: getBanner(),
  wishlist: [],
  cart: [],
  showCart: false,
  showWishlist: false,
  setShowCart: (showCart: boolean) => {
    return set(() => {
      return { showCart };
    });
  },
  setShowWishlist: (showWishlist: boolean) => {
    return set(() => {
      return { showWishlist };
    });
  },
  chatbotMessages: [
    {
      role: "assistant",
      content:
        "Welcome to our e-commerce platform I am your chatbot assistant!",
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

  addToWishlist: (id: number) => {
    set((state) => {
      return { wishlist: [...state.wishlist, { productId: id }] };
    });
    const newProductsList = get().productsList.map((item) => {
      if (id === item.id)
        return {
          ...item,
          isInWishlist: true,
        };
      return { ...item };
    });

    get().updateProducts(newProductsList);
    console.log("add", get().productsList);
  },

  removeFromWishlist: (id: number) => {
    const newProductsList = get().productsList.map((item) => {
      if (id === item.id)
        return {
          ...item,
          isInWishlist: false,
        };

      return { ...item };
    });

    set((state) => {
      const wishlist: { productId: number | string }[] = state.wishlist.filter(
        (item) => item.productId !== id
      );
      return { wishlist };
    });

    get().updateProducts(newProductsList);
    console.log("remove", get().productsList);
  },

  setCartItems: (cart) => {
    set(() => {
      return { cart };
    });
  },
  setWishlistItems: (wishlist: any[]) => {
    set(() => {
      return { wishlist };
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

  getProduct: (slug: string | undefined) => {
    if (!slug) return undefined;
    const prods = get().productsList;
    return prods.find((prod) => prod.slug === slug);
  },
}));

export default useProductsStore;
