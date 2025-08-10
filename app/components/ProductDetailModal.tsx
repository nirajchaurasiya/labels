"use client";
import { useState } from "react";

export default function ProductDetailModal() {
  const [selectedSize, setSelectedSize] = useState("2x2");
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState<File>();

  const sizes = [
    "2x2",
    "3x3",
    "4x2",
    "4x4",
    "5x3",
    "5x5",
    "6x6",
    "7x7",
    "8x8",
    "9x9",
    "9x11",
    "11x5",
    "11x11",
    "11x14",
    "12x12",
    "15in x 3.6in",
    "10in x 11.9in",
  ];

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="bg-white rounded-md p-6 container flex items-center flex-col justify-center mx-auto my-8">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Image */}
        <div className="flex-1">
          <img
            src="/1.jpg" // Replace with your actual path
            alt="Product Preview"
            className="w-full object-contain"
          />
          <div className="mt-4">
            <h2 className="text-xl font-bold">2” x 2”</h2>
            <p className="text-sm text-gray-500">
              Just pick the size your design fits within.
            </p>
            <p className="text-sm mt-1">
              <span className="font-semibold">Perfect for:</span> Tag Prints
            </p>
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-semibold">DTF Transfers by Size</h1>
          <p className="text-lg font-medium">$0.90 USD</p>
          <p className="text-sm text-gray-500">
            Shipping calculated at checkout.
          </p>

          {/* Size selection */}
          <div>
            <h4 className="font-semibold mb-2">Size</h4>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded text-sm cursor-pointer ${
                    selectedSize === size
                      ? "gold-theme-btn text-white"
                      : "border-gray-300 text-gray-800"
                  }`}
                >
                  {size.replace("x", " x ")}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h4 className="font-semibold mb-2">Quantity</h4>
            <div className="flex items-center border border-gray-300 rounded w-max">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-lg"
              >
                −
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <p className="text-gray-500 text-sm mb-2">Upload your file</p>
            <p className="text-sm text-gray-400 mb-2">or Drop Files Here</p>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".png"
              className="hidden"
              id="upload"
            />
            <label
              htmlFor="upload"
              className="inline-block mt-2 px-4 py-2 gold-theme-btn text-white text-sm rounded hover:text-white cursor-pointer transition"
            >
              Browse
            </label>
            {file && (
              <p className="mt-2 text-sm text-green-600">
                Selected: {file.name}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-2">Files supported: .png</p>
          </div>

          {/* Custom Size Button */}
          <button className="text-sm underline mt-2 hover:text-black">
            Upload Custom Size
          </button>
        </div>
      </div>

      <div className="description py-12 flex flex-col gap-5">
        <p className="text-2xl font-semibold">Description</p>
        <p>
          <span className="font-semibold">Customization with Precision</span>:
          Achieve perfect customization while ensuring precise sizing for every
          print. Seamlessly adjust your designs to match specific garment
          dimensions, delivering tailored results without any extra effort.
        </p>

        <p>
          <span className="font-semibold">
            Optimize with Size-Specific Solutions
          </span>
          : Break free from the limitations of one-size-fits-all transfers. Our
          transfer sheets come in various sizes, allowing you to maximize each
          design’s impact—whether it’s a small emblem or a bold, full-scale
          graphic—perfectly fitted to its intended garment.
        </p>

        <p>
          <span className="font-semibold">Boost Efficiency, Save Time</span>:
          Enhance your production workflow with our size-tailored transfer
          sheets, eliminating the need for manual resizing. Focus on creating
          outstanding prints with greater speed and efficiency, ensuring
          top-quality results every time without losing precious production
          time.
        </p>
      </div>
    </div>
  );
}
