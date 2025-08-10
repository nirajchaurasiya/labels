"use client";

import Image from "next/image";
import { useState } from "react";

const initialCart = [
  {
    id: 1,
    title: "Upload Your DTF Gang Sheet",
    price: 15.12,
    size: '16" x 24" (2 ft)',
    fileName: "humanoidrobotandskulltpszyg6t6x2cojs3.jpg",
    image: "/1.jpg", // Update with your actual path
    quantity: 1,
  },
  {
    id: 2,
    title: "DTF Transfers by Size",
    price: 6.9,
    size: "10in x 11.9in",
    fileName: "humanoidrobotandskulltpszyg6t6x2cojs3.jpg",
    image: "/1.jpg", // Update with your actual path
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCart);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Your cart</h1>

      <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 font-medium border-b pb-2 mb-4">
        <div>Product</div>
        <div className="text-center">Quantity</div>
        <div className="text-right">Total</div>
      </div>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_auto] gap-4 py-4 border-b"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <Image
              width={96}
              height={96}
              src={item.image}
              alt={item.title}
              className="object-fill rounded"
            />
            <div>
              <h2 className="font-semibold text-base sm:text-lg">
                {item.title}
              </h2>

              <p className="text-sm">${item.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Size: {item.size}</p>
              <p className="text-sm text-blue-600 underline">
                Uploaded File: {item.fileName}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end md:justify-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, -1)}
              className="border px-2 py-1"
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, 1)}
              className="border px-2 py-1"
            >
              +
            </button>
            <button
              onClick={() => removeItem(item.id)}
              className="ml-2 text-gray-500 hover:text-red-600"
            >
              🗑
            </button>
          </div>

          <div className="text-right font-medium">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      ))}

      {/* Total section */}
      <div className="flex justify-end mt-6 gap-5">
        <div className="text-lg font-semibold">Estimated Total</div>
        <div className="text-xl font-bold">${total} USD</div>
      </div>

      <p className="text-sm text-gray-600 mt-2 flex justify-end">
        Taxes, discounts and{" "}
        <span className="underline text-blue-600 cursor-pointer">shipping</span>{" "}
        calculated at checkout.
      </p>

      {/* Checkout buttons */}
      <div className="flex justify-end">
        <div className="mt-6 ap-4 flex flex-col gap-4 max-w-sm">
          <div className="flex justify-end w-full">
            <button className="bg-black text-white px-6 w-full py-3 cursor-pointer">
              Check out
            </button>
          </div>
          <div className="flex gap-2 justify-end w-full">
            <img
              src="/shoppay.png"
              alt="Shop Pay"
              className="border cursor-pointer h-10"
            />
            <img
              src="/paypal.png"
              alt="PayPal"
              className="border cursor-pointer h-10"
            />
            <img
              src="/applepay.png"
              alt="Google Pay"
              className="border cursor-pointer h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
