// /app/components/CheckoutPage.tsx

"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/app/lib/convertToSubCurrency";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    // Extract payment intent ID from clientSecret for the return URL
    const paymentIntentId = clientSecret.split("_secret")[0];

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?payment_intent=${paymentIntentId}&amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      // Redirect to failure URL on error
      window.location.href = `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/payment-failure?error=${encodeURIComponent(error?.message!)}`;
    }
    window.close();
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-black"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && (
        <PaymentElement
          options={{
            layout: {
              type: "auto",
              defaultCollapsed: false,
              radios: false,
              spacedAccordionItems: true,
              visibleAccordionItemsCount: 2,
            },
            business: {
              name: "Labels",
            },
            paymentMethodOrder: ["card", "cashapp"],
          }}
        />
      )}

      {errorMessage && (
        <div className="text-red-500 mt-4 text-start">{errorMessage}</div>
      )}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-3 gold-theme-btn mt-5 rounded-md font-bold disabled:opacity-50"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
