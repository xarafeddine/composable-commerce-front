import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
