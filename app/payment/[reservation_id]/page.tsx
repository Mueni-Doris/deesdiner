"use client";



import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


export default function ThankYouPage() {
  const router = useRouter();
  const { reservation_id } = useParams();

  useEffect(() => {
    // Call backend to update reservation status
    const confirmPayment = async () => {
      try {
        const res = await fetch("http://localhost/deesdiner-backend/complete_payment.php", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reservation_id }),
        });

        const data = await res.json();
        console.log("Payment confirmation:", data);
      } catch (error) {
        console.error("Error confirming payment:", error);
      }
    };

    if (reservation_id) {
      confirmPayment();
    }

    // Auto-redirect after 3s
    const timer = setTimeout(() => {
      router.push("/profile"); // redirect back to profile page
    }, 10000);

    return () => clearTimeout(timer);
  }, [reservation_id, router]);

  return (
    <>
   
    <div className="min-h-screen flex flex-col items-center justify-center bg--50 text-center px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-black-800">
        Thank You for Your Purchase 🤗🤗
      </h1>
      <p className="mt-4 text-brown-700 text-lg">
        Your order has been placed
        successfully. Kindly check your email for the details of your reservation.
      </p>
      <p className="mt-2 text-sm text-orange-800">
        You’ll be redirected to your profile shortly.
      </p>

      <button
        onClick={() => router.push("/profile")}
        className="mt-6 px-6 py-2 rounded-full bg-orange-300 hover:bg-orange-200 text-white transition"
      >
        Go to Profile
      </button>
    </div>
    </>
  );
}
