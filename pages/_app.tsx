import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { Suspense, useEffect } from "react";
import Loading from "./loading";
import AuthProvider from "./AuthProvider";

import { AppProps } from "next/app";
import ChatbotContainer from "@/components/Ai/ChatbotContainer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Navbar />

        <Suspense fallback={<Loading />}>
          <div className="main-container  py-10">
            <Component {...pageProps} />
          </div>
          <ChatbotContainer />
          <Toaster />
        </Suspense>
        <footer>
          <Footer />
        </footer>
      </AuthProvider>
    </>
  );
}
