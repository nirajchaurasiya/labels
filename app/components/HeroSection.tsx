// components/HeroSection.jsx
"use client";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative gold-theme-bg overflow-hidden">
      <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-evenly">
        {/* Left Text Section */}
        <div className="text-white max-w-xl">
          <h1 className="text-6xl font-bold leading-tight">
            QUALITY <br /> TRANSFERS <br /> QUALITY PRINTING
          </h1>
          <p className="mt-4 text-lg">
            <span className="font-semibold">ORDER YOUR TRANSFERS TODAY</span>{" "}
            AND SEE THE DIFFERENCE
          </p>
          <Link
            href="/services/all"
            className="mt-6 inline-block font-semibold px-6 py-3 rounded-sm bg-white gold-theme-color shadow transition"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Image Section */}
        <div className="relative mt-10 lg:mt-0 lg:w-1/2 overflow-hidden">
          <div className="animate-slowFloat">
            <Image
              src="/backdrop.png"
              alt="Printing Designs"
              width={1000}
              height={1100}
              className="object-contain w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
