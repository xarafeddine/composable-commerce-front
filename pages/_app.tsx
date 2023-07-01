import { useEffect, useState } from "react";
import { hydrate } from "react-dom";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Loading from "./loading";
import AuthProvider from "./AuthProvider";

import { AppProps } from "next/app";
import ChatbotContainer from "@/components/Ai/ChatbotContainer";
import useProductsStore from "@/lib/store";
import CheckoutPage from "./checkout";
import Success from "./confirmation";

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // added code - start
  const { cart, setCartItems, wishlist, setWishlistItems } = useProductsStore(
    (state) => state
  );

  useEffect(() => {
    if (isClient) {
      const cartFromStorage = window.localStorage.getItem(
        "composable_commerce_cart"
      );
      const wishlistFromStorage = window.localStorage.getItem(
        "composable_commerce_wishlist"
      );
      const cartData = cartFromStorage && JSON.parse(cartFromStorage);
      const wishlistData =
        wishlistFromStorage && JSON.parse(wishlistFromStorage);

      cartData && setCartItems(cartData);
      wishlistData && setWishlistItems(wishlistData);
    }
  }, [isClient, setCartItems, setWishlistItems]);

  useEffect(() => {
    if (isClient) {
      const cart_data = JSON.stringify(cart);
      const wishlist_data = JSON.stringify(wishlist);
      window.localStorage.setItem("composable_commerce_cart", cart_data);
      window.localStorage.setItem(
        "composable_commerce_wishlist",
        wishlist_data
      );
    }
  }, [cart, wishlist, isClient]);
  //added code end

  if (!isClient) {
    return null; // Return null during SSR
  }

  const isPaimentPage = Component === CheckoutPage || Component === Success;
  return (
    <>
      <AuthProvider>
        {!isPaimentPage && <Navbar />}

        <Suspense fallback={<Loading />}>
          <div className="main-container  py-10">
            <Component {...pageProps} />
          </div>
          {!isPaimentPage && <ChatbotContainer />}

          <Toaster />
        </Suspense>
        <footer>{!isPaimentPage && <Footer />}</footer>
      </AuthProvider>
    </>
  );
}
