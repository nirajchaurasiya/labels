"use client";
import React, { Suspense } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/useCartProvider";

export default function Layout2({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[80vh]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-700 text-lg font-medium">Loading...</p>
            </div>
          </div>
        }
      >
        {children}
      </Suspense>
      <Footer />
    </CartProvider>
  );
}
