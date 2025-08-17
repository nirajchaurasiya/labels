"use client";

import { useState, useEffect, useRef } from "react";
import { FaShoppingBag, FaBars, FaTimes, FaHome } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/useCartProvider";
import { BsTrash } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const cartRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleCart = () => setCartOpen(!cartOpen);

  // Get cart context with needed methods
  const { cartItems, removeItem, updateQty } = useCart();

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  const router = useRouter();
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

  const handleCheckout = () => {
    router.push(`/checkout`);
  };

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
          <FaHome
            onClick={() => router.push("/")}
            className="cursor-pointer text-2xl"
          />
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/pp.jpg" alt="Logo" width={250} height={66} />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 text-lg md:text-xl relative">
          <FaShoppingBag
            className="cursor-pointer text-2xl"
            onClick={toggleCart}
          />
          {cartItems.length > 0 && (
            <span className="absolute gold-theme-bg -top-1 -right-1 text-white rounded-full w-5 h-5 flex text-sm font-semibold items-center justify-center">
              {cartItems.length}
            </span>
          )}
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
          <Link href="/cart" className="gold-theme-color-hover">
            Cart
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
          <li>
            <Link href="/cart" className="gold-theme-color-hover">
              Cart
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
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex border-b pb-4 gap-4">
              {/* Product Image */}
              <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded overflow-hidden">
                {/* Use actual product image URL */}
                <Image
                  src={item.image || "/1.jpg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col flex-grow">
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-xs text-gray-600">
                  ${item.price.toFixed(2)}
                </p>
                <p className="text-xs text-gray-600">
                  Size: {item.size || "N/A"}
                </p>
                <p className="text-xs text-gray-600">
                  Uploaded File: {item.name || "N/A"}
                </p>
                {/* Qty Selector */}
                <div className="flex items-center mt-auto space-x-2 py-3">
                  <button
                    onClick={() => updateQty(item.id, item.quantity - 1)}
                    className="px-2 py-1 border rounded text-sm select-none"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                    className="px-2 py-1 border rounded text-sm select-none"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                    aria-label={`Remove ${item.name}`}
                  >
                    <BsTrash size={23} />
                  </button>
                </div>
              </div>

              {/* Total Price per Item */}
              <div className="flex-shrink-0 font-semibold text-sm whitespace-nowrap">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Totals Section */}
        <div className="p-4 border-t space-y-3 text-sm">
          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-base border-t pt-2">
            <span>Estimated Total</span>
            <span>${total.toFixed(2)} USD</span>
          </div>
          {/* <p className="text-xs text-gray-500">
            Discounts and{" "}
            <Link href="/shipping" className="underline">
              shipping
            </Link>{" "}
            calculated at checkout.
          </p> */}
          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-900"
          >
            Check out
          </button>
        </div>
      </div>
    </header>
  );
}
