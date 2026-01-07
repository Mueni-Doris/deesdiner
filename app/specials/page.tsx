'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('image', imageFile);

    try {
      const response = await fetch(`http://localhost:5000/specials/food/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Server error details:", data.error);
        throw new Error(data.message || "Something went wrong");
      }

      alert("Success! 🎉 " + data.message);
      router.push('/reports');

    } catch (err: unknown) {
      console.error("Fetch error:", err);
      alert("Failed to add food: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="bg-white-200 p-8 rounded-2xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Add Specials 🍲</h2>

        {/* Food Name */}
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Description */}
        <input
          type="text"
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Category */}
        <select
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          <option value="African">African</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
        </select>

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />



        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-900"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImageFile(file);
          }}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-3 rounded-xl hover:bg-amber-900 transition"
        >
          ADD FOOD
        </button>
      </form>
    </div>
  );
}
