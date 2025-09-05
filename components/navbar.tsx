'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // useEffect(() => {
  //   const checkSession = async () => {
  //     try {
  //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check-session`, {
  //         credentials: 'include',
  //       });
  //       // if (!res.ok) throw new Error("Failed to check session");

  //       const data = await res.json();
  //       setIsLoggedIn(data.loggedIn);
  //     } catch (err) {
  //       console.error('Session check failed:', err);
  //       setIsLoggedIn(false);
  //     }
  //   };

  //   checkSession();
  // }, []);

  return (
    <nav className="bg-white p-4 flex justify-between items-center shadow-md">
      {/* Logo / Branding */}
      <div className="text-3xl font-bold text-amber-600">
        👩🏽‍🍳 Dining in Royale
      </div>

      {/* Navigation Links */}
<div className="flex items-center gap-8 text-lg font-medium">
  {[
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/reservations", label: "Reservations" },
  ].map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className="relative group"
    >
      {link.label}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
    </Link>
  ))}

  {isLoggedIn === false && (
    <Link href="/login" className="relative group">
      Login
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
    </Link>
  )}

  {isLoggedIn && (
    <Link href="/logout" className="relative group">
      Logout
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
    </Link>
  )}
</div>

    </nav>
  );
}
