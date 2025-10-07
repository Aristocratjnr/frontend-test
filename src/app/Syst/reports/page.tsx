'use client';

import React, { useState } from 'react';
import { ShoppingCart, Users, CheckCircle, DollarSign, ChevronDown, Filter, Download, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useReports } from '../../contexts/ReportsContext';

export default function Reports() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const { state: reportsState, getChartData } = useReports();

  const filterOptions = ['All', 'Main Course', 'Side', 'Beverages', 'Desserts'];

  // Get current chart data from reports context
  const chartData = getChartData();

  // Filter chart data based on selected category
  const getFilteredData = () => {
    if (selectedFilter === 'All') return chartData;
    return chartData.filter(item => item.category === selectedFilter);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
  };

  // Generate default stats based on chart data
  const getStats = () => {
    const filteredData = getFilteredData();
    const totalValue = filteredData.reduce((sum, item) => sum + item.value, 0);
    const totalItems = filteredData.length;

    return [
      {
        icon: <ShoppingCart size={20} />,
        label: 'Total Items',
        value: totalItems.toString()
      },
      {
        icon: <Users size={20} />,
        label: 'Categories',
        value: new Set(filteredData.map(item => item.category)).size.toString()
      },
      {
        icon: <CheckCircle size={20} />,
        label: 'Active Items',
        value: filteredData.filter(item => item.value > 0).length.toString()
      },
      {
        icon: <DollarSign size={20} />,
        label: 'Total Value',
        value: `GHS${totalValue.toLocaleString()}`
      }
    ];
  };

  const stats = getStats();

  const generateCSV = () => {
    const filteredData = getFilteredData();

    // Create CSV content for chart data
    const chartHeaders = ['Item Name', 'Value', 'Category'];
    const chartRows = filteredData.map(item => [item.name, item.value.toString(), item.category]);

    // Create CSV content for stats
    const statsHeaders = ['Metric', 'Value'];
    const statsRows = stats.map(stat => [stat.label, stat.value]);

    // Combine both sections
    const csvContent = [
      // Chart data section
      `Report Data (${selectedFilter})`,
      '',
      chartHeaders.join(','),
      ...chartRows.map(row => row.map(cell => `"${cell}"`).join(',')),
      '',
      // Stats section
      'Summary Statistics',
      '',
      statsHeaders.join(','),
      ...statsRows.map(row => row.map(cell => `"${cell}"`).join(',')),
      '',
      `Generated on: ${new Date().toLocaleString()}`
    ].join('\n');

    return csvContent;
  };

  const downloadCSV = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `report_${selectedFilter.toLowerCase().replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reports</h1>
          {reportsState.isLoading && (
            <RefreshCw size={20} className="animate-spin text-gray-500" />
          )}
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors text-sm"
            title="Export to CSV"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          <div className="relative">
            <button
              className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={16} />
              <span className="hidden sm:inline text-sm font-medium">{selectedFilter}</span>
              <span className="sm:hidden text-sm font-medium">{selectedFilter}</span>
              <ChevronDown size={16} />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 first:rounded-t-lg last:rounded-b-lg text-sm"
                    onClick={() => handleFilterSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 mb-2 sm:mb-3">
              {stat.icon}
              <span className="text-xs sm:text-sm font-medium">{stat.label}</span>
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 break-all">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getFilteredData()} barSize={40} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              width={60}
            />
            <Bar dataKey="value" fill="#00881E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}