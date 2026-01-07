"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    toast("Login button clicked");
    if (!email.trim() || !password.trim()) {
      toast.error("Both fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost/deesdiner-backend/login.php", {
        method: "POST",
        // This is necessary for the browser to send the session cookie to localhost
        credentials: "include", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
if (data.status === "success") {
  window.dispatchEvent(new Event("sessionChanged"));

  toast.success("Welcome back ✨");

  localStorage.setItem('session_id', data.session_id);

const role = data.user?.role;

setTimeout(() => {
  if (role === "admin") {
    router.push("/reports");      // Admin dashboard
  } else if (role === "owner") {
    router.push("/owner-dashboard"); // Owner dashboard
  } else if (role === "user") {
    router.push("/menu");         // Normal user
  } else {
    toast.error("Unknown role");  // fallback
  }
}, 500);

} else {
  toast.error(data.message || "Invalid login 😶");
}

    } catch (err: any) {
      console.error("Login error:", err);
      if (err.message.includes("Failed to fetch")) {
        toast.error("Server unreachable. Check your PHP backend.");
      } else {
        toast.error(err.message || "Server error. Please try again.");
      }
    } finally {
      setLoading(false);
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
            Dining in Royale
          </h2>
          <p className="text-center text-gray-600">
            Welcome back, dear guest ✨
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-white-900 text-black placeholder-gray-400 p-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full bg-white-900 text-black placeholder-gray-400 p-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition mt-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 text-white py-3 rounded-xl font-semibold hover:bg-yellow-700 transition duration-200 shadow-md disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-sm text-center text-gray-700">
            Don’t have an account?{" "}
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