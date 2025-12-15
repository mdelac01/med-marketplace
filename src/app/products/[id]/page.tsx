"use client";

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button';
import { useProducts } from '../../../context/ProductContext';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { Product } from '../../../data/mockData';

interface Props {
    params: {
        id: string;
    };
}

export default function ProductDetailPage({ params }: Props) {
    const { products } = useProducts();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    // Since we are moving to client-side context, we need to find the product in the context
    // This needs to be in useEffect or just during render if context is already loaded (which it is)
    // However, hydration mismatch might occur if we just render based on context immediately vs server text
    // Safe way is:
    useEffect(() => {
        if (products.length > 0) {
            const found = products.find((p) => p.id === params.id);
            setProduct(found || null);
            setLoading(false);
        }
    }, [products, params.id]);

    if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;

    if (!product) {
        return (
            <main>
                <Navbar />
                <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
                    <h1>Product Not Found</h1>
                    <Link href="/search"><Button>Back to Search</Button></Link>
                </div>
            </main>
        );
    }

    return (
        <main>
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                <div style={{ marginBottom: '1rem' }}>
                    <Link href="/search" style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                        ← Back to Results
                    </Link>
                </div>

                <div className={styles.grid}>
                    {/* Left Column: Images */}
                    <div className={styles.imageSection}>
                        <div className={styles.mainImageWrapper}>
                            <Image
                                src={product.imageUrl}
                                alt={product.title}
                                fill
                                className={styles.mainImage}
                                priority
                            />
                        </div>
                        <div className={styles.thumbnails}>
                            <div className={styles.thumb} style={{ backgroundColor: '#eee' }}></div>
                            <div className={styles.thumb} style={{ backgroundColor: '#eee' }}></div>
                            <div className={styles.thumb} style={{ backgroundColor: '#eee' }}></div>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className={styles.detailsSection}>
                        <div className={styles.header}>
                            <span className={styles.category}>{product.category}</span>
                            <h1 className={styles.title}>{product.title}</h1>
                            <div className={styles.priceBlock}>
                                <span className={styles.price}>${product.price.toLocaleString()}</span>
                                <span className={styles.condition}>{product.condition}</span>
                            </div>
                        </div>

                        <div className={styles.actionBox}>
                            <Button fullWidth size="default">Contact Seller</Button>
                            <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--gray-600)', textAlign: 'center' }}>
                                Secure transaction via MedMarket Escrow
                            </p>
                        </div>

                        <div>
                            <h3 className={styles.sectionTitle}>Description</h3>
                            <p className={styles.description}>{product.description}</p>
                        </div>

                        <div>
                            <h3 className={styles.sectionTitle}>Specifications</h3>
                            <div className={styles.specs}>
                                <div className={styles.specRow}>
                                    <span className={styles.specLabel}>Manufacturer</span>
                                    <span className={styles.specValue}>{product.specs.manufacturer}</span>
                                </div>
                                <div className={styles.specRow}>
                                    <span className={styles.specLabel}>Year Model</span>
                                    <span className={styles.specValue}>{product.specs.year}</span>
                                </div>
                                <div className={styles.specRow}>
                                    <span className={styles.specLabel}>Warranty</span>
                                    <span className={styles.specValue}>{product.specs.warranty}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
