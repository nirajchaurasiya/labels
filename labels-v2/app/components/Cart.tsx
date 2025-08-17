"use client";

import Image from "next/image";
import { useCart } from "../context/useCartProvider";
import { BsTrash } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cartItems, removeItem, updateQty } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  const router = useRouter();
  const handleCheckout = () => {
    router.push(`/checkout`);
  };

  return !isClient ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-4 border-black border-t-white rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 text-lg font-medium">Loading...</p>
      </div>
    </div>
  ) : (
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
              alt={item.title || item.name}
              className="object-cover rounded"
            />
            <div>
              <h2 className="font-semibold text-base sm:text-lg">
                {item.title || item.name}
              </h2>

              <p className="text-sm">${item.price.toFixed(2)}</p>
              {/* Optional: add size and fileName if available */}
              {item.size && (
                <p className="text-sm text-gray-500">Size: {item.size}</p>
              )}
              {item.name && (
                <p className="text-sm text-blue-600 underline">
                  Uploaded File: {item.name}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end md:justify-center gap-2">
            <button
              onClick={() => updateQty(item.id, item.quantity - 1)}
              className="cursor-pointer border px-2 py-1"
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateQty(item.id, item.quantity + 1)}
              className="cursor-pointer border px-2 py-1"
            >
              +
            </button>
            <button
              onClick={() => removeItem(item.id)}
              className="cursor-pointer ml-2 text-red-700 hover:text-red-600"
            >
              <BsTrash size={20} />
            </button>
          </div>

          <div className="text-right font-medium">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      ))}

      {/* Total section */}
      <div className="mt-6 flex flex-col gap-2">
        <div className="text-gray-600 text-sm">
          <div className="flex justify-end gap-5">
            <span>Tax (8%) </span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-end gap-5">
            <div className="">Subtotal</div>
            <div className="">${subtotal.toFixed(2)} USD</div>
          </div>
        </div>

        <div className="flex justify-end gap-5">
          <div className="text-lg font-semibold">Estimated Total</div>
          <div className="text-xl font-bold">${total.toFixed(2)} USD</div>
        </div>
      </div>

      {/* Checkout buttons */}
      <div className="flex justify-end">
        <div className="mt-6 ap-4 flex flex-col gap-4 max-w-sm">
          <div className="flex justify-end w-full">
            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className="gold-theme-bg text-white px-6 w-full py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check out
            </button>
          </div>
          <div className="flex gap-2 justify-end w-full text-sm text-gray-500">
            {/* <img
              src="/stripe.png"
              alt="Stripe"
              className="border cursor-pointer h-12 select-none"
            />
            <img
              src="/cashapp.png"
              alt="Cash App"
              className="border cursor-pointer h-12 select-none"
            />
            <img
              src="/zelle.png"
              alt="Zelle"
              className="border cursor-pointer h-12 select-none"
            /> */}
            You will get options to pay via card, cashapp, zelle on the next
            page when you hit checkout.
          </div>
        </div>
      </div>
    </div>
  );
}
