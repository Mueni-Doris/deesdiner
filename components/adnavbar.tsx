'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function AdNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check session when navbar loads
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('http://localhost/deesdiner-backend/check_session.php', {
          credentials: 'include',
        });
        const data = await res.json();
        setIsLoggedIn(data.status === 'success');
      } catch (err) {
        console.error('Session check failed:', err);
        setIsLoggedIn(false);
      }
    };
    checkSession();
  }, []);

  // Handle logout with confirmation
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost/deesdiner-backend/logout.php', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();

      if (data.status === 'success') {
        window.dispatchEvent(new Event("sessionChanged"));

        toast.success('Logged out successfully 👋🏽');
        setIsLoggedIn(false);
        setShowLogoutModal(false);
        setTimeout(() => router.push('/login'), 1500);
      } else {
        toast.error('Logout failed 😵');
      }
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('Something went wrong 💥');
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="bg-white p-4 flex justify-between items-center shadow-md relative">
      <div className="text-3xl font-bold text-amber-600">👩🏽‍🍳 Dining in Royale</div>
      <div className="space-x-4  text-amber-600 font-medium">
        <Link href="/">Home</Link>
        <Link href="/reports">Reports</Link>

        {!isLoggedIn && <Link href="/login">Login</Link>}
        {isLoggedIn && (
          <button
            onClick={() => setShowLogoutModal(true)}
            className="text-red-600 font-semibold hover:underline"
          >
            Logout
          </button>
        )}
      </div>

      {/* Logout confirmation modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl space-y-6 text-center">
            <h2 className="text-2xl font-bold text-amber-600">Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleLogout}
                disabled={loading}
                className={`bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-xl font-semibold transition duration-200 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Logging out...' : 'Yes, Logout'}
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-xl font-semibold transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
