"use client";
export const dynamic = "force-dynamic";
// app/payment-failure/page.tsx
import React from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentFailure() {
  const searchParams = useSearchParams() || "0";
  const error = searchParams.get("error");

  return (
    <div className="max-w-2xl min-h-screen mx-auto p-6 text-center bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
      {error ? (
        <>
          <p className="text-lg text-gray-700 mb-4">
            We're sorry, but there was an issue with your payment:
          </p>
          <p className="text-md text-gray-800 mb-6 italic">
            "{decodeURIComponent(error)}"
          </p>
          <p className="text-md text-gray-700 mb-4">
            This error occurred because you used a real card in test mode.
            Stripe requires the use of test card numbers for testing purposes.
            You can find a list of valid test card numbers{" "}
            <a
              href="https://stripe.com/docs/testing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              here
            </a>
            .
          </p>
        </>
      ) : (
        <p className="text-md text-gray-700">
          An unknown error occurred. Please try again or contact support.
        </p>
      )}
      <button
        onClick={() => (window.location.href = "/checkout")}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Return to Checkout
      </button>
    </div>
  );
}
