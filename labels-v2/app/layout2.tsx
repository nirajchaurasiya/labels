"use client";
import React, { Suspense } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/useCartProvider";
export default function Layout2({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      <Footer />
    </CartProvider>
  );
}
