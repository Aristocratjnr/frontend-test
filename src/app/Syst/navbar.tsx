import React from 'react';
import Image from 'next/image';
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
      {/* Logo */}
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold text-emerald-400" style={{ fontFamily: 'Georgia, serif' }}>
          Syst
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-gray-50 text-sm placeholder-gray-400"
          />
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
        <button className="flex items-center gap-1 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors">
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
      </div>
    </nav>
  );
}