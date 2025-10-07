'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, ShoppingCart, BarChart3 } from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && sidebarRef.current) {
      // Focus the close button when sidebar opens
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Trap focus within sidebar when open
  useEffect(() => {
    if (!isOpen || !sidebarRef.current) return;

    const focusableElements = sidebarRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusableElement = focusableElements[0] as HTMLElement;
    const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement?.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement?.focus();
          event.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

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
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-80 bg-white border-r border-gray-200 shadow-sm">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm border border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-gray-100 text-gray-600 group-hover:bg-emerald-50 group-hover:text-emerald-600'
                  }`}>
                    <IconComponent size={18} />
                  </div>
                  <span className="font-medium text-sm">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-emerald-400 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 bg-gray-50/30">
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <aside
          ref={sidebarRef}
          className="lg:hidden fixed left-0 top-16 bottom-0 w-80 bg-white shadow-2xl z-50 border-r border-gray-200"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            </div>

            {/* Menu Items */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`group w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm border border-transparent'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: 'slideInLeft 0.3s ease-out forwards'
                    }}
                  >
                    <div className={`p-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-gray-100 text-gray-600 group-hover:bg-emerald-50 group-hover:text-emerald-600'
                    }`}>
                      <IconComponent size={18} />
                    </div>
                    <span className="font-medium text-sm">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 bg-gray-50/30">
            </div>
          </div>

          <style jsx>{`
            @keyframes slideInLeft {
              from {
                opacity: 0;
                transform: translateX(-20px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}</style>
        </aside>
      )}
    </>
  );
}