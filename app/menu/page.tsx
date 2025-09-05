"use client";

import Navbar from "@/components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";

export default function Menu() {
  const categories = [
    {
      title: "Iced and Soft Drinks",
      image: "/coffee.jpg",
      items: [
        { name: "Iced Tea", price: "220/-" },
        { name: "Iced Coffee", price: "240/-" },
        { name: "Iced Cappuccino", price: "320/-" },
        { name: "Iced Mocha", price: "450/-" },
        { name: "Mint Punch", price: "330/-" },
        { name: "Lemonade", price: "320/-" },
        { name: "Flavoured Lemonade", price: "470/-" },
      ],
    },
    {
      title: "Hot Drinks",
      image: "/hot.jpg",
      items: [
        { name: "Espresso", price: "210/-" },
        { name: "Cappuccino", price: "260/-" },
        { name: "Mocha", price: "320/-" },
        { name: "Americano", price: "200/-" },
        { name: "Latte", price: "290/-" },
      ],
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-amber-50" >
        
      <Navbar />
      <section className="px-6 py-12 min-h-screen flex flex-col items-center gap-10" >

      {categories.map((category, index) => (
        <div
          key={index}
          className="relative w-full max-w-2xl rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Background image */}
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-brightness-75" />

          {/* Content */}
          <div className="relative p-6 text-white">
            <h2 className="text-3xl font-bold mb-4 text-center">
              {category.title}
            </h2>
            <ul className="space-y-3">
              {category.items.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between border-b border-gray-300/50 pb-2"
                >
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      </section>
      <Footer />

    </main>
    
  );
}
