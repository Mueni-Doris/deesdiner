'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";



export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Both fields are required');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      console.log('Raw response text:', text);

      if (!res.ok) {
        throw new Error(`Server error: ${res.status} - ${text}`);
      }

      const data = await res.json();
      console.log('Parsed response:', data);

      if (data.success) {
        toast.success('Welcome back ✨');
        const role = data.user?.role;

        setTimeout(() => {
          if (role === 'admin') {
            router.push('/reports');
          } else {
            router.push('/cart');
          }
        }, 500);
      } else {
        toast.error(data.message || 'Invalid login 😶');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Server error. Please try again.');
    }
  };

  return (
<div className="min-h-screen flex flex-col bg-amber-50">
  <Navbar />

  <main className="flex-grow flex items-center justify-center px-4">
    <form
      onSubmit={handleLogin}
      className="px-6 backdrop-blur-md border border-amber-500 p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-6"
    >
        <h2 className="text-4xl font-extrabold text-center text-yellow-800 tracking-wide font-serif">
        Dining in Royale        </h2>
        <p className="text-center text-gray-600">Welcome back, dear guest ✨</p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-3 rounded-xl font-semibold hover:bg-yellow-700 transition duration-200 shadow-md"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-700">
          Don’t have an account?{' '}
          <a href="/register" className="underline text-yellow-700 hover:text-yellow-800">
            Sign up
          </a>
        </p>
      </form>
      </main>
              <Footer />

    </div>
    
  );
  
}
