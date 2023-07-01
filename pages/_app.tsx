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
  const { cart, setCartItems } = useProductsStore((state) => state);

  useEffect(() => {
    if (isClient) {
      const stateFromStorage = window.localStorage.getItem(
        "composable_commerce_cart"
      );
      const data = stateFromStorage && JSON.parse(stateFromStorage);
      if (data) {
        setCartItems(data);
      }
    }
  }, [isClient, setCartItems]);

  useEffect(() => {
    if (isClient) {
      const data = JSON.stringify(cart);
      window.localStorage.setItem("composable_commerce_cart", data);
    }
  }, [cart, isClient]);
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
