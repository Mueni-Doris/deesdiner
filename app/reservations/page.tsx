"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ReservationForm() {
  const router = useRouter();

  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  // Optional: check session on mount
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("http://localhost/deesdiner-backend/check_session.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.status === "error" && data.redirect) {
          router.push(data.redirect);
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkLogin();
  }, [router]);

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reservationDate || !reservationTime || !numberOfGuests) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost/deesdiner-backend/reservations.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          reservation_date: reservationDate,
          reservation_time: reservationTime,
          number_of_guests: numberOfGuests,
          restaurant_id: 2, // your restaurant ID
        }),
      });

      const data = await res.json();

      if (data.status === "error") {
        toast.error(data.message);
        if (data.redirect) {
          setTimeout(() => router.push(data.redirect), 500);
        }
      } else {
        toast.success(data.message || "Reservation successful ✨");
        setTimeout(() => router.push("/profile"), 500);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
<>
  
  <div className="min-h-screen flex flex-col items-center bg-amber-50 px-4 py-10">
    <Navbar />
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center text-amber-800">
        Make a Reservation
      </h2>

      <form onSubmit={handleReserve} className="space-y-4">
        <input
          type="date"
          value={reservationDate}
          onChange={(e) => setReservationDate(e.target.value)}
          min={today}
          className="w-full text-amber-950 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
        />


        <div>
          <label className="block font-medium mb-1 text-gray-700">Time</label>
          <input
            type="time"
            value={reservationTime}
            onChange={(e) => setReservationTime(e.target.value)}
            className="w-full text-amber-950 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-gray-700">Number of Guests</label>
          <input
            type="number"
            min={1}
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
            className="w-full text-amber-950 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 text-white py-2 rounded-lg font-semibold hover:bg-amber-600 transition duration-200 shadow-sm"
        >
          {loading ? "Booking..." : "Reserve"}
        </button>
      </form>
    </div>
  </div>
  <Footer />
</>

  );
}
