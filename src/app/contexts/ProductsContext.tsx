'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { storage, Product } from '../lib/storage';

// Products Context
interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

type ProductsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'TOGGLE_PRODUCT_STATUS'; payload: string };

const initialProductsState: ProductsState = {
  products: [],
  isLoading: true,
  error: null,
};

function productsReducer(state: ProductsState, action: ProductsAction): ProductsState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, isLoading: false, error: null };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
      };
    case 'TOGGLE_PRODUCT_STATUS':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload
            ? { ...product, isActive: !product.isActive }
            : product
        ),
      };
    default:
      return state;
  }
}

interface ProductsContextType {
  state: ProductsState;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  toggleProductStatus: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  refreshProducts: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productsReducer, initialProductsState);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const savedProducts = storage.get<Product[]>(storage.keys.PRODUCTS) || [];
    dispatch({ type: 'SET_PRODUCTS', payload: savedProducts });
  };

  const saveProducts = (products: Product[]) => {
    storage.set(storage.keys.PRODUCTS, products);
  };

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedProducts = [...state.products, newProduct];
    saveProducts(updatedProducts);
    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedProduct = {
      ...state.products.find(p => p.id === id)!,
      ...updates,
      updatedAt: new Date(),
    };

    const updatedProducts = state.products.map(p => p.id === id ? updatedProduct : p);
    saveProducts(updatedProducts);
    dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
  };

  const deleteProduct = async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedProducts = state.products.filter(p => p.id !== id);
    saveProducts(updatedProducts);
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  };

  const toggleProductStatus = async (id: string) => {
    const product = state.products.find(p => p.id === id);
    if (product) {
      await updateProduct(id, { isActive: !product.isActive });
    }
  };

  const getProductById = (id: string) => {
    return state.products.find(p => p.id === id);
  };

  const refreshProducts = async () => {
    await loadProducts();
  };

  return (
    <ProductsContext.Provider value={{
      state,
      addProduct,
      updateProduct,
      deleteProduct,
      toggleProductStatus,
      getProductById,
      refreshProducts,
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
