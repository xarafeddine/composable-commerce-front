import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { Suspense, useEffect } from "react";
import Loading from "./loading";
import AuthProvider from "./AuthProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
  manifest: "/manifest.json",
  icons: "/icon.png",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <div className="layout">
            <header>
              <Navbar />
            </header>
            <Suspense fallback={<Loading />}>
              <main className="main-container py-10">{children}</main>
              <Toaster />
            </Suspense>
            <footer>
              <Footer />
            </footer>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}