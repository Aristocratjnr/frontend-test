'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { storage, Order } from '../lib/storage';

// Orders Context
interface OrdersState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

type OrdersAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ORDERS'; payload: Order[] }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER'; payload: Order }
  | { type: 'DELETE_ORDER'; payload: string };

const initialOrdersState: OrdersState = {
  orders: [],
  isLoading: true,
  error: null,
};

function ordersReducer(state: OrdersState, action: OrdersAction): OrdersState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload, isLoading: false, error: null };
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? action.payload : order
        ),
      };
    case 'DELETE_ORDER':
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload),
      };
    default:
      return state;
  }
}

interface OrdersContextType {
  state: OrdersState;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateOrder: (id: string, updates: Partial<Order>) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  getOrderById: (id: string) => Order | undefined;
  refreshOrders: () => Promise<void>;
  getOrdersByStatus: (status: Order['status']) => Order[];
  getOrdersByDateRange: (startDate: Date, endDate: Date) => Order[];
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(ordersReducer, initialOrdersState);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const savedOrders = storage.get<Order[]>(storage.keys.ORDERS) || [];
    dispatch({ type: 'SET_ORDERS', payload: savedOrders });
  };

  const saveOrders = (orders: Order[]) => {
    storage.set(storage.keys.ORDERS, orders);
  };

  const addOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedOrders = [...state.orders, newOrder];
    saveOrders(updatedOrders);
    dispatch({ type: 'ADD_ORDER', payload: newOrder });
  };

  const updateOrder = async (id: string, updates: Partial<Order>) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedOrder = {
      ...state.orders.find(o => o.id === id)!,
      ...updates,
      updatedAt: new Date(),
    };

    const updatedOrders = state.orders.map(o => o.id === id ? updatedOrder : o);
    saveOrders(updatedOrders);
    dispatch({ type: 'UPDATE_ORDER', payload: updatedOrder });
  };

  const deleteOrder = async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedOrders = state.orders.filter(o => o.id !== id);
    saveOrders(updatedOrders);
    dispatch({ type: 'DELETE_ORDER', payload: id });
  };

  const getOrderById = (id: string) => {
    return state.orders.find(o => o.id === id);
  };

  const refreshOrders = async () => {
    await loadOrders();
  };

  const getOrdersByStatus = (status: Order['status']) => {
    return state.orders.filter(order => order.status === status);
  };

  const getOrdersByDateRange = (startDate: Date, endDate: Date) => {
    return state.orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });
  };

  return (
    <OrdersContext.Provider value={{
      state,
      addOrder,
      updateOrder,
      deleteOrder,
      getOrderById,
      refreshOrders,
      getOrdersByStatus,
      getOrdersByDateRange,
    }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}
