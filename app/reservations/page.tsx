"use client";

import { useState, useEffect } from "react";
import { Inter, Lobster } from "next/font/google";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

// Fonts
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });
const lobster = Lobster({ weight: "400", subsets: ["latin"] });

export default function ReservationForm() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: 1,
  });

  // Load saved reservations on mount
  useEffect(() => {
    const saved = localStorage.getItem("reservations");
    if (saved) {
      setReservations(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever reservations change
  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }, [reservations]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReservations([...reservations, form]);
    setForm({ name: "", email: "", date: "", time: "", guests: 1 }); // reset
  };

  return (
    <section> 
        <Navbar/>
      <main
        className={`px-6 py-12 bg-stone-100 min-h-screen flex flex-col items-center gap-10 ${inter.className}`}
      >
        {/* Reservation Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg space-y-4"
        >
          <h2
            className={`${lobster.className} text-3xl text-center mb-4 text-black`}
          >
            Reserve a Table
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <div className="flex gap-4">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <input
            type="number"
            name="guests"
            min="1"
            value={form.guests}
            onChange={handleChange}
            required
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-800"
          >
            Reserve Table
          </button>
        </form>

 {/* Reservations List - only rendered if available */}
  {reservations.length > 0 && (
    <div className="mt-10 w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Your Reservations</h3>
      <ul className="space-y-3">
        {reservations.map((res, index) => (
          <li
            key={index}
            className="p-3 border rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{res.name}</p>
              <p className="text-sm text-gray-600">
                {res.date} at {res.time} — {res.guests} guest(s)
              </p>
            </div>
            <span className="text-xs text-gray-500">{res.email}</span>
          </li>
        ))}
      </ul>
    </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </section>
  );
}
