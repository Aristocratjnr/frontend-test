"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken');
    sessionStorage.clear();

    // Clear any cookies if using cookie-based auth
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toISOString() + ";path=/");
    });

    // Close dropdown
    setIsProfileDropdownOpen(false);

    // Redirect to login page
    router.push('/auth/signin');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with query parameter
      router.push(`/Syst/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
      {/* Logo */}
      <div className="flex-shrink-0">
        <h1
          className="text-emerald-400"
          style={{
            fontFamily: 'Carena',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '40px',
            lineHeight: '120%',
            letterSpacing: '0px'
          }}
        >
          Syst
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-7 pr-12 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-white text-sm text-gray-900 placeholder-gray-400 text-center"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(e);
              }
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearch({} as React.FormEvent)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-emerald-400 hover:text-emerald-600"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-3">
        {/* Shopping Bag with Count */}
        <button className="bg-emerald-400 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-500 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span className="font-semibold text-sm">0</span>
        </button>

        {/* Notification Bell */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>

        {/* User Avatar with Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-1 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
              <Image
                src="/images/user.png"
                alt="User avatar"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="py-2">
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                  <div className="font-medium">David O.</div>
                  <div className="text-gray-500">d.obuobi@inkris.ca</div>
                </div>
                <button
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={handleLogout}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
