"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/app/context/useCartProvider";
import Accordion from "./ProductInfo";
const sizes = [
  { size: '16" x 24" (2 ft)', cost: 15.12 },
  { size: '16" x 36" (3 ft)', cost: 22.68 },
  { size: '16" x 48" (4 ft)', cost: 30.24 },
  { size: '16" x 60" (5 ft)', cost: 37.8 },
  { size: '16" x 72" (6 ft)', cost: 45.36 },
  { size: '16" x 84" (7 ft)', cost: 52.92 },
  { size: '16" x 96" (8 ft)', cost: 60.48 },
  { size: '16" x 108" (9 ft)', cost: 68.04 },
  { size: '16" x 120" (10 ft)', cost: 75.6 },
  { size: '16" x 180" (15 ft)', cost: 113.4 },
  { size: '16" x 240" (20 ft)', cost: 151.2 },
  { size: '16" x 360" (30 ft)', cost: 226.8 },
];

export default function DTFBYGangSheet() {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState<File>();
  const router = useRouter();
  const { addItem } = useCart();
  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleAddToCart = () => {
    if (file) {
      addItem({
        id: Date.now(),
        title: "Upload Your DTF Gang Sheet",
        price: selectedSize.cost,
        name: file.name,
        size: selectedSize.size,
        image: URL.createObjectURL(file),
        quantity,
      });
      router.push("/cart");
    }
  };

  return (
    <div className="bg-white md:w-7xl w-full rounded-md p-6 container flex items-center flex-col justify-center mx-auto my-8">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Image */}
        <div className="flex-1">
          <img
            src="/dtf-gang-sheetsninja-transfers-636629_1.png"
            alt="Product Preview"
            className="w-full object-contain"
          />
          <div className="mt-4">
            <h2 className="text-xl font-bold">{selectedSize.size}</h2>
            <p className="text-sm text-gray-500">
              Just pick the size your design fits within.
            </p>
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-semibold">Upload Your DTF Gang Sheet</h1>
          <p className="text-lg font-medium">
            ${selectedSize.cost.toFixed(2)} USD
          </p>

          <p className="text-sm text-gray-500">
            Shipping calculated at checkout.
          </p>

          {/* Size selection */}
          <div>
            <h4 className="font-semibold mb-2">Size</h4>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size, index) => (
                <div key={index}>
                  <button
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-md border rounded cursor-pointer ${
                      selectedSize === size
                        ? "gold-theme-btn text-white"
                        : "border-gray-300 text-gray-800"
                    }`}
                  >
                    {size.size.replace("x", " x ")}
                  </button>

                  {/* Insert <br> after every 3 buttons */}
                  {(index + 1) % 4 === 0 && <br key={`br-${index}`} />}
                </div>
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
          {/* {file && file.name && (
            <div className="flex flex-col items-center w-full">
              <Image
                src={URL.createObjectURL(file)}
                alt="Uploaded Image"
                width={800}
                height={500}
                className="mt-4"
              />
            </div>
          )} */}
          {file && file.name && (
            <div className="flex flex-col items-center w-full">
              <button
                onClick={handleAddToCart}
                className="text-sm mt-2 gold-theme-btn w-full p-3 text-white font-semibold rounded-md cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          )}
          <div className="py-4 text-xs flex flex-col gap-1">
            <p className="">Pickup available at 4611 East 11th Street</p>
            <p>Usually ready in 24 hours</p>
            <p className="underline italic cursor-pointer">
              View store information
            </p>
          </div>

          <Accordion />
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
          design&apos;s impact—whether it&apos;s a small emblem or a bold,
          full-scale graphic—perfectly fitted to its intended garment.
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
