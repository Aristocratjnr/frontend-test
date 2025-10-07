"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  type: 'product' | 'order' | 'report';
  description: string;
  url: string;
}

interface ProductData {
  id: string;
  name: string;
  price: string;
  rating: number;
  category: string;
  description: string;
}

interface OrderData {
  id: string;
  customer: string;
  products: string;
  price: string;
  delivery: string;
  date: string;
  status: string;
}

interface ReportData {
  id: string;
  title: string;
  type: string;
  date: string;
  category: string;
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const getRealPageData = () => {
    const productsData = [
      {
        id: '1',
        name: '4 Meat Pizza',
        price: 'GHS 50',
        rating: 4.5,
        category: 'Pizza',
        description: 'Delicious pizza with 4 different meat toppings'
      },
      {
        id: '2',
        name: 'Margherita Pizza',
        price: 'GHS 35',
        rating: 4.2,
        category: 'Pizza',
        description: 'Classic pizza with fresh tomatoes, mozzarella cheese, and basil leaves'
      },
      {
        id: '3',
        name: 'Chicken Burger',
        price: 'GHS 25',
        rating: 4.3,
        category: 'Burger',
        description: 'Grilled chicken breast with lettuce, tomato, and special sauce'
      },
      {
        id: '4',
        name: 'Beef Burger',
        price: 'GHS 30',
        rating: 4.4,
        category: 'Burger',
        description: 'Juicy beef patty with cheese, onions, pickles, and our signature burger sauce'
      },
      {
        id: '5',
        name: 'Caesar Salad',
        price: 'GHS 20',
        rating: 4.1,
        category: 'Salad',
        description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan cheese'
      },
      {
        id: '6',
        name: 'Chocolate Cake',
        price: 'GHS 15',
        rating: 4.6,
        category: 'Desserts',
        description: 'Rich chocolate cake with chocolate ganache frosting'
      },
      {
        id: '7',
        name: 'French Fries',
        price: 'GHS 10',
        rating: 4.0,
        category: 'Sides',
        description: 'Crispy golden french fries seasoned with sea salt'
      },
      {
        id: '8',
        name: 'Coca Cola',
        price: 'GHS 5',
        rating: 3.8,
        category: 'Drinks',
        description: 'Classic Coca Cola soft drink served chilled'
      }
    ];

    const ordersData = [
      {
        id: '1',
        customer: 'Fried rice',
        products: 'Assorted, Plain',
        price: '20',
        delivery: 'Delivery',
        date: '12/12/24',
        status: 'Pending'
      },
      {
        id: '2',
        customer: 'Fried rice',
        products: 'Assorted, Plain',
        price: '20',
        delivery: 'Delivery',
        date: '12/12/24',
        status: 'Confirmed'
      },
      {
        id: '3',
        customer: 'Fried rice',
        products: 'Assorted, Plain',
        price: '20',
        delivery: 'Delivery',
        date: '12/12/24',
        status: 'Pending'
      },
      {
        id: '4',
        customer: 'Fried rice',
        products: 'Assorted, Plain',
        price: '20',
        delivery: 'Delivery',
        date: '12/12/24',
        status: 'Cancelled'
      },
      {
        id: '5',
        customer: 'Fried rice',
        products: 'Assorted, Plain',
        price: '20',
        delivery: 'Delivery',
        date: '12/12/24',
        status: 'Confirmed'
      },
      {
        id: '6',
        customer: 'Fried rice',
        products: 'Assorted, Plain',
        price: '20',
        delivery: 'Delivery',
        date: '12/12/24',
        status: 'Confirmed'
      }
    ];

    const reportsData = [
      {
        id: '1',
        title: 'Sales Performance Q4 2024',
        type: 'financial',
        date: '2024-12-31',
        category: 'Main Course'
      },
      {
        id: '2',
        title: 'Product Category Analysis',
        type: 'analytics',
        date: '2024-12-30',
        category: 'Side'
      },
      {
        id: '3',
        title: 'Customer Satisfaction Survey',
        type: 'survey',
        date: '2024-12-29',
        category: 'Beverages'
      },
      {
        id: '4',
        title: 'Inventory Management Report',
        type: 'inventory',
        date: '2024-12-28',
        category: 'Desserts'
      }
    ];

    return { productsData, ordersData, reportsData };
  };

  const performSearch = useCallback((searchQuery: string) => {
    setIsLoading(true);

    setTimeout(() => {
      const searchResults: SearchResult[] = [];
      const lowerQuery = searchQuery.toLowerCase();
      const { productsData, ordersData, reportsData } = getRealPageData();

      productsData.forEach((product: ProductData) => {
        const searchableText = [
          product.name,
          product.category,
          product.description
        ].join(' ').toLowerCase();

        if (searchableText.includes(lowerQuery)) {
          searchResults.push({
            id: `product-${product.id}`,
            title: product.name,
            type: 'product',
            description: `${product.category} - ${product.description} - ${product.price} (${product.rating})`,
            url: `/Syst/home`
          });
        }
      });

      ordersData.forEach((order: OrderData) => {
        const searchableText = [
          order.customer,
          order.products,
          order.status,
          order.delivery
        ].join(' ').toLowerCase();

        if (searchableText.includes(lowerQuery)) {
          searchResults.push({
            id: `order-${order.id}`,
            title: `Order - ${order.customer}`,
            type: 'order',
            description: `${order.products} - ${order.price} (${order.status}) - ${order.date}`,
            url: `/Syst/orders`
          });
        }
      });

      reportsData.forEach((report: ReportData) => {
        const searchableText = [
          report.title,
          report.type,
          report.category
        ].join(' ').toLowerCase();

        if (searchableText.includes(lowerQuery)) {
          searchResults.push({
            id: `report-${report.id}`,
            title: report.title,
            type: 'report',
            description: `${report.type} report - ${report.category} - ${report.date}`,
            url: `/Syst/reports`
          });
        }
      });

      setResults(searchResults);
      setIsLoading(false);
      setHasSearched(true);
    }, 500);
  }, []);

  useEffect(() => {
    if (query.trim()) {
      performSearch(query);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  }, [query, performSearch]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'product':
        return 'bg-blue-100 text-blue-800';
      case 'order':
        return 'bg-green-100 text-green-800';
      case 'report':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!query.trim()) {
    return (
      <div className="bg-gray-50 p-8">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Search size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Search Syst</h2>
          <div className="text-gray-500">
            Enter a search term to find products, orders, reports, and more.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Search size={24} className="text-emerald-400" />
            <h1 className="text-2xl font-bold text-gray-900">
              Search Results for &quot;{query}&quot;
            </h1>
          </div>
          <div className="text-gray-600">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                Searching...
              </span>
            ) : (
              `Found ${results.length} result${results.length !== 1 ? 's' : ''}`
            )}
          </div>
        </div>

        {isLoading && (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && hasSearched && (
          <>
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => window.location.href = result.url}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 hover:text-emerald-600">
                          {result.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(result.type)}`}>
                          {result.type}
                        </span>
                      </div>
                      <div className="text-gray-600 text-sm">{result.description}</div>
                    </div>
                    <div className="text-gray-400">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No results found</h3>
                <div className="text-gray-500">
                  Try adjusting your search terms or browse our categories.
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
