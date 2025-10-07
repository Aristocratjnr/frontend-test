"use client";
import React, { useState } from "react";
import Navbar from './navbar';
import Sidebar from './sidebar';
import { CartProvider } from '../contexts/CartContext';

export default function SystLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="lg:ml-80 lg:mt-16 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </CartProvider>
  );
}
