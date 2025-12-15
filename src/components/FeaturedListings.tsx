"use client";

import Link from 'next/link';
import ProductCard from './ProductCard';
import Button from './Button';
import { useProducts } from '../context/ProductContext';
import styles from '../app/page.module.css';

export default function FeaturedListings() {
    const { products } = useProducts();
    const featuredProducts = products.slice(0, 4);

    return (
        <section className="section container">
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Featured Listings</h2>
                <Link href="/search">
                    <Button variant="outline">View All</Button>
                </Link>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
