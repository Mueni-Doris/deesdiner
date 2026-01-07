"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

type Reservation = {
  reservation_id: number;
  restaurant_name: string;
  reservation_date: string;
  reservation_time: string;
  number_of_guests: number;
  status: string;
};

type User = {
  user_id: number;
  full_name: string;
  email: string;
  phone_number: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
const fetchProfile = async () => {
  try {
    const res = await fetch("http://localhost/deesdiner-backend/get_profile.php", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();

    if (data.success) {
      setUser(data.user);
      setReservations(data.reservations || []);
    } else {
      toast.error(data.error || "Please log in.");
      router.push("/login");
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to fetch profile. Try again later.");
  } finally {
    setLoading(false);
  }
};

    fetchProfile();
  }, [router]);

  if (loading) return <div className="text-center mt-20">Loading profile...</div>;
  if (!user) return <div className="text-center mt-20">Please log in...</div>;

  return (
    <>
     

      <div className="min-h-screen flex flex-col items-center bg-amber-50 px-4 py-10">
            <Navbar />
        <div className="px-6 backdrop-blur-md border border-amber-500 p-10 rounded-3xl shadow-2xl w-full max-w-3xl space-y-8">
          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-yellow-800 tracking-wide flex flex-col items-center gap-4">
            <span className="bg-yellow-600 text-black p-4 rounded-full shadow-lg flex items-center justify-center text-4xl">
              <FontAwesomeIcon icon={faUser} />
            </span>
            Hello {user.full_name}
          </h1>

          {/* Account Details */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold mb-2 text-yellow-800">Account Details</h2>
            <p className="text-black italic"><b>Email:</b> {user.email}</p>
            <p className="text-black italic"><b>Phone number:</b> {user.phone_number}</p>
          </div>

          {/* Reservations */}
<div className="space-y-2">
  <h2 className="text-xl font-semibold mb-2 text-yellow-800">My Reservations</h2>
  {reservations.length === 0 ? (
    <p className="text-gray-600 italic">You don’t have any reservations yet.</p>
  ) : (
    <ul className="space-y-4">
      {reservations.map((res) => (
        <li
          key={res.reservation_id}
          className="p-4 border border-gray-300 rounded-xl shadow-sm bg-amber-50"
        >
          <p><b>Restaurant:</b> {res.restaurant_name}</p>
          <p><b>Date:</b> {res.reservation_date}</p>
          <p><b>Time:</b> {res.reservation_time}</p>
          <p><b>Guests:</b> {res.number_of_guests}</p>
          <p>
            <b>Status:</b>{" "}
            <span
              className={`px-2 py-1 rounded-lg text-sm font-semibold ${
                res.status === "Success"
                  ? "bg-green-100 text-green-700"   // Paid
                  : res.status === "Confirmed"
                  ? "bg-blue-100 text-blue-700"    // Admin confirmed
                  : res.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {res.status}
            </span>
          </p>

          {/* Show button only if status is NOT Success */}
          {res.status !== "Success" && (
            <button
              className="mt-3 w-full bg-yellow-600 text-white py-2 rounded-xl font-semibold hover:bg-yellow-700 transition duration-200"
              onClick={() => router.push(`/payment/${res.reservation_id}`)}
            >
              Make Payment
            </button>
          )}
        </li>
      ))}
    </ul>
  )}
</div>

        </div>
      </div>

      <Footer />
    </>
  );
}
