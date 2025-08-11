"use client";

import { useState } from "react";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1); // open 'Pressing Instructions' by default

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const sections = [
    {
      title: "Material Information",
      content: (
        <p className="text-sm text-gray-700">
          At Labels, all orders are printed on premium direct‑to‑film (DTF)
          material using top‑of‑the‑line printers and the highest‑quality inks.
          Our team carefully handles every step of production, ensuring smooth
          application and vibrant, long‑lasting results. Our DTF transfers can
          be pressed onto virtually any garment with ease, delivering the
          perfect heat transfer solution for a wide range of needs. Plus, every
          Hotpress KC DTF transfer is washer‑safe, with a durable finish that
          won&apos;t crack, fade, or bleed — guaranteed.
        </p>
      ),
    },
    {
      title: "Pressing Instructions",
      content: (
        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <strong>Heat Press</strong>
            <ol className="list-decimal list-inside mt-1">
              <li>
                <strong>Pressure Setting:</strong> Set the heat press to medium
                to firm pressure.
              </li>
              <li>
                <strong>Temperature:</strong> For cotton and 50/50 blends, set
                the temperature to 320–350°F. For synthetic or polyester
                fabrics, set the temperature to 280–300°F.
              </li>
              <li>
                <strong>Press:</strong> Press the transfer to fabric for 10 to
                15 seconds.
              </li>
              <li>
                <strong>Hot Peel:</strong> Peel while still hot, in one
                continuous, smooth, rapid motion.
              </li>
            </ol>
            <p className="mt-2">
              <strong>For Enhanced Durability:</strong> Cover the image with
              parchment paper after peeling the film off and press again for 5
              seconds.
            </p>
          </div>
          <div>
            <strong>Iron On</strong>
            <ol className="list-decimal list-inside mt-1">
              <li>
                <strong>Temperature:</strong> Set the temperature to the highest
                setting on your iron.
              </li>
              <li>
                <strong>Press:</strong> Apply even pressure to all of the design
                with the iron and press evenly for 20 to 25 seconds onto the
                garment.
              </li>
              <li>
                <strong>Hot Peel:</strong> Peel immediately while hot, in one
                continuous, smooth, rapid motion.
              </li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      title: "Template Recommendations",
      content: (
        <p className="text-sm text-gray-700">
          If you are not using our gang sheet builder, make sure that the images
          have high resolution and a transparent background before uploading. If
          the pre-made file uploaded has quality / color issues, our designer
          team will contact you before printing your custom gang sheet.
        </p>
      ),
    },
  ];

  return (
    <div className="border rounded-md divide-y">
      {sections.map((section, idx) => (
        <div key={idx}>
          <button
            onClick={() => toggle(idx)}
            className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-900 hover:bg-gray-50 focus:outline-none"
          >
            <span>{section.title}</span>
            <span>{openIndex === idx ? "−" : "+"}</span>
          </button>
          {openIndex === idx && (
            <div className="px-4 pb-4">{section.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
