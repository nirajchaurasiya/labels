"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const paymentIntent = searchParams.get("payment_intent");
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    localStorage.removeItem("cart");
    if (!paymentIntent) return;

    let retries = 0;
    const checkStatus = () => {
      fetch(`/api/check-payment?id=${paymentIntent}`)
        .then((res) => {
          if (!res.ok) throw new Error("Network response not ok");
          return res.json();
        })
        .then((data) => {
          const successStatuses = [
            "succeeded",
            "processing",
            "requires_capture",
          ];
          if (successStatuses.includes(data.status)) {
            setVerified(true);
          } else if (data.status === "processing" && retries < 5) {
            retries++;
            setTimeout(checkStatus, 2000);
          } else {
            setVerified(false);
          }
        })
        .catch(() => setVerified(false));
    };

    checkStatus();
  }, [paymentIntent]);

  // Loading state
  if (verified === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Verifying your payment...
      </div>
    );
  }

  // Payment failed
  if (!verified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 flex items-center justify-center bg-red-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-red-600 mb-3">
            Payment Failed
          </h1>
          <p className="text-gray-700 mb-6">
            Unfortunately, we couldn’t verify your payment. This may be due to
            insufficient funds, an expired card, or a network issue.
          </p>

          {paymentIntent && (
            <p className="text-sm text-gray-500 mb-6">
              Payment Intent ID:{" "}
              <span className="font-mono text-gray-800">{paymentIntent}</span>
            </p>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={() => (window.location.href = "/checkout")}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Retry Payment
            </button>
            <button
              onClick={() => (window.location.href = "/support")}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Payment successful
  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-12 py-8">
      <main className="max-w-3xl mx-auto p-10 text-center border border-gray-300 rounded-md bg-white shadow-md mt-12">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2 text-green-600">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your payment has been received.
          </p>

          <div className="mt-6 text-3xl font-bold text-gray-800">
            Amount Paid:{" "}
            <span className="text-green-700">${amount ?? "N/A"}</span>
          </div>
          {paymentIntent && (
            <div className="mt-4 text-xl font-semibold text-gray-700">
              Payment Intent ID:{" "}
              <span className="text-blue-600 font-mono">{paymentIntent}</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
