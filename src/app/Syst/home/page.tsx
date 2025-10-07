"use client";
import React, { useState, useEffect } from 'react';
import { Star, X, Upload, Plus } from 'lucide-react';
import Image from 'next/image';

// Products Page Component
export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [variants, setVariants] = useState([{ name: '', price: '', size: '' }]);
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
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="px-6 py-2 border border-emerald-400 text-emerald-400 rounded-lg hover:bg-emerald-50 font-medium transition-colors"
          >
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

      {/* Add Product Drawer */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsDrawerOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Add Product</h2>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Product Details Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Product Details</h3>
                
                {/* Image Upload */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image*
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer">
                    <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                    <p className="text-sm text-gray-500">Click here or Drag your file here to upload it</p>
                  </div>
                </div>

                {/* Product Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  />
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category*
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-gray-500">
                    <option>Select category</option>
                    <option>Pizza</option>
                    <option>Burger</option>
                    <option>Drinks</option>
                  </select>
                </div>

                {/* Product Description */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name*
                  </label>
                  <textarea
                    placeholder="Enter description"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Product Variants Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Product variants</h3>
                
                {variants.map((variant, index) => (
                  <div key={index} className="mb-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Variant Name*
                        </label>
                        <input
                          type="text"
                          placeholder="Enter name"
                          value={variant.name}
                          onChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[index].name = e.target.value;
                            setVariants(newVariants);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Price*
                        </label>
                        <input
                          type="text"
                          placeholder="Enter price"
                          value={variant.price}
                          onChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[index].price = e.target.value;
                            setVariants(newVariants);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Size*
                        </label>
                        <input
                          type="text"
                          placeholder="Enter size"
                          value={variant.size}
                          onChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[index].size = e.target.value;
                            setVariants(newVariants);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Another Variant Button */}
                <button
                  onClick={() => setVariants([...variants, { name: '', price: '', size: '' }])}
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-500 font-medium text-sm"
                >
                  <Plus size={16} />
                  Add another variant
                </button>
              </div>

              {/* Add Product Button */}
              <button className="w-full py-3 bg-emerald-400 text-white rounded-lg hover:bg-emerald-500 font-medium transition-colors">
                Add Product
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}