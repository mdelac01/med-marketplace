"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../data/mockData';

interface ProductContextType {
    products: Product[];
    addProduct: (formData: FormData) => Promise<void>;
    updateProduct: (id: string, formData: FormData) => Promise<void>;
    loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch products from API on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addProduct = async (formData: FormData) => {
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const newProduct = await res.json();
                setProducts((prev) => [newProduct, ...prev]);
            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('Error submitting product:', error);
        }
    };

    const updateProduct = async (id: string, formData: FormData) => {
        try {
            formData.append('id', id);
            const res = await fetch('/api/products', {
                method: 'PUT',
                body: formData,
            });

            if (res.ok) {
                const updatedProduct = await res.json();
                setProducts((prev) => prev.map(p => p.id === id ? updatedProduct : p));
            } else {
                console.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, loading }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}
