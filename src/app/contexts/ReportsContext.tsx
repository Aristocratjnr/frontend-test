'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { storage, ReportData, Order, Product } from '../lib/storage';

// Reports Context
interface ReportsState {
  reports: ReportData[];
  isLoading: boolean;
  error: string | null;
}

type ReportsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_REPORTS'; payload: ReportData[] }
  | { type: 'ADD_REPORT'; payload: ReportData }
  | { type: 'DELETE_REPORT'; payload: string };

const initialReportsState: ReportsState = {
  reports: [],
  isLoading: true,
  error: null,
};

function reportsReducer(state: ReportsState, action: ReportsAction): ReportsState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_REPORTS':
      return { ...state, reports: action.payload, isLoading: false, error: null };
    case 'ADD_REPORT':
      return { ...state, reports: [...state.reports, action.payload] };
    case 'DELETE_REPORT':
      return {
        ...state,
        reports: state.reports.filter(report => report.id !== action.payload),
      };
    default:
      return state;
  }
}

interface ReportsContextType {
  state: ReportsState;
  generateReport: (type: ReportData['type'], dateRange: { start: Date; end: Date }, orders: Order[], products: Product[]) => Promise<ReportData>;
  getReportById: (id: string) => ReportData | undefined;
  deleteReport: (id: string) => Promise<void>;
  refreshReports: () => Promise<void>;
  getReportsByType: (type: ReportData['type']) => ReportData[];
  getChartData: (reportId?: string) => Array<{ name: string; value: number; category: string }>;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export function ReportsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reportsReducer, initialReportsState);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const savedReports = storage.get<ReportData[]>(storage.keys.REPORTS) || [];
    dispatch({ type: 'SET_REPORTS', payload: savedReports });
  };

  const saveReports = (reports: ReportData[]) => {
    storage.set(storage.keys.REPORTS, reports);
  };

  const generateReport = async (type: ReportData['type'], dateRange: { start: Date; end: Date }, orders: Order[], products: Product[]) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Filter orders by date range
    const filteredOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= dateRange.start && orderDate <= dateRange.end;
    });

    // Calculate report metrics
    const totalOrders = filteredOrders.length;
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);

    // Calculate products sold
    const productSales = new Map<string, { quantity: number; revenue: number }>();
    filteredOrders.forEach(order => {
      order.items.forEach(item => {
        const existing = productSales.get(item.productName) || { quantity: 0, revenue: 0 };
        productSales.set(item.productName, {
          quantity: existing.quantity + item.quantity,
          revenue: existing.revenue + item.totalPrice,
        });
      });
    });

    const totalProductsSold = Array.from(productSales.values()).reduce((sum, product) => sum + product.quantity, 0);

    // Get top products
    const topProducts = Array.from(productSales.entries())
      .map(([name, data]) => ({ name, quantity: data.quantity, revenue: data.revenue }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    // Get product categories for chart data
    const productCategories = new Map<string, string>();
    products.forEach(product => {
      // Use first variant's category or default categorization
      productCategories.set(product.name, product.category);
    });

    const chartData = Array.from(productSales.entries()).map(([name, data]) => ({
      name,
      value: data.revenue,
      category: productCategories.get(name) || 'Other',
    }));

    const newReport: ReportData = {
      id: Date.now().toString(),
      type,
      dateRange,
      totalOrders,
      totalRevenue,
      totalProductsSold,
      topProducts,
      generatedAt: new Date(),
    };

    const updatedReports = [...state.reports, newReport];
    saveReports(updatedReports);
    dispatch({ type: 'ADD_REPORT', payload: newReport });

    return newReport;
  };

  const getReportById = (id: string) => {
    return state.reports.find(r => r.id === id);
  };

  const deleteReport = async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedReports = state.reports.filter(r => r.id !== id);
    saveReports(updatedReports);
    dispatch({ type: 'DELETE_REPORT', payload: id });
  };

  const refreshReports = async () => {
    await loadReports();
  };

  const getReportsByType = (type: ReportData['type']) => {
    return state.reports.filter(report => report.type === type);
  };

  const getChartData = (reportId?: string) => {
    let report: ReportData | undefined;

    if (reportId) {
      report = state.reports.find(r => r.id === reportId);
    } else {
      // Get the most recent report
      report = state.reports.sort((a, b) =>
        new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
      )[0];
    }

    if (!report) {
      // Return default chart data if no reports exist
      return [
        { name: 'Fried rice', value: 1200, category: 'Main Course' },
        { name: 'Banku', value: 800, category: 'Main Course' },
        { name: 'Fufu', value: 500, category: 'Main Course' },
        { name: 'Plain rice', value: 1000, category: 'Side' }
      ];
    }

    // Convert top products to chart data format
    return report.topProducts.map(product => ({
      name: product.name,
      value: product.revenue,
      category: 'Popular Items', // Default category since we don't have this info in ReportData
    }));
  };

  return (
    <ReportsContext.Provider value={{
      state,
      generateReport,
      getReportById,
      deleteReport,
      refreshReports,
      getReportsByType,
      getChartData,
    }}>
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportsContext);
  if (context === undefined) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
}
