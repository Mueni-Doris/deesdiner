"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { Inter, Lobster, Satisfy } from "next/font/google";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });
const lobster = Lobster({ subsets: ["latin"], weight: "400" });
const satisfy = Satisfy({ subsets: ["latin"], weight: "400" });

const images = ["/food.jpg", "/food2.jpg", "/food22.jpg"];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-amber-50" >
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        {/* Slider */}
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 flex flex-col items-center justify-center text-center px-6">
          <h1
            className={`${lobster.className} text-5xl md:text-7xl text-white mb-6 drop-shadow-lg`}
          >
            Welcome to Dining in Royale
          </h1>

          <p
            className={`${satisfy.className} text-xl md:text-3xl text-white max-w-2xl mb-2`}
          >
            Where you get a taste of your home in every bite you take.
          </p>

          <p
            className={`${satisfy.className} text-lg md:text-2xl text-white max-w-2xl`}
          >
            Every meal is made with a touch of the culture in it.
          </p>

          <Link
            href="/menu"
            className={`${inter.className} mt-8 inline-block px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white text-lg rounded-xl shadow-lg transition-all`}
          >
            Explore Menu
          </Link>

                    <Link
            href="/reservations"
            className={`${inter.className} mt-8 inline-block px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white text-lg rounded-xl shadow-lg transition-all`}
          >
            Reserve a table
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
