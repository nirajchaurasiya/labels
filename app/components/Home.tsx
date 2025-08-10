import React from "react";
import FAQ from "./QnA";
import { useRouter } from "next/navigation";
import HeroSection from "./HeroSection";
import HeatPressInstructions from "./HeatPressInstructions";
export default function Home() {
  const router = useRouter();

  return (
    <section className="text-gray-600 body-font">
      <HeroSection />
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            LABELS
            <br className="hidden lg:inline-block" />
          </h1>
          <p className="mb-8 leading-relaxed">
            Labels is a premier printing service business proudly serving Kansas
            City, MO, and beyond. Specializing in high-quality custom prints, we
            offer a wide range of solutions tailored to meet the unique needs of
            individuals, small businesses, and organizations. From vibrant DTF
            transfers to custom apparel and promotional products, our team is
            committed to delivering exceptional results with attention to detail
            and a fast turnaround.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => {
                router.push("/about");
              }}
              className="cursor-pointer inline-flex text-white gold-theme-bg border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              About
            </button>
            <button
              onClick={() => {
                router.push("/contact");
              }}
              className="cursor-pointer ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
            >
              Contact Us
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="/1.jpg"
          />
        </div>
      </div>
      <HeatPressInstructions />

      <div className="container px-5 py-24 mx-auto">
        <FAQ />
      </div>
    </section>
  );
}
