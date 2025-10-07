// Local Storage Utilities
export const storage = {
  // Generic storage functions
  get: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return null;
    }
  },

  set: <T>(key: string, value: T): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
      return false;
    }
  },

  remove: (key: string): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  },

  clear: (): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  // Specific POS data keys
  keys: {
    USER: 'pos_user',
    PRODUCTS: 'pos_products',
    ORDERS: 'pos_orders',
    REPORTS: 'pos_reports',
    SETTINGS: 'pos_settings'
  }
};

// Types for our POS system
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'manager';
  isAuthenticated: boolean;
  lastLogin?: Date;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  variants: ProductVariant[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  size?: string;
  stock: number;
  sku?: string;
}

export interface Order {
  id: string;
  customerName?: string;
  customerPhone?: string;
  items: OrderItem[];
  total: number;
  tax: number;
  discount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'mobile';
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  variantId: string;
  variantName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ReportData {
  id: string;
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  dateRange: { start: Date; end: Date };
  totalOrders: number;
  totalRevenue: number;
  totalProductsSold: number;
  topProducts: Array<{ name: string; quantity: number; revenue: number }>;
  generatedAt: Date;
}

export interface POSSettings {
  taxRate: number;
  currency: string;
  businessName: string;
  businessAddress?: string;
  receiptFooter?: string;
}
