'use client';

import { useEffect, useState } from "react";
import AdNavbar from "@/components/adnavbar";
import Navbar from '@/components/navbar';

export default function NavbarSwitcher() {
  const [role, setRole] = useState<string | null>(null);

  const checkSession = async () => {
    try {
      const res = await fetch("http://localhost/deesdiner-backend/check_session.php", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.status === "success") {
        setRole(data.role);
      } else {
        setRole(null);
      }
    } catch {
      setRole(null);
    }
  };

  useEffect(() => {
    checkSession();

    // 👇 Listen for a "sessionChanged" event
    window.addEventListener("sessionChanged", checkSession);
    return () => window.removeEventListener("sessionChanged", checkSession);
  }, []);

  if (role === null) return <Navbar />; // default fallback

  return role === "admin" || role === "owner" ? <AdNavbar /> : <Navbar />;
}
