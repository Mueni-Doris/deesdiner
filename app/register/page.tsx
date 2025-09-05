'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Inter, Lobster } from 'next/font/google';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer'; 

// 🎨 Fonts
const inter = Inter({ subsets: ['latin'] });
const lobster = Lobster({ subsets: ['latin'], weight: '400' });

export default function RegisterPage() {
  const [full_name, setFullName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name,
          phone_number,
          email,
          password,
          role: "user",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Server error:", data.error);
        throw new Error(data.message || "Something went wrong");
      }

      alert(data.message);
      if (data.success) {
        router.push('/login');
      }
    } catch (err: any) {
      console.error("Registration failed:", err);
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4">
        <form
          onSubmit={handleRegister}
      className="px-6 backdrop-blur-md border border-amber-500 p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-6"
        >
          {/* Title */}
          <h2 className={`text-4xl font-bold text-center text-yellow-800 tracking-wide ${lobster.className}`}>
            Create Account
          </h2>
 

          {/* Inputs */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit phone number"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-3 rounded-xl font-semibold hover:bg-yellow-700 transition duration-200 shadow-md"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          {/* Switch to login */}
          <p className={`text-sm text-center text-gray-700 ${inter.className}`}>
            Already have an account?{' '}
            <Link href="/login" className="text-yellow-700 hover:underline font-medium">
              Login here
            </Link>
          </p>
        </form>
      </main>

      <Footer />
    </div>
  );
}
