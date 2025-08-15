// app/checkout/Checkout.tsx

"use client";

import CheckoutPage from "@/app/components/CheckoutPage";
import convertToSubCurrency from "@/app/lib/convertToSubCurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCart } from "../context/useCartProvider";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

export default function Checkout() {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(0);
  const { cartItems } = useCart();
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/");
    } else {
      const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const taxRate = 0.08;
      const tax = subtotal * taxRate;
      const total = subtotal + tax;
      setAmount(parseFloat(total.toFixed(2)));
    }
  }, [cartItems, router]);

  return (
    <main className="max-w-6xl min-h-screen mx-auto p-10 text-center border-gray-300 m-10 rounded-md bg-gradient-to-tr">
      <div className="mb-10">
        <h2 className="text-2xl">
          Total Amount:
          <span className="font-bold"> ${amount.toFixed(2)}</span>
        </h2>
      </div>

      {amount > 0 && (
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubCurrency(amount),
            currency: "usd",
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
      )}
    </main>
  );
}
