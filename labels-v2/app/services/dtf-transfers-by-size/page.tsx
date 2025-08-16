"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/app/context/useCartProvider";
import { v4 as uuidv4 } from "uuid";

const sizes = [
  { size: "2'' x2''", cost: 1.35 },
  { size: "3'' x3''", cost: 1.35 },
  { size: "4'' x2''", cost: 1.0 },
  { size: "4'' x4''", cost: 1.8 },
  { size: "5'' x3''", cost: 1.8 },
  { size: "5'' x5''", cost: 2.25 },
  { size: "6'' x6''", cost: 2.7 },
  { size: "7'' x7''", cost: 3.5 },
  { size: "8'' x8''", cost: 4.0 },
  { size: "9'' x9''", cost: 4.5 },
  { size: "9'' x11''", cost: 5.5 },
  { size: "11'' x5''", cost: 4.25 },
  { size: "11'' x11''", cost: 7.0 },
  { size: "11'' x14''", cost: 9.25 },
  { size: "12'' x17''", cost: 10.75 },
  { size: "12'' x12''", cost: 7.63 },
  { size: "15in x 3.6in", cost: 3.41 },
  { size: "10in x 11.9in", cost: 6.9 },
];

export default function DTFBYSize() {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [file, setFile] = useState<File>();
  const [uploadedUrl, setUploadedUrl] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [uniqueName, setUniqueName] = useState("");
  const router = useRouter();
  const { addItem } = useCart();

  const handleFileChange = async (e: any) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setUploadStatus("Uploading...");

    // Generate unique name
    const uniqueName = `${Date.now()}_${uuidv4()}_${selectedFile.name}`;
    setUniqueName(uniqueName);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("public_id", uniqueName); // Cloudinary will use this name

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.url) {
        setFile(selectedFile);
        setUploadedUrl(data.url);
        setUploadStatus("Upload successful ✅");
      } else {
        setUploadStatus("Upload failed ❌");
      }
    } catch (err) {
      console.error(err);
      setUploadStatus("Upload failed ❌");
    }
  };

  const handleAddToCart = () => {
    if (uploadedUrl && file) {
      console.log("Adding to cart", uploadedUrl, file);
      addItem({
        id: Date.now(),
        title: "DTF Transfers by Size",
        price: selectedSize.cost,
        name: uniqueName,
        size: selectedSize.size,
        image: uploadedUrl,
        quantity,
      });
      router.push("/cart");
    }
  };

  return (
    <div className="bg-white md:w-7xl w-full rounded-md p-6 container flex items-center flex-col justify-center mx-auto my-8">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Image */}
        <div className="flex-1 bg-gray-100 p-4">
          <img
            src="/backdrop.png"
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
          <h1 className="text-2xl font-semibold">DTF Transfers by Size</h1>
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
              <p className="mt-2 text-sm text-gray-800">
                Selected: {uniqueName}
              </p>
            )}
            {uploadStatus && (
              <p
                className={`mt-1 text-sm ${
                  uploadStatus.includes("successful")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {uploadStatus}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-2">Files supported: .png</p>
          </div>

          {/* Add to Cart */}
          {uploadedUrl && (
            <div className="flex flex-col items-center w-full">
              <button
                onClick={handleAddToCart}
                className="text-sm mt-2 gold-theme-btn w-full p-3 text-white font-semibold rounded-md cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
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
