import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Orders() {
  const orders = [
    { customer: 'Fried rice', products: 'Assorted, Plain', price: '20', delivery: 'Delivery', date: '12/12/24', status: 'Pending', statusColor: 'bg-yellow-400' },
    { customer: 'Fried rice', products: 'Assorted, Plain', price: '20', delivery: 'Delivery', date: '12/12/24', status: 'Confirmed', statusColor: 'bg-green-500' },
    { customer: 'Fried rice', products: 'Assorted, Plain', price: '20', delivery: 'Delivery', date: '12/12/24', status: 'Pending', statusColor: 'bg-yellow-400' },
    { customer: 'Fried rice', products: 'Assorted, Plain', price: '20', delivery: 'Delivery', date: '12/12/24', status: 'Cancelled', statusColor: 'bg-red-500' },
    { customer: 'Fried rice', products: 'Assorted, Plain', price: '20', delivery: 'Delivery', date: '12/12/24', status: 'Confirmed', statusColor: 'bg-green-500' },
    { customer: 'Fried rice', products: 'Assorted, Plain', price: '20', delivery: 'Delivery', date: '12/12/24', status: 'Confirmed', statusColor: 'bg-green-500' },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
          <span className="text-sm font-medium">Filter</span>
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Customer</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Products</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Price</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Delivery</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm text-gray-900">{order.customer}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{order.products}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{order.price}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{order.delivery}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{order.date}</td>
                  <td className="py-4 px-6">
                    <button className={`${order.statusColor} text-white px-4 py-1.5 rounded text-sm font-medium flex items-center gap-2 min-w-[110px] justify-between`}>
                      <span>{order.status}</span>
                      <ChevronDown size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 p-6">
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
            5
          </button>
          <button className="w-8 h-8 rounded flex items-center justify-center bg-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-300">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}