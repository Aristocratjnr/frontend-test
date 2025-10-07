"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [openStatusDropdown, setOpenStatusDropdown] = useState<number | null>(null);
  const [ordersData, setOrdersData] = useState([
    { customer: 'Fried rice', products: 'Assorted, Plain', price: '20', delivery: 'Delivery', date: '12/12/24', status: 'Pending', statusColor: 'bg-yellow-400' },
    { customer: 'Fried rice', products: 'Assorted, Plain', price: '20', delivery: 'Delivery', date: '12/12/24', status: 'Confirmed', statusColor: 'bg-green-500' },
    { customer: 'Fried rice', products: 'Assorted, Plain', price: '20', delivery: 'Delivery', date: '12/12/24', status: 'Pending', statusColor: 'bg-yellow-400' },
    { customer: 'Fried rice', products: 'Assorted, Plain', price: '20', delivery: 'Delivery', date: '12/12/24', status: 'Cancelled', statusColor: 'bg-red-500' },
    { customer: 'Fried rice', products: 'Assorted, Plain', price: '20', delivery: 'Delivery', date: '12/12/24', status: 'Confirmed', statusColor: 'bg-green-500' },
    { customer: 'Fried rice', products: 'Assorted, Plain', price: '20', delivery: 'Delivery', date: '12/12/24', status: 'Confirmed', statusColor: 'bg-green-500' },
  ]);

  const filterOptions = ['All', 'Pending', 'Confirmed', 'Cancelled'];

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openStatusDropdown !== null && !(event.target as Element).closest('.status-dropdown')) {
        setOpenStatusDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openStatusDropdown]);

  const filteredOrders = selectedFilter === 'All'
    ? ordersData
    : ordersData.filter(order => order.status === selectedFilter);

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
  };

  const handleStatusToggle = (index: number) => {
    setOpenStatusDropdown(openStatusDropdown === index ? null : index);
  };

  const handleStatusChange = (index: number, newStatus: string) => {
    const newStatusColor = newStatus === 'Pending' ? 'bg-yellow-400' :
                          newStatus === 'Confirmed' ? 'bg-green-500' : 'bg-red-500';

    setOrdersData(prevOrders =>
      prevOrders.map((order, i) =>
        i === index ? { ...order, status: newStatus, statusColor: newStatusColor } : order
      )
    );
    setOpenStatusDropdown(null);
  };

  const getStatusOptions = (currentStatus: string) => {
    const options = ['Pending', 'Confirmed', 'Cancelled'];
    return options.filter(option => option !== currentStatus);
  };

  const SkeletonRow = () => (
    <tr className="border-b border-gray-100">
      <td className="py-3 sm:py-4 px-2 sm:px-4 lg:px-6">
        <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse w-16 sm:w-20"></div>
      </td>
      <td className="py-3 sm:py-4 px-2 sm:px-4 lg:px-6">
        <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse w-20 sm:w-24"></div>
      </td>
      <td className="py-3 sm:py-4 px-2 sm:px-4 lg:px-6">
        <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse w-8 sm:w-12"></div>
      </td>
      <td className="py-3 sm:py-4 px-2 sm:px-4 lg:px-6">
        <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse w-12 sm:w-16"></div>
      </td>
      <td className="py-3 sm:py-4 px-2 sm:px-4 lg:px-6">
        <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse w-10 sm:w-14"></div>
      </td>
      <td className="py-3 sm:py-4 px-2 sm:px-4 lg:px-6">
        <div className="h-6 sm:h-7 lg:h-8 bg-gray-200 rounded animate-pulse w-16 sm:w-20 lg:w-24"></div>
      </td>
    </tr>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 pt-6 sm:pt-6 lg:pt-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Orders</h1>
        <div className="relative w-full sm:w-auto">
          <button
            className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 w-full sm:w-auto min-w-[140px] sm:min-w-[160px]"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <span className="text-xs sm:text-sm font-medium">Filter: {selectedFilter}</span>
            <ChevronDown size={14} className="sm:w-4 sm:h-4" />
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 sm:right-0 mt-2 w-full sm:w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  className="block w-full text-left px-3 sm:px-4 py-2 hover:bg-gray-50 text-gray-700 first:rounded-t-lg last:rounded-b-lg text-xs sm:text-sm"
                  onClick={() => handleFilterSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 lg:px-6 text-xs sm:text-sm font-semibold text-gray-700">Customer</th>
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 lg:px-6 text-xs sm:text-sm font-semibold text-gray-700">Products</th>
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 lg:px-6 text-xs sm:text-sm font-semibold text-gray-700">Price</th>
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 lg:px-6 text-xs sm:text-sm font-semibold text-gray-700">Delivery</th>
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 lg:px-6 text-xs sm:text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 lg:px-6 text-xs sm:text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                // Show skeleton loaders while loading
                Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonRow key={index} />
                ))
              ) : (
                // Show actual filtered data when loaded
                filteredOrders.map((order, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 sm:py-4 px-2 sm:px-4 lg:px-6 text-xs sm:text-sm text-gray-900">{order.customer}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 lg:px-6 text-xs sm:text-sm text-gray-600">{order.products}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 lg:px-6 text-xs sm:text-sm text-gray-900">{order.price}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 lg:px-6 text-xs sm:text-sm text-gray-900">{order.delivery}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 lg:px-6 text-xs sm:text-sm text-gray-900">{order.date}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 lg:px-6">
                      <div className="relative">
                        <button
                          className={`${order.statusColor} text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 rounded text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 min-w-[80px] sm:min-w-[90px] lg:min-w-[110px] justify-between`}
                          onClick={() => handleStatusToggle(index)}
                        >
                          <span>{order.status}</span>
                          <ChevronDown size={12} className="sm:w-3.5 sm:h-3.5" />
                        </button>

                        {openStatusDropdown === index && (
                          <div className="status-dropdown absolute right-0 mt-2 w-full sm:w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            {getStatusOptions(order.status).map((statusOption) => (
                              <button
                                key={statusOption}
                                className="block w-full text-left px-3 sm:px-4 py-2 hover:bg-gray-50 text-gray-700 first:rounded-t-lg last:rounded-b-lg text-xs sm:text-sm"
                                onClick={() => handleStatusChange(index, statusOption)}
                              >
                                {statusOption}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-1 sm:gap-2 p-3 sm:p-4 lg:p-6">
          <button className="w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center bg-gray-200 text-gray-600 font-medium text-xs sm:text-sm hover:bg-gray-300">
            &lt;
          </button>
          <button className="w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center bg-emerald-400 text-white font-medium text-xs sm:text-sm hover:bg-emerald-500">
            1
          </button>
          <button className="w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center bg-gray-200 text-gray-600 font-medium text-xs sm:text-sm hover:bg-gray-300">
            2
          </button>
          <button className="w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center bg-gray-200 text-gray-600 font-medium text-xs sm:text-sm hover:bg-gray-300">
            3
          </button>
          <button className="w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center bg-gray-200 text-gray-600 font-medium text-xs sm:text-sm hover:bg-gray-300">
            4
          </button>
          <button className="w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center bg-gray-200 text-gray-600 font-medium text-xs sm:text-sm hover:bg-gray-300">
            5
          </button>
          <button className="w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center bg-gray-200 text-gray-600 font-medium text-xs sm:text-sm hover:bg-gray-300">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}