"use client";

import { useState, useEffect, useRef } from "react";
import { FaShoppingBag, FaBars, FaTimes, FaHome } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const cartRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleCart = () => setCartOpen(!cartOpen);

  // Dummy cart data
  const cartItems = [
    { id: 1, name: "Product 1", price: 19.99, qty: 1 },
    { id: 2, name: "Product 2", price: 29.99, qty: 2 },
    { id: 3, name: "Product 3", price: 9.99, qty: 1 },
  ];

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Close cart if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setCartOpen(false);
      }
    };

    if (cartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cartOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Info Bar */}
      <div className="text-white text-xs overflow-hidden gold-theme-bg">
        <div
          className="whitespace-nowrap animate-marquee py-1 px-2 md:gap-12 gap-7 font-semibold"
          style={{ display: "flex" }}
        >
          <p className="mx-4"> • Color Matching Technology</p>
          <p className="mx-4"> • Super Fast Turnaround</p>
          <p className="mx-4"> • All Orders Ship in 1-2 Business Days</p>
          <p className="mx-4"> • 2621 E Nettleton</p>
          <p className="mx-4"> • Chardaywoods@gmail.com</p>
          <p className="mx-4"> • 870-627-1281</p>
          <p className="mx-4"> • Labels</p>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex items-center justify-between px-4 py-4 md:px-6 border-b">
        {/* Left Icon */}
        <div className="flex items-center gap-4 text-lg md:text-xl">
          <FaHome className="cursor-pointer text-2xl" />
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/pp.jpg" alt="Logo" width={250} height={66} />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 text-lg md:text-xl">
          <FaShoppingBag
            className="cursor-pointer text-2xl"
            onClick={toggleCart}
          />
          <button className="md:hidden" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex justify-center py-4 border-b gap-6 text-sm font-medium ">
        <li>
          <Link href="/" className="gold-theme-color-hover">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="gold-theme-color-hover">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="gold-theme-color-hover">
            Contact
          </Link>
        </li>
        <li>
          <Link
            href="/services/all"
            className="gold-theme-btn p-2 rounded-md text-white "
          >
            <button className="cursor-pointer">Shop Now</button>
          </Link>
        </li>
      </ul>

      {/* Mobile Nav */}
      {menuOpen && (
        <ul className="md:hidden px-4 p-4 pb-4 space-y-3 text-sm font-medium">
          <li>
            <Link href="/" className="gold-theme-color-hover">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="gold-theme-color-hover">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="gold-theme-color-hover">
              Contact
            </Link>
          </li>
        </ul>
      )}

      {/* Cart Sidebar - Slide Animation */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        ref={cartRef}
      >
        {/* Cart Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <FaTimes
            className="cursor-pointer text-xl"
            onClick={() => setCartOpen(false)}
          />
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">Qty: {item.qty}</p>
              </div>
              <span className="font-semibold">
                ${(item.price * item.qty).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="p-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-base border-t pt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="w-full mt-3 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
            Checkout
          </button>
        </div>
      </div>
    </header>
  );
}
