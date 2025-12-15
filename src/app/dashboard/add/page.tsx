"use client";

import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import { useProducts } from '../../../context/ProductContext';
import ProductForm from '../../../components/ProductForm';

export default function AddProductPage() {
    const router = useRouter();
    const { addProduct } = useProducts();

    const handleAdd = async (data: FormData) => {
        await addProduct(data);
        router.push('/dashboard');
    };

    return (
        <main>
            <Navbar />
            <div className="container section">
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Add New Product</h1>
                    <ProductForm
                        onSubmit={handleAdd}
                        submitLabel="Publish Listing"
                        onCancel={() => router.back()}
                    />
                </div>
            </div>
        </main>
    );
}
