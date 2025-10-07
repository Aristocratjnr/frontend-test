"use client";
import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ProductHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Array<{
    id: number;
    name: string;
    variants: string;
    qty: string;
    minPrice: string;
  }>>([]);

  // Initialize products with unique IDs
  useEffect(() => {
    const initialProducts = Array(7).fill(null).map((_, index) => ({
      id: index + 1,
      name: 'Fried rice',
      variants: 'Assorted, Plain',
      qty: '20',
      minPrice: '300'
    }));
    setProducts(initialProducts);
  }, []);

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

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      toast.success('Product deleted successfully');
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 pt-6 sm:pt-6 lg:pt-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          {/* Header skeleton */}
          <div className="mb-6">
            <div className="h-6 bg-gray-200 rounded w-32 sm:w-48 animate-pulse"></div>
          </div>

          {/* Table skeleton */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16 animate-pulse"></div>
                  </th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-20 animate-pulse"></div>
                  </th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-8 sm:w-12 animate-pulse"></div>
                  </th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-20 animate-pulse"></div>
                  </th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16 animate-pulse"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array(7).fill(0).map((_, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24 animate-pulse"></div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-24 sm:w-32 animate-pulse"></div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-6 sm:w-8 animate-pulse"></div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16 animate-pulse"></div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <div className="h-6 w-6 sm:h-8 sm:w-8 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination skeleton */}
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-1 sm:gap-2 mt-6">
            {Array(5).fill(0).map((_, index) => (
              <div key={index} className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 pt-12 sm:pt-6 lg:pt-8">
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Product History</h2>
          {products.length === 0 && (
            <p className="text-sm text-gray-500">No products found</p>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Name</th>
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Variants</th>
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Qty.</th>
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Min. Price</th>
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-900">{product.name}</td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-600">{product.variants}</td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-900">{product.qty}</td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-900">{product.minPrice}</td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="text-red-400 hover:text-red-600 p-1 transition-colors"
                      aria-label={`Delete ${product.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-1 sm:gap-2 mt-6">
          <button className="w-8 h-8 sm:w-8 sm:h-8 rounded flex items-center justify-center bg-gray-200 text-gray-600 font-medium text-xs sm:text-sm hover:bg-gray-300">
            &lt;
          </button>
          <button className="w-8 h-8 sm:w-8 sm:h-8 rounded flex items-center justify-center bg-emerald-400 text-white font-medium text-xs sm:text-sm hover:bg-emerald-500">
            1
          </button>
          <button className="w-8 h-8 sm:w-8 sm:h-8 rounded flex items-center justify-center bg-gray-200 text-gray-600 font-medium text-xs sm:text-sm hover:bg-gray-300">
            2
          </button>
          <button className="w-8 h-8 sm:w-8 sm:h-8 rounded flex items-center justify-center bg-gray-200 text-gray-600 font-medium text-xs sm:text-sm hover:bg-gray-300">
            3
          </button>
          <button className="w-8 h-8 sm:w-8 sm:h-8 rounded flex items-center justify-center bg-gray-200 text-gray-600 font-medium text-xs sm:text-sm hover:bg-gray-300">
            4
          </button>
          <button className="w-8 h-8 sm:w-8 sm:h-8 rounded flex items-center justify-center bg-gray-200 text-gray-600 font-medium text-xs sm:text-sm hover:bg-gray-300">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}