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

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Make a Reservation</h1>
        <form onSubmit={handleReserve} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Date</label>
            <input
              type="date"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Time</label>
            <input
              type="time"
              value={reservationTime}
              onChange={(e) => setReservationTime(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Number of Guests</label>
            <input
              type="number"
              min={1}
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            {loading ? "Booking..." : "Reserve"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
