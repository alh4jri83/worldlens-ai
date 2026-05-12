import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import RealtimeTicker from "@/components/RealtimeTicker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "WorldLens AI | Global Intelligence",
  description: "See how the world interprets the same event. AI-powered global intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-world-bg text-world-text min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow relative overflow-hidden">
          {children}
        </main>
        <RealtimeTicker />
      </body>
    </html>
  );
}