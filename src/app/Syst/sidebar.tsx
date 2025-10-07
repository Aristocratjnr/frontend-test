'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, ShoppingCart, BarChart3 } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: 'Home',
      icon: Home,
      href: '/Syst/home',
    },
    {
      name: 'Products',
      icon: ShoppingBag,
      href: '/Syst/products',
    },
    {
      name: 'Order',
      icon: ShoppingCart,
      href: '/Syst/orders',
    },
    {
      name: 'Report',
      icon: BarChart3,
      href: '/Syst/reports',
    },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 p-4">
      {/* Logo */}
      <div className="mb-8">
       
      </div>

      {/* Menu Items */}
      <nav className="space-y-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const IconComponent = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                isActive
                  ? 'bg-emerald-400 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <IconComponent size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}