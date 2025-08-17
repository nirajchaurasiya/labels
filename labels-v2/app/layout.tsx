import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout2 from "./layout2";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Labels - just pick your color and send it to us to print",
  description: "Labels - just pick your color and send it to us to print",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader
          color="#edd6ab"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #edd6ab,0 0 5px #edd6ab"
        />
        <Layout2>{children}</Layout2>
      </body>
    </html>
  );
}
