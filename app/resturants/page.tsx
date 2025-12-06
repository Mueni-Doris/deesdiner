"use client";

import { useEffect, useState } from "react";

export default function AddRestaurant() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const [ownerId, setOwnerId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Fetch logged-in user info on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost/deesdiner-backend/check_session.php", {
          credentials: "include",
        });

        console.log("Session response status:", res.status);
        const data = await res.json();
        console.log("Session response data:", data);

        if (data.status === "success" && data.user_id) {
          setOwnerId(data.user_id);
        } else {
          console.warn("⚠️ No user session found or invalid data:", data);
        }
      } catch (err) {
        console.error("Session check failed:", err);
      }
    };

    fetchUser();
  }, []);

  // 🔹 Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!ownerId) {
      setMessage("⚠️ Please log in before adding a restaurant.");
      setLoading(false);
      return;
    }

    const payload = { ...formData, owner_id: ownerId };

    try {
      const res = await fetch("http://localhost/deesdiner-backend/add_restaurant.php", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("Add Restaurant response status:", res.status);
      const data = await res.json();
      console.log("Server response:", data);

      if (data.status === "success") {
        setMessage("✅ Restaurant added successfully!");
        setFormData({
          name: "",
          location: "",
          address: "",
          latitude: "",
          longitude: "",
        });
      } else {
        console.error("PHP Error:", data.message);
        setMessage("⚠️ " + (data.message || "Something went wrong"));
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setMessage("❌ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg text-amber-950"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center text-amber-900">
          Add New Restaurant
        </h1>

        {/* 🗺️ Google Maps Ready Fields */}
        <div className="grid grid-cols-2 gap-4">

            {/* here in the input fields below, nimetoa latitudes na longitudes  */}
          {["name", "location", "address"].map((field) => (
            <input
              key={field}
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              placeholder={
                field === "latitude"
                  ? "Latitude (optional)"
                  : field === "longitude"
                  ? "Longitude (optional)"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              required={!["latitude", "longitude"].includes(field)}
              className={`border border-amber-200 rounded-lg p-2 placeholder-amber-300 text-amber-800 focus:ring focus:ring-amber-400 outline-none ${
                field === "address" ? "col-span-2" : ""
              }`}
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-amber-950 text-white py-2 rounded-lg hover:bg-amber-900 transition"
        >
          {loading ? "Adding..." : "Add Restaurant"}
        </button>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("✅")
                ? "text-green-600"
                : message.includes("❌")
                ? "text-red-600"
                : "text-amber-800"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
