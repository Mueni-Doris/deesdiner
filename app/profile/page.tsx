"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
  phone_number: number;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "http://localhost/deesdiner-backend/get_profile.php",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();

        if (data.status === "success") {
          setUser(data.user);
          setReservations(data.reservations);
        } else {
          toast.error(data.message || "Please log in.");
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

  if (loading) return <div>Loading profile...</div>;
  if (!user) return <div>Please log in...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Account Details</h2>
          <p><b>Name:</b> {user.full_name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone number:</b> {user.phone_number}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">My Reservations</h2>
          {reservations.length === 0 ? (
            <p>No reservations yet.</p>
          ) : (
            <ul className="space-y-4">
              {reservations.map(res => (
                <li key={res.reservation_id} className="p-4 border rounded-md">
                  <p><b>Restaurant:</b> {res.restaurant_name}</p>
                  <p><b>Date:</b> {res.reservation_date}</p>
                  <p><b>Time:</b> {res.reservation_time}</p>
                  <p><b>Guests:</b> {res.number_of_guests}</p>
                  <p><b>Status:</b> {res.status}</p>
                  <button
                    className="mt-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                    onClick={() => router.push(`/profile/payment/${res.reservation_id}`)}
                  >
                    Make Payment
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
