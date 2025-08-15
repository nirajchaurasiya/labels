"use client";
export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { useCart } from "../context/useCartProvider";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const paymentAmount = parseFloat(searchParams.get("amount") || "0");
  const paymentIntent = searchParams.get("payment_intent");
  const [verified, setVerified] = useState<boolean | null>(null);
  const { cartItems } = useCart();

  const TAX_RATE = 0.08; // 8%
  const router = useRouter();
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const taxAmount = +(subtotal * TAX_RATE).toFixed(2);
  const totalAmount = +(subtotal + taxAmount).toFixed(2);

  useEffect(() => {
    if (!paymentIntent) return;
    if (cartItems.length === 0) router.push("/");
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
        .catch(() => setVerified(false))
        .finally(() => {
          localStorage.removeItem("cart");
        });
    };

    checkStatus();
  }, [paymentIntent]);

  const generatePDFReceipt = () => {
    const doc = new jsPDF();

    // Header: "PRINT & SAVE RECEIPT"
    doc.setFontSize(16);
    doc.setTextColor(200, 0, 0); // red
    doc.setFont("helvetica", "bold");
    doc.text("PRINT & SAVE RECEIPT", doc.internal.pageSize.getWidth() / 2, 15, {
      align: "center",
    });

    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0);
    doc.text("Payment Receipt", doc.internal.pageSize.getWidth() / 2, 30, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Payment Intent: ${paymentIntent}`, 20, 40);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 48);

    // Table Data
    const tableData = cartItems.map((item, index) => [
      index + 1,
      `${item.name} - ${item.title}`,
      item.size,
      item.quantity,
      `$${item.price.toFixed(2)}`,
      `$${(item.price * item.quantity).toFixed(2)}`,
    ]);

    autoTable(doc, {
      startY: 55,
      head: [["No", "Item Name", "Size", "Qty", "Price", "Total"]],
      body: tableData,
      headStyles: { fillColor: [230, 230, 230], fontStyle: "bold" },
      styles: { cellPadding: 3, fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 70, overflow: "linebreak" }, // wrap long text
        2: { cellWidth: 20 },
        3: { cellWidth: 15 },
        4: { cellWidth: 20 },
        5: { cellWidth: 20 },
      },
      didDrawPage: () => {
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.text(
          "Thank you for your purchase! Visit us again.",
          doc.internal.pageSize.getWidth() / 2,
          pageHeight - 10,
          { align: "center" }
        );
      },
    });

    // Totals below table
    let finalY = (doc as any).lastAutoTable?.finalY || 55;

    doc.setFont("helvetica", "bold");
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 140, finalY);
    finalY += 6;
    doc.text(`Tax (8%): $${taxAmount.toFixed(2)}`, 140, finalY);
    finalY += 6;
    doc.text(`Grand Total: $${totalAmount.toFixed(2)}`, 140, finalY);

    doc.save(`receipt_${paymentIntent}.pdf`);
  };

  if (verified === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Verifying your payment...
      </div>
    );
  }

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

          <div className="mt-6 text-2xl font-semibold text-gray-700">
            Subtotal:{" "}
            <span className="text-gray-800">${subtotal.toFixed(2)}</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-700">
            Tax (8%):{" "}
            <span className="text-gray-800">${taxAmount.toFixed(2)}</span>
          </div>
          <div className="mt-4 text-3xl font-bold text-green-700">
            Total Paid: ${totalAmount}
          </div>

          {paymentIntent && (
            <div className="mt-4 text-xl font-semibold text-gray-700">
              Payment Intent ID:{" "}
              <span className="text-blue-600 font-mono">{paymentIntent}</span>
            </div>
          )}

          {/* PRINT & SAVE RECEIPT notice */}
          <div className="mt-6 text-red-600 font-bold text-lg">
            PRINT & SAVE RECEIPT
          </div>

          <button
            onClick={generatePDFReceipt}
            className="mt-4 px-4 py-2 bg-green-600 w-full cursor-pointer text-white rounded-md hover:bg-green-700"
          >
            Download Receipt
          </button>
        </div>
      </main>
    </div>
  );
}
