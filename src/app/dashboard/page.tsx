"use client";

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import { useProducts } from '../../context/ProductContext';
import styles from './page.module.css';

export default function DashboardPage() {
    const { products } = useProducts();
    // In a real app, we would filter by the logged-in user's ID. 
    // For this demo, we'll show all products as if the user owns them or just the ones they added (if we had a flag).
    // Let's just show all for the "Seller View" simulation.

    return (
        <main>
            <Navbar />
            <div className="container section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Seller Dashboard</h1>
                    <Link href="/dashboard/add">
                        <Button>+ Add New Product</Button>
                    </Link>
                </div>

                <div style={{ background: 'white', borderRadius: '8px', border: '1px solid var(--gray-200)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)' }}>
                            <tr>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--gray-600)' }}>Product</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--gray-600)' }}>Category</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--gray-600)' }}>Price</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--gray-600)' }}>Status</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--gray-600)' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                                    <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '40px', height: '40px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                                            <img src={product.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <span style={{ fontWeight: '500' }}>{product.title}</span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>{product.category}</td>
                                    <td style={{ padding: '1rem' }}>${product.price.toLocaleString()}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ padding: '0.25rem 0.5rem', background: '#ecfdf5', color: '#047857', borderRadius: '99px', fontSize: '0.875rem' }}>
                                            Active
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <Link href={`/dashboard/edit/${product.id}`}>
                                            <button style={{ color: 'var(--primary-teal)', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {products.length === 0 && (
                        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--gray-600)' }}>
                            No products found. Start selling today!
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
