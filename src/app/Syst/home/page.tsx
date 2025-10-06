"use client";
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';

// Products Page Component
export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Array<{
    id: number;
    name: string;
    price: string;
    rating: number;
    image: string;
    category: string;
    description: string;
  }>>([]);

  useEffect(() => {
    // Simulate loading products data
    const loadProducts = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock product data
      const mockProducts = Array(9).fill(null).map((_, index) => ({
        id: index + 1,
        name: '4 Meat Pizza',
        price: 'GHS 50',
        rating: 3.4 + Math.random(),
        image: '/images/food.jpg',
        category: 'Pizza',
        description: 'Delicious pizza with 4 different meat toppings'
      }));

      setProducts(mockProducts);
      setIsLoading(false);
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="p-8">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-9 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
          <div className="flex gap-3">
            <div className="h-10 bg-gray-200 rounded-lg w-28 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-28 animate-pulse"></div>
          </div>
        </div>

        {/* Products grid skeleton */}
        <div className="grid grid-cols-3 gap-6">
          {Array(9).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 animate-pulse">
              {/* Image skeleton */}
              <div className="w-full h-40 bg-gray-200"></div>

              {/* Content skeleton */}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="flex items-center gap-1 ml-4">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Products</h2>
        <div className="flex gap-3">
          <button className="px-6 py-2 border border-emerald-400 text-emerald-400 rounded-lg hover:bg-emerald-50 font-medium transition-colors">
            Add Product
          </button>
          <button className="px-6 py-2 bg-emerald-400 text-white rounded-lg hover:bg-emerald-500 font-medium transition-colors">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={300}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.price}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-gray-900">{product.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}