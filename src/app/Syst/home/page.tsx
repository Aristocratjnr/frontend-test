"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Star, X, Upload, Plus } from 'lucide-react';
import Image from 'next/image';

// Products Page Component
export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [variants, setVariants] = useState([{ name: '', price: '', size: '' }]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state for new products
  const [newProductData, setNewProductData] = useState({
    name: '',
    category: '',
    description: '',
    variants: [{ name: '', price: '', size: '' }]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // Load existing products
    const loadProducts = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Existing mock product data
      const existingProducts = Array(9).fill(null).map((_, index) => ({
        id: index + 1,
        name: '4 Meat Pizza',
        price: 'GHS 50',
        rating: 3.4 + Math.random(),
        image: '/images/food.jpg',
        category: 'Pizza',
        description: 'Delicious pizza with 4 different meat toppings'
      }));

      setProducts(existingProducts);
      setIsLoading(false);
    };

    loadProducts();
  }, []);

  // Image upload handlers
  const handleImageSelect = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!newProductData.name || !newProductData.category || !newProductData.description) {
      alert('Please fill in all required fields');
      return;
    }

    if (newProductData.variants.length === 0 || newProductData.variants.every(v => !v.name || !v.price)) {
      alert('Please add at least one product variant');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create new product
      const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        name: newProductData.name,
        price: newProductData.variants[0]?.price ? `GHS ${newProductData.variants[0].price}` : 'GHS 0',
        rating: 4.0 + Math.random() * 1.0,
        image: imagePreview || '/images/food.jpg',
        category: newProductData.category,
        description: newProductData.description
      };

      // Add to existing products
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);

      // Reset form
      setNewProductData({
        name: '',
        category: '',
        description: '',
        variants: [{ name: '', price: '', size: '' }]
      });
      setVariants([{ name: '', price: '', size: '' }]);
      setImagePreview(null);
      setIsDrawerOpen(false);

      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-9 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
          <div className="flex gap-3">
            <div className="h-10 bg-gray-200 rounded-lg w-28 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-28 animate-pulse"></div>
          </div>
        </div>

        {/* Products grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array(9).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 animate-pulse">
              {/* Image skeleton */}
              <div className="w-full h-40 bg-gray-200"></div>

              {/* Content skeleton */}
              <div className="p-3 sm:p-4">
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
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Products</h2>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-4 sm:px-6 py-2 border border-emerald-400 text-emerald-400 rounded-full hover:bg-emerald-50 font-medium transition-colors w-full sm:w-auto"
            >
              Add Product
            </button>
            <button className="px-4 sm:px-6 py-2 bg-emerald-400 text-white rounded-full hover:bg-emerald-500 font-medium transition-colors w-full sm:w-auto">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-40 object-cover"
              />
              <div className="p-3 sm:p-4">
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

      {/* Add Product Drawer */}
      {isDrawerOpen && (
        <>
          {/* Backdrop - Glassy semi-transparent overlay */}
          <div
            className="fixed inset-0 bg-white/20 backdrop-blur-sm z-[100] transition-all duration-300"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 h-screen w-full sm:w-96 bg-white shadow-2xl z-[110] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  title="Back"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-gray-900">Add Product</h2>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Product Details Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Product Details</h3>

                {/* Image Upload */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image*
                  </label>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />

                  {/* Upload area */}
                  {!imagePreview ? (
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                        isDragOver
                          ? 'border-emerald-400 bg-emerald-50'
                          : 'border-gray-300 hover:border-emerald-400'
                      }`}
                      onClick={handleUploadClick}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                    >
                      <Upload className={`mx-auto mb-2 ${isDragOver ? 'text-emerald-400' : 'text-gray-400'}`} size={24} />
                      <p className={`text-sm ${isDragOver ? 'text-emerald-600' : 'text-gray-500'}`}>
                        {isDragOver ? 'Drop your image here' : 'Click here or drag your file here to upload it'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  ) : (
                    <div className="relative">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        title="Remove image"
                      >
                        <X size={16} />
                      </button>
                      <button
                        onClick={handleUploadClick}
                        className="absolute bottom-2 right-2 bg-white bg-opacity-80 text-gray-700 rounded px-2 py-1 text-xs hover:bg-opacity-100 transition-all"
                      >
                        Change
                      </button>
                    </div>
                  )}
                </div>

                {/* Product Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={newProductData.name}
                    onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-gray-900 placeholder:text-gray-900"
                    required
                  />
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category*
                  </label>
                  <select
                    value={newProductData.category}
                    onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-gray-900"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Burger">Burger</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Sides">Sides</option>
                  </select>
                </div>

                {/* Product Description */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Description*
                  </label>
                  <textarea
                    placeholder="Enter product description"
                    value={newProductData.description}
                    onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-none text-gray-900 placeholder:text-gray-900"
                    required
                  />
                </div>
              </div>

              {/* Product Variants Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Product variants</h3>

                {variants.map((variant, index) => (
                  <div key={index} className="mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Variant Name*
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Small, Medium, Large"
                          value={variant.name}
                          onChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[index].name = e.target.value;
                            setVariants(newVariants);
                            setNewProductData({ ...newProductData, variants: newVariants });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-900"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Price*
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={variant.price}
                          onChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[index].price = e.target.value;
                            setVariants(newVariants);
                            setNewProductData({ ...newProductData, variants: newVariants });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-900"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Size (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 12 inch"
                          value={variant.size}
                          onChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[index].size = e.target.value;
                            setVariants(newVariants);
                            setNewProductData({ ...newProductData, variants: newVariants });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-sm text-gray-900 placeholder:text-gray-900"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Another Variant Button */}
                <button
                  onClick={() => {
                    const newVariants = [...variants, { name: '', price: '', size: '' }];
                    setVariants(newVariants);
                    setNewProductData({ ...newProductData, variants: newVariants });
                  }}
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-500 font-medium text-sm"
                >
                  <Plus size={16} />
                  Add another variant
                </button>
              </div>

              {/* Add Product Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-3 bg-emerald-400 text-white rounded-lg hover:bg-emerald-500 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}