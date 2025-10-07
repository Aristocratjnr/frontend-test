"use client";
import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

export default function ProductHistory() {
  const [isLoading, setIsLoading] = useState(true);

  const products = Array(7).fill({
    name: 'Fried rice',
    variants: 'Assorted, Plain',
    qty: '20',
    minPrice: '300'
  });

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gray-50 p-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Header skeleton */}
          <div className="mb-6">
            <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>

          {/* Table skeleton */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </th>
                  <th className="text-left py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </th>
                  <th className="text-left py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                  </th>
                  <th className="text-left py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </th>
                  <th className="text-left py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array(7).fill(0).map((_, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-4">
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination skeleton */}
          <div className="flex justify-end items-center gap-2 mt-6">
            {Array(5).fill(0).map((_, index) => (
              <div key={index} className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Product History</h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Variants</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Qty.</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Min. Price</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-900">{product.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{product.variants}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{product.qty}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{product.minPrice}</td>
                  <td className="py-4 px-4">
                    <button className="text-red-400 hover:text-red-600 p-1">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 mt-6">
          <button className="w-8 h-8 rounded flex items-center justify-center bg-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-300">
            &lt;
          </button>
          <button className="w-8 h-8 rounded flex items-center justify-center bg-emerald-400 text-white font-medium text-sm hover:bg-emerald-500">
            1
          </button>
          <button className="w-8 h-8 rounded flex items-center justify-center bg-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-300">
            2
          </button>
          <button className="w-8 h-8 rounded flex items-center justify-center bg-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-300">
            3
          </button>
          <button className="w-8 h-8 rounded flex items-center justify-center bg-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-300">
            4
          </button>
          <button className="w-8 h-8 rounded flex items-center justify-center bg-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-300">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}