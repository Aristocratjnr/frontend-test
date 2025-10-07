"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Menu, ShoppingCart, Bell, X, MapPin } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNotifications } from '../contexts/NotificationContext';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [paymentData, setPaymentData] = useState({
    name: '',
    phoneNumber: '+233',
    momoNumber: '+233',
    deliveryLocation: ''
  });
  const [isMomoSameAsPhone, setIsMomoSameAsPhone] = useState(true);
  const { getTotalItems } = useCart();
  const router = useRouter();
  const cartItemCount = getTotalItems();
  const { unreadCount, notifications, markAsRead, markAllAsRead } = useNotifications();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.dropdown-container')) {
        setIsProfileDropdownOpen(false);
        setIsNotificationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Set client-side flag to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    // Clear authentication data - Note: localStorage not available in artifacts
    // In production, this would clear auth tokens

    // Close dropdown
    setIsProfileDropdownOpen(false);

    // Redirect to login page
    router.push('/auth/signin');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/Syst/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');

    // Handle Ghanaian phone number format: +233 XX XXX XXXX
    if (digits.length <= 3) {
      return digits.startsWith('233') ? `+${digits}` : `+233${digits}`;
    } else if (digits.length <= 5) {
      return `+${digits.slice(0, 3)} ${digits.slice(3)}`;
    } else if (digits.length <= 8) {
      return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5)}`;
    } else {
      return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 12)}`;
    }
  };

  const handlePhoneNumberChange = (field: 'phoneNumber' | 'momoNumber') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPaymentData({ ...paymentData, [field]: formatted });
  };

  const validateGhanaPhoneNumber = (phoneNumber: string): boolean => {
    // Ghana phone number pattern: +233 XX XXX XXXX
    const ghanaPhoneRegex = /^\+233\s[2-9][0-9]\s[0-9]{3}\s[0-9]{4}$/;
    return ghanaPhoneRegex.test(phoneNumber);
  };

  const handlePayment = () => {
    if (!paymentData.name || !paymentData.phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }

    if (!validateGhanaPhoneNumber(paymentData.phoneNumber)) {
      alert('Please enter a valid Ghanaian phone number (+233 XX XXX XXXX)');
      return;
    }

    if (paymentMethod === 'momo' && !paymentData.momoNumber) {
      alert('Please enter your Momo number');
      return;
    }

    if (paymentMethod === 'momo' && !validateGhanaPhoneNumber(paymentData.momoNumber)) {
      alert('Please enter a valid Ghanaian phone number for Momo (+233 XX XXX XXXX)');
      return;
    }

    if (deliveryOption === 'delivery' && !paymentData.deliveryLocation) {
      alert('Please enter your delivery location');
      return;
    }

    alert('Payment processed successfully!');
    setIsPaymentModalOpen(false);

    setPaymentData({
      name: '',
      phoneNumber: '+233',
      momoNumber: '+233',
      deliveryLocation: ''
    });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white backdrop-blur-md border-b border-gray-200/50 flex items-center justify-between px-4 sm:px-8 z-50 shadow-sm">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-800"
          aria-label="Open navigation menu"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div className="flex-shrink-0">
          <h1
            className="text-emerald-400 text-xl sm:text-2xl lg:text-4xl"
            style={{
              fontFamily: 'Carena',
              fontWeight: 400,
              fontStyle: 'normal',
              lineHeight: '120%',
              letterSpacing: '0px'
            }}
          >
            Syst
          </h1>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative flex items-center justify-center w-full">
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
              className="w-full pl-7 pr-12 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-white text-sm text-gray-900 placeholder-gray-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
         

          {/* Cart and Profile */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Cart Icon */}
            <div className="relative">
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 relative"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={20} />
                {isClient && cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>

             {/* Notification Bell */}
          <div className="relative dropdown-container">
            <button
              onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-expanded={isNotificationDropdownOpen}
              aria-haspopup="true"
            >
              <Bell size={20} className="text-gray-600" />
              {isClient && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>

            {isClient && isNotificationDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      <Bell size={24} className="mx-auto mb-2 opacity-50" />
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' :
                            notification.type === 'error' ? 'bg-red-500' :
                            'bg-blue-500'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {new Date(notification.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

            {/* Profile Dropdown */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden bg-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                aria-expanded={isProfileDropdownOpen}
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <Image
                  src="/images/user.png"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
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
        </div>
      </nav>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-[100] transition-all duration-300"
            onClick={() => setIsPaymentModalOpen(false)}
          />

          {/* Modal */}
          <div className="fixed right-0 top-0 h-screen w-full sm:w-[500px] bg-white shadow-2xl z-[110] overflow-y-auto flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">Payment</h2>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors text-sm flex items-center gap-1"
                aria-label="Close"
              >
                <X size={16} />
                <span>Close</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 space-y-6">
              {/* Payment Details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Payment Details</h3>
                
                {/* Name */}
                <div className="mb-4">
                  <label className="block text-xs text-gray-600 mb-2">
                    Name*
                  </label>
                  <input
                    type="text"
                    placeholder="Kwame Dartey"
                    value={paymentData.name}
                    onChange={(e) => setPaymentData({ ...paymentData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-400 text-sm text-gray-900 placeholder:text-gray-400"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                  <label className="block text-xs text-gray-600 mb-2">
                    Phone number*
                  </label>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-md px-3 py-2">
                    <Image
                      src="/images/gh-flag.png"
                      alt="Ghana"
                      width={20}
                      height={15}
                      className="flex-shrink-0"
                    />
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-400">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input
                      type="tel"
                      placeholder="+233 20 123 4567"
                      value={paymentData.phoneNumber}
                      onChange={handlePhoneNumberChange('phoneNumber')}
                      className="flex-1 bg-transparent outline-none text-sm text-gray-900"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Select Payment Method */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Select Payment method</h3>
                
                <div className="flex gap-6 items-center">
                  {/* Momo */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="momo"
                      checked={paymentMethod === 'momo'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-[#069B5C] border-gray-300 focus:ring-[#069B5C]"
                    />
                    <span className="text-sm text-gray-900">Momo</span>
                  </label>

                  {/* Card */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-[#069B5C] border-gray-300 focus:ring-[#069B5C]"
                    />
                    <span className="text-sm text-gray-900">Card</span>
                  </label>

                  {/* Cash on delivery */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-[#069B5C] border-gray-300 focus:ring-[#069B5C]"
                    />
                    <span className="text-sm text-gray-900">Cash on delivery</span>
                  </label>
                </div>

                {/* Momo Number Input */}
                {paymentMethod === 'momo' && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-600 mb-3">Is your Momo number the same as your phone number?</p>

                    <div className="flex gap-6 items-center mb-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="momoSameAsPhone"
                          checked={isMomoSameAsPhone === true}
                          onChange={(e) => {
                            setIsMomoSameAsPhone(e.target.checked);
                            if (e.target.checked) {
                              setPaymentData({ ...paymentData, momoNumber: paymentData.phoneNumber });
                            }
                          }}
                          className="w-4 h-4 text-[#069B5C] border-gray-300 focus:ring-[#069B5C]"
                        />
                        <span className="text-sm text-gray-900">Same as phone number</span>
                      </label>
                    </div>

                    {!isMomoSameAsPhone && (
                      <div>
                        <label className="block text-xs text-gray-600 mb-2">
                          Phone number*
                        </label>
                        <div className="flex items-center gap-2 bg-white rounded-md px-3 py-2 border border-gray-200">
                          <Image
                            src="/images/gh-flag.png"
                            alt="Ghana"
                            width={20}
                            height={15}
                            className="flex-shrink-0"
                          />
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-400">
                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <input
                            type="tel"
                            placeholder="+233 20 123 4567"
                            value={paymentData.momoNumber}
                            onChange={handlePhoneNumberChange('momoNumber')}
                            className="flex-1 bg-transparent outline-none text-sm text-gray-900"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Delivery Details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Delivery Details</h3>
                
                <p className="text-xs text-gray-600 mb-3">Select delivery option</p>
                
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() => setDeliveryOption('delivery')}
                    className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                      deliveryOption === 'delivery'
                        ? 'bg-emerald-400 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Delivery
                  </button>
                  <button
                    onClick={() => setDeliveryOption('pickup')}
                    className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                      deliveryOption === 'pickup'
                        ? 'bg-emerald-400 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Pick up
                  </button>
                </div>

                {/* Delivery Location */}
                {deliveryOption === 'delivery' && (
                  <div className="bg-[#FFDEB642] rounded-md p-3">
                    <label className="block text-xs text-gray-600 mb-2">
                      Delivery location
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Circle"
                        value={paymentData.deliveryLocation}
                        onChange={(e) => setPaymentData({ ...paymentData, deliveryLocation: e.target.value })}
                        className="w-full px-3 py-2 pr-20 bg-[#FFDEB642] border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-400 text-sm text-gray-900 placeholder:text-gray-900"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 flex items-center gap-1"
                        aria-label="Change location"
                      >
                        <span className="text-xs">Change</span>
                        <MapPin size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer with Button */}
            <div className="border-t border-gray-200 p-6 bg-white">
              <button
                onClick={handlePayment}
                className="w-full py-3 bg-emerald-400 text-white rounded-full hover:bg-emerald-500 font-medium transition-colors text-sm"
              >
                Continue to Pay
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}