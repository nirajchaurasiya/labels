"use client";

import React, { useState } from "react";

export default function Contact() {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  console.log(status);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fname, email, message }),
      });

      if (res.ok) {
        setFname("");
        setEmail("");
        setMessage("");
        setStatus("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong");
        setStatus("error");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong");
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  // Button classes dynamically change color
  const getButtonClasses = () => {
    switch (status) {
      case "loading":
        return "bg-gray-400 cursor-not-allowed";
      case "success":
        return "bg-green-500 hover:bg-green-600";
      case "error":
        return "bg-red-500 hover:bg-red-600 animate-shake";
      default:
        return "gold-theme-bg hover:bg-indigo-700";
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <form onSubmit={handleSubmit} className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Feel free to reach out with any questions or concerns. We are here
              to help you with your DTF transfer needs.
            </p>
          </div>

          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              {/* Name */}
              <div className="p-2 w-full md:w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    className={`w-full bg-gray-100 bg-opacity-50 rounded border text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${
                      status === "error" && !fname
                        ? "border-red-500"
                        : "gold-theme-color"
                    }`}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="p-2 w-full md:w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-gray-100 bg-opacity-50 rounded border text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${
                      status === "error" && !email
                        ? "border-red-500"
                        : "gold-theme-color"
                    }`}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="p-2 w-full">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full bg-gray-100 bg-opacity-50 rounded border h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out ${
                      status === "error" && !message
                        ? "border-red-500"
                        : "gold-theme-color"
                    }`}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="p-2 w-full">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`flex w-full justify-center mx-auto text-white border-0 py-2 px-8 focus:outline-none rounded text-lg transition-colors duration-200 ${getButtonClasses()}`}
                >
                  {status === "loading"
                    ? "Sending..."
                    : status === "success"
                    ? "Sent!"
                    : status === "error"
                    ? "Error!"
                    : "Submit"}
                </button>
              </div>

              {/* Feedback messages */}
              {status === "success" && (
                <p className="w-full text-center text-green-600 mt-2">
                  Your message was sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="w-full text-center text-red-600 mt-2">
                  {errorMsg || "Failed to send message."}
                </p>
              )}

              {/* Contact Info */}
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a
                  href="mailto:labelsdtf@yahoo.com"
                  target="_blank"
                  className="gold-theme-color"
                >
                  labelsdtf@yahoo.com
                </a>
                <p className="leading-normal my-5">2621 E Nettleton</p>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
