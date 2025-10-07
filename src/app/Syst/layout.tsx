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
      <main className="lg:ml-80 lg:mt-16 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
