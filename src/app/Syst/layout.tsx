import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

export default function SystLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      <main className="ml-56 mt-16 p-8">
        {children}
      </main>
    </div>
  );
}
