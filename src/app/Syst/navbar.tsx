"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, ShoppingCart, Bell, X, ArrowLeft, MapPin } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [paymentData, setPaymentData] = useState({
    name: '',
    phoneNumber: '+233',
    momoNumber: '+233',
    deliveryLocation: ''
  });
  const { getTotalItems } = useCart();
  const router = useRouter();
  const cartItemCount = getTotalItems();

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

  const handlePayment = () => {
    // Validate form
    if (!paymentData.name || !paymentData.phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }

    if (paymentMethod === 'momo' && !paymentData.momoNumber) {
      alert('Please enter your Momo number');
      return;
    }

    if (deliveryOption === 'delivery' && !paymentData.deliveryLocation) {
      alert('Please enter your delivery location');
      return;
    }

    // Process payment
    alert('Payment processed successfully!');
    setIsPaymentModalOpen(false);
    
    // Reset form
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
                  handleSearch(e);
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
          {/* Shopping Bag with Count */}
          <button 
            onClick={() => setIsPaymentModalOpen(true)}
            className="bg-emerald-400 text-white px-2 sm:px-3 py-2 rounded-lg flex items-center gap-1 sm:gap-2 hover:bg-emerald-500 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span className="font-semibold text-xs sm:text-sm">0</span>
          </button>

          {/* Notification Bell */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} className="text-gray-600" />
          </button>

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
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
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
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                  aria-label="Back"
                >
                  <ArrowLeft size={20} />
                </button>
                <h2 className="text-lg font-semibold text-gray-900">Payment</h2>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 space-y-6">
              {/* Payment Details */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4">Payment Details</h3>
                
                {/* Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name*
                  </label>
                  <input
                    type="text"
                    placeholder="Kwame Shirley"
                    value={paymentData.name}
                    onChange={(e) => setPaymentData({ ...paymentData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone number*
                  </label>
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 focus-within:ring-2 focus-within:ring-emerald-400 focus-within:border-transparent">
                    <Image
                      src="/images/gh-flag.png"
                      alt="Ghana"
                      width={20}
                      height={15}
                      className="flex-shrink-0"
                    />
                    <input
                      type="tel"
                      value={paymentData.phoneNumber}
                      onChange={(e) => setPaymentData({ ...paymentData, phoneNumber: e.target.value })}
                      className="flex-1 outline-none text-gray-900"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Select Payment Method */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4">Select Payment method</h3>
                
                <div className="space-y-3">
                  {/* Momo */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="momo"
                      checked={paymentMethod === 'momo'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-emerald-400 border-gray-300 focus:ring-emerald-400"
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
                      className="w-4 h-4 text-emerald-400 border-gray-300 focus:ring-emerald-400"
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
                      className="w-4 h-4 text-emerald-400 border-gray-300 focus:ring-emerald-400"
                    />
                    <span className="text-sm text-gray-900">Cash on delivery</span>
                  </label>
                </div>

                {/* Momo Number Input */}
                {paymentMethod === 'momo' && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-600 mb-3">
                      ℹ️ Is your Momo number the same as your phone number?
                    </p>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone number*
                    </label>
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 focus-within:ring-2 focus-within:ring-emerald-400 focus-within:border-transparent">
                      <Image
                        src="/images/gh-flag.png"
                        alt="Ghana"
                        width={20}
                        height={15}
                        className="flex-shrink-0"
                      />
                      <input
                        type="tel"
                        value={paymentData.momoNumber}
                        onChange={(e) => setPaymentData({ ...paymentData, momoNumber: e.target.value })}
                        className="flex-1 outline-none text-gray-900"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Details */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4">Delivery Details</h3>
                
                <p className="text-sm text-gray-700 mb-3">Select delivery option</p>
                
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() => setDeliveryOption('delivery')}
                    className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                      deliveryOption === 'delivery'
                        ? 'bg-emerald-400 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Delivery
                  </button>
                  <button
                    onClick={() => setDeliveryOption('pickup')}
                    className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
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
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Delivery location
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Circle"
                        value={paymentData.deliveryLocation}
                        onChange={(e) => setPaymentData({ ...paymentData, deliveryLocation: e.target.value })}
                        className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-500"
                        aria-label="Change location"
                      >
                        <MapPin size={18} />
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
                className="w-full py-3.5 bg-emerald-400 text-white rounded-lg hover:bg-emerald-500 font-semibold transition-colors text-base"
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