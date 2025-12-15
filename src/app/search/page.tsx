"use client";

import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import { useProducts } from '../../context/ProductContext';
import styles from './page.module.css';

export default function SearchPage() {
    const { products } = useProducts();
    return (
        <main>
            <Navbar />
            <div className={`container ${styles.pageContainer}`}>
                {/* Sidebar Filters */}
                <aside className={styles.sidebar}>
                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>Category</h3>
                        <div className={styles.filterList}>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" /> Imaging
                            </label>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" /> Surgical
                            </label>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" /> Diagnostics
                            </label>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" /> Anesthesia
                            </label>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" /> Furniture
                            </label>
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>Condition</h3>
                        <div className={styles.filterList}>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" /> New
                            </label>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" /> Used
                            </label>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" /> Refurbished
                            </label>
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <h3 className={styles.filterTitle}>Price Range</h3>
                        <div className={styles.filterList}>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" /> Under $1,000
                            </label>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" /> $1,000 - $5,000
                            </label>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" /> $5,000 - $10,000
                            </label>
                            <label className={styles.checkboxLabel}>
                                <input type="checkbox" /> Over $10,000
                            </label>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className={styles.mainContent}>
                    <div className={styles.header}>
                        <h1 className={styles.headerTitle}>All Equipment ({products.length})</h1>
                        <select className={styles.sortSelect} defaultValue="relevance">
                            <option value="relevance">Sort by: Relevance</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="newest">Newest First</option>
                        </select>
                    </div>

                    <div className={styles.resultsGrid}>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
