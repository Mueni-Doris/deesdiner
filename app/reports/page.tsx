"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Footer from "@/components/footer";


 interface Restaurant {
  restaurant_id: number;
  restaurant_name: string;
  owner_name: string;
  owner_email: string;
  reservations_count: number;
}



export default function ReportsPage() {
  const [items, setItems] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await fetch("http://localhost/deesdiner-backend/reports.php", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "❌ Failed to fetch reports");
        return;
      }

      setItems(data.restaurants);
    } catch (err) {
      toast.error("Something went wrong fetching the reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar at the top */}

   <main className="flex-grow max-w-5xl mx-auto w-full p-6">
  <h1 className="text-2xl font-bold mb-6 text-gray-800">Reports</h1>

  {loading ? (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-500 animate-pulse">Fetching reports...</p>
    </div>
  ) : items.length === 0 ? (
    <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg bg-white shadow-sm">
      <p className="text-gray-500">No reports available 🥲</p>
    </div>
  ) : (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full text-sm text-left border border-gray-200">
        <thead className="bg-gradient-to-r from-amber-800 to-amber-500 text-white">
          <tr>
            <th className="px-6 py-3 font-semibold">Restaurant</th>
            <th className="px-6 py-3 font-semibold">Owner</th>
            <th className="px-6 py-3 font-semibold">Owner Email</th>
            <th className="px-6 py-3 font-semibold text-center">
              Reservations
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((r, idx) => (
            <tr
              key={r.restaurant_id}
              className={`${
                idx % 2 === 0 ? "bg-gray-50 text-amber-950" :"bg-white" 
              } hover:bg-indigo-50 transition`}
            >
              <td className="px-6 py-3 border-t">{r.restaurant_name}</td>
              <td className="px-6 py-3 border-t">{r.owner_name}</td>
              <td className="px-6 py-3 border-t">{r.owner_email}</td>
              <td className="px-6 py-3 border-t text-center font-semibold text-amber-600">
                {r.reservations_count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</main>


      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}
