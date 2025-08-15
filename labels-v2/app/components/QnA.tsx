"use client";
import { useState } from "react";

const faqs = [
  {
    question: "What kind of products can I apply DTF transfers to?",
    answer:
      "DTF works great on t-shirts, sweatshirts, tote bags, aprons, baby onesies, and more. It adheres to both light and dark fabrics and stretches without cracking.",
  },
  {
    question: "Do you offer bulk discounts for large orders?",
    answer:
      "Yes, we offer competitive pricing and bulk order discounts on DTF transfers, apparel, and other custom printing products. Contact Hotpress KC for a free custom quote tailored to your project.",
  },
  {
    question: "What kinds of materials and apparel can you print on?",
    answer:
      "Hotpress KC can print on a wide range of materials — including cotton, polyester, blends, sportswear, hats, and tote bags. Our advanced heat transfer and DTF technology allow vibrant, long-lasting designs on virtually any fabric.",
  },
  {
    question: "Can I submit my own design or artwork for printing?",
    answer:
      "Absolutely! Hotpress KC accepts your own high-resolution artwork and design files. Our experienced team can also help you prepare your design for the best print results if needed.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-center mb-10">
        FREQUENTLY ASKED QUESTIONS
      </h2>
      <div className="max-w-5xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-md shadow-md text-black">
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-4 text-left text-lg font-medium cursor-pointer"
            >
              <span>{faq.question}</span>
              <span className="text-2xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-600">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
