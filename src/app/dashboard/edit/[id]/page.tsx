"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../../components/Navbar';
import { useProducts } from '../../../../context/ProductContext';
import ProductForm from '../../../../components/ProductForm';
import { Product } from '../../../../data/mockData';

export default function EditProductPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { products, updateProduct, loading } = useProducts();
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        if (!loading && products.length > 0) {
            const found = products.find((p: Product) => p.id === params.id);
            if (found) {
                // Convert number to string for form
                setProduct({
                    ...found,
                    price: found.price.toString(),
                    manufacturer: found.specs.manufacturer,
                    year: found.specs.year.toString(),
                    warranty: found.specs.warranty
                });
            } else {
                // Product not found, maybe redirect or show error
                // For now, let's try ensuring we wait or redirect
                console.log('Product not found in context');
            }
        }
    }, [products, loading, params.id]);

    const handleUpdate = async (data: FormData) => {
        await updateProduct(params.id, data);
        router.push('/dashboard');
    };

    if (loading) {
        return <div style={{ padding: '2rem' }}>Loading product...</div>;
    }

    if (!product && !loading && products.length > 0) {
        return <div style={{ padding: '2rem' }}>Product not found</div>;
    }

    return (
        <main>
            <Navbar />
            <div className="container section">
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Edit Product</h1>
                    {product && (
                        <ProductForm
                            initialData={product}
                            onSubmit={handleUpdate}
                            submitLabel="Save Changes"
                            onCancel={() => router.back()}
                        />
                    )}
                </div>
            </div>
        </main>
    );
}
