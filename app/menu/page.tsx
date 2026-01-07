"use client";

import Navbar from "@/components/navbar";
import Image from "next/image";
import Footer from "@/components/footer";

export default function Menu() {
  // Array of menu images (each image is the full menu for that category)
  const menuImages = [
    { title: "Hot Drinks", image: "/breakfast.png" },
    { title: "Soft Drinks", image: "/brunch.jpeg" },
    { title: "Desserts", image: "/desserts.jpeg" },
    { title: "Main Courses", image: "/Juices.jpeg" },
    // Add more full menu images here
  ];

  return (
    <main className="min-h-screen flex flex-col bg-amber-50">
      <Navbar />
      <section className="px-6 py-12 flex flex-col items-center gap-10">
        {menuImages.map((menu, index) => (
          <div
            key={index}
            className="relative w-full max-w-3xl rounded-2xl shadow-lg overflow-hidden"
          >
            <Image
              src={menu.image}
              alt={menu.title}
              width={800}
              height={1200}
              className="object-cover rounded-2xl"
            />
          </div>
        ))}
      </section>

      <Footer />
    </main>
  );
}
